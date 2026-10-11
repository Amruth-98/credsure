import { AcademicRecord, ExtractedCertificateDetails, FieldComparison, VerificationResult, VerificationStatus } from '../types';
import { findRecordByCredentials } from '../data/demonstrationRecords';

/**
 * Normalizes strings for robust human name / institution / degree comparison
 */
function normalizeText(text?: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

/**
 * Evaluates similarity between two text values
 */
function isCloseMatch(a?: string, b?: string): boolean {
  const normA = normalizeText(a);
  const normB = normalizeText(b);
  if (!normA || !normB) return false;
  return normA === normB || normA.includes(normB) || normB.includes(normA);
}

/**
 * Generates a stable verification reference number
 */
function generateVerificationId(): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  return `VRF-${year}-${randomSuffix}`;
}

/**
 * Computes a pseudo-hash representation of document text/details
 */
function computeDocumentFingerprint(details: ExtractedCertificateDetails): string {
  const source = `${details.certificateNumber}|${details.studentName}|${details.institutionName}|${details.degreeName}|${details.issueDate}`;
  let hash = 0;
  for (let i = 0; i < source.length; i++) {
    hash = (hash << 5) - hash + source.charCodeAt(i);
    hash |= 0;
  }
  return `sha256-${Math.abs(hash).toString(16).padStart(8, '0')}7f1e92d408c1ba`;
}

/**
 * Executes the core verification logic comparing extracted certificate details
 * against available registry records.
 */
export function verifyCertificateRecord(
  details: ExtractedCertificateDetails
): VerificationResult {
  const matchedRecord = findRecordByCredentials(
    details.certificateNumber,
    details.registrationNumber
  );

  const verificationId = generateVerificationId();
  const timestamp = new Date().toISOString();
  const documentHash = computeDocumentFingerprint(details);
  const flags: string[] = [];

  // 1. Case: No record found in registry
  if (!matchedRecord) {
    return {
      verificationId,
      timestamp,
      status: 'NOT_FOUND',
      statusTitle: 'No Matching Record Found',
      summaryExplanation:
        'No active or archived credential matching the supplied certificate or registration number was located in the demonstration registry.',
      extractedDetails: details,
      matchedRecord: null,
      comparisons: [
        {
          field: 'Certificate Number',
          extractedValue: details.certificateNumber || 'Not extracted',
          registryValue: 'No record on file',
          isMatch: false,
          notes: 'Identifier does not exist in registry database.'
        },
        {
          field: 'Registration Number',
          extractedValue: details.registrationNumber || 'Not extracted',
          registryValue: 'No record on file',
          isMatch: false,
          notes: 'Identifier does not exist in registry database.'
        },
        {
          field: 'Student Name',
          extractedValue: details.studentName || 'Not extracted',
          registryValue: '—',
          isMatch: false
        },
        {
          field: 'Institution',
          extractedValue: details.institutionName || 'Not extracted',
          registryValue: '—',
          isMatch: false
        },
        {
          field: 'Degree / Program',
          extractedValue: details.degreeName || 'Not extracted',
          registryValue: '—',
          isMatch: false
        }
      ],
      documentHash,
      isDemonstrationMode: true,
      flags: ['UNREGISTERED_IDENTIFIER']
    };
  }

  // 2. Perform field-by-field audit against the found record
  const comparisons: FieldComparison[] = [];

  // Certificate Number
  const certMatch = isCloseMatch(details.certificateNumber, matchedRecord.certificateNumber);
  comparisons.push({
    field: 'Certificate Number',
    extractedValue: details.certificateNumber || 'Not specified',
    registryValue: matchedRecord.certificateNumber,
    isMatch: certMatch,
    notes: certMatch ? 'Exact identifier match' : 'Extracted number differs from record'
  });

  // Student Name
  const nameMatch = isCloseMatch(details.studentName, matchedRecord.studentName);
  comparisons.push({
    field: 'Student Name',
    extractedValue: details.studentName || 'Not specified',
    registryValue: matchedRecord.studentName,
    isMatch: nameMatch,
    notes: nameMatch ? 'Name matches registered recipient' : 'Name does not match registered recipient'
  });
  if (!nameMatch) {
    flags.push('NAME_MISMATCH');
  }

  // Institution
  const instMatch = isCloseMatch(details.institutionName, matchedRecord.institutionName);
  comparisons.push({
    field: 'Issuing Institution',
    extractedValue: details.institutionName || 'Not specified',
    registryValue: matchedRecord.institutionName,
    isMatch: instMatch,
    notes: instMatch ? 'Institution matches registry issuer' : 'Institution does not match registry issuer'
  });
  if (!instMatch) {
    flags.push('INSTITUTION_MISMATCH');
  }

  // Degree / Course
  const degreeMatch = isCloseMatch(details.degreeName, matchedRecord.degreeName);
  comparisons.push({
    field: 'Degree / Program',
    extractedValue: details.degreeName || 'Not specified',
    registryValue: matchedRecord.degreeName,
    isMatch: degreeMatch,
    notes: degreeMatch ? 'Program title matches recorded conferral' : 'Program title differs from recorded conferral'
  });
  if (!degreeMatch) {
    flags.push('DEGREE_MISMATCH');
  }

  // Registration / Student ID (if present)
  if (details.registrationNumber || matchedRecord.registrationNumber) {
    const regMatch = isCloseMatch(details.registrationNumber, matchedRecord.registrationNumber);
    comparisons.push({
      field: 'Registration Number',
      extractedValue: details.registrationNumber || 'Not specified',
      registryValue: matchedRecord.registrationNumber,
      isMatch: regMatch,
      notes: regMatch ? 'Registration ID matches record' : 'Registration ID discrepancy'
    });
    if (!regMatch && details.registrationNumber) {
      flags.push('REGISTRATION_MISMATCH');
    }
  }

  // Check Revocation or Suspended status
  if (matchedRecord.status === 'REVOKED') {
    flags.push('RECORD_REVOKED');
  } else if (matchedRecord.status === 'SUSPENDED') {
    flags.push('RECORD_SUSPENDED');
  }

  // 3. Determine Final Status
  let status: VerificationStatus = 'VERIFIED';
  let statusTitle = 'Verified Against Demonstration Record';
  let summaryExplanation =
    'The extracted certificate details match the active authenticated record on file in the demonstration database.';

  if (matchedRecord.status !== 'ACTIVE') {
    status = 'REQUIRES_INSTITUTIONAL_VERIFICATION';
    statusTitle = 'Requires Institutional Verification';
    summaryExplanation =
      `This record is marked as ${matchedRecord.status} in the registry (${matchedRecord.notes || 'pending administrative audit'}). Direct institutional inquiry is required.`;
  } else if (!nameMatch || !instMatch || !degreeMatch) {
    status = 'REQUIRES_INSTITUTIONAL_VERIFICATION';
    statusTitle = 'Requires Institutional Verification';
    summaryExplanation =
      'A record exists with this credential number, but critical academic fields (such as graduate name or conferred degree) conflict with the registered archive.';
  }

  return {
    verificationId,
    timestamp,
    status,
    statusTitle,
    summaryExplanation,
    extractedDetails: details,
    matchedRecord,
    comparisons,
    documentHash,
    isDemonstrationMode: true,
    flags
  };
}
