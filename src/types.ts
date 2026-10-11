export type VerificationStatus = 
  | 'VERIFIED'
  | 'NOT_FOUND'
  | 'REQUIRES_INSTITUTIONAL_VERIFICATION';

export interface AcademicRecord {
  certificateNumber: string;
  registrationNumber: string;
  studentName: string;
  institutionName: string;
  degreeName: string;
  majorOrSpecialization?: string;
  issueDate: string;
  graduationYear: string;
  status: 'ACTIVE' | 'REVOKED' | 'SUSPENDED';
  recordHash: string;
  issuerId: string;
  authorizedSignatory: string;
  notes?: string;
}

export interface ExtractedCertificateDetails {
  studentName: string;
  institutionName: string;
  degreeName: string;
  registrationNumber: string;
  certificateNumber: string;
  issueDate: string;
  graduationYear?: string;
  rawOcrText?: string;
}

export interface FieldComparison {
  field: string;
  extractedValue: string;
  registryValue: string;
  isMatch: boolean;
  notes?: string;
}

export interface VerificationResult {
  verificationId: string;
  timestamp: string;
  status: VerificationStatus;
  statusTitle: string;
  summaryExplanation: string;
  extractedDetails: ExtractedCertificateDetails;
  matchedRecord: AcademicRecord | null;
  comparisons: FieldComparison[];
  documentHash: string;
  isDemonstrationMode: boolean;
  flags: string[];
}
