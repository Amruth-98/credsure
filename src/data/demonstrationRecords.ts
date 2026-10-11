import { AcademicRecord } from '../types';

/**
 * Fictional demonstration academic records configured for system evaluation.
 * In a production environment, this data is retrieved from authorized university
 * Student Information Systems (SIS) or cryptographically verified registry ledgers.
 */
export const DEMONSTRATION_RECORDS: AcademicRecord[] = [
  {
    certificateNumber: 'EDU-2024-88419',
    registrationNumber: 'REG-2020-0419',
    studentName: 'Elena Vance',
    institutionName: 'National Institute of Technology',
    degreeName: 'Bachelor of Science in Computer Science',
    majorOrSpecialization: 'Software Systems',
    issueDate: '2024-05-18',
    graduationYear: '2024',
    status: 'ACTIVE',
    recordHash: 'sha256-a9f4c3b88e10d291fe8c7155029a1b8cf40239109418290f66e1dae38a204f11',
    issuerId: 'INST-NIT-842',
    authorizedSignatory: 'Prof. David K. Miller (Registrar)',
    notes: 'Authenticated record. Degree awarded with First Class Honors.'
  },
  {
    certificateNumber: 'STAN-2023-7721',
    registrationNumber: 'SU-551092',
    studentName: 'Marcus Holloway',
    institutionName: 'Pacific Coastal University',
    degreeName: 'Master of Science in Information Systems',
    majorOrSpecialization: 'Network Security',
    issueDate: '2023-06-22',
    graduationYear: '2023',
    status: 'ACTIVE',
    recordHash: 'sha256-c77b91a0f890123efdc1489721094ba45e1104e6c981ff3098244bb40129cdfa',
    issuerId: 'INST-PCU-109',
    authorizedSignatory: 'Dr. Rebecca Aris (Dean of Graduate Studies)',
    notes: 'Authenticated record. Completed thesis on distributed systems.'
  },
  {
    certificateNumber: 'OXF-2022-3104',
    registrationNumber: 'OX-992014',
    studentName: 'Julian Croft',
    institutionName: 'Apex Technical University',
    degreeName: 'Bachelor of Engineering in Mechanical Engineering',
    majorOrSpecialization: 'Thermodynamics',
    issueDate: '2022-11-10',
    graduationYear: '2022',
    status: 'REVOKED',
    recordHash: 'sha256-339fa8811d09ec98234ea76f12009214438df9a8b1c70e2849921cbb88a21390',
    issuerId: 'INST-ATU-004',
    authorizedSignatory: 'Registrar Board of ATU',
    notes: 'Record flagged: Certificate revoked due to academic misconduct hearing on 2023-02-14.'
  },
  {
    certificateNumber: 'MET-2021-9952',
    registrationNumber: 'MU-448102',
    studentName: 'Sarah Jenkins',
    institutionName: 'Metropolitan University',
    degreeName: 'Bachelor of Business Administration',
    majorOrSpecialization: 'Corporate Finance',
    issueDate: '2021-07-30',
    graduationYear: '2021',
    status: 'ACTIVE',
    recordHash: 'sha256-550fb89320e891cfa30419e7629b3014a0082f1bc81d459039a8e945c7112ea0',
    issuerId: 'INST-MET-912',
    authorizedSignatory: 'Arthur Henderson (Academic Secretary)',
    notes: 'Authenticated record. Valid accredited credential.'
  }
];

/**
 * Searches the registry for a record by certificate number or registration number.
 * Normalizes punctuation and spacing for robust lookup.
 */
export function findRecordByCredentials(
  certNum?: string,
  regNum?: string
): AcademicRecord | undefined {
  const cleanCert = (certNum || '').trim().toUpperCase().replace(/[\s\-_]/g, '');
  const cleanReg = (regNum || '').trim().toUpperCase().replace(/[\s\-_]/g, '');

  if (!cleanCert && !cleanReg) return undefined;

  return DEMONSTRATION_RECORDS.find((rec) => {
    const recCert = rec.certificateNumber.toUpperCase().replace(/[\s\-_]/g, '');
    const recReg = rec.registrationNumber.toUpperCase().replace(/[\s\-_]/g, '');

    const matchCert = cleanCert && (recCert === cleanCert || recCert.includes(cleanCert) || cleanCert.includes(recCert));
    const matchReg = cleanReg && (recReg === cleanReg || recReg.includes(cleanReg) || cleanReg.includes(recReg));

    return matchCert || matchReg;
  });
}
