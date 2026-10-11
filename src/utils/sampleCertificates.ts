/**
 * Generates realistic high-resolution certificate canvas images (Data URLs)
 * for testing and demonstration purposes.
 */

export interface SampleCertificateTemplate {
  id: string;
  label: string;
  expectedOutcome: 'VERIFIED' | 'NOT_FOUND' | 'REQUIRES_INSTITUTIONAL_VERIFICATION';
  outcomeLabel: string;
  description: string;
  certificateNumber: string;
  registrationNumber: string;
  studentName: string;
  institutionName: string;
  degreeName: string;
  issueDate: string;
  graduationYear: string;
  badgeColor: string;
}

export const SAMPLE_CERTIFICATES: SampleCertificateTemplate[] = [
  {
    id: 'sample-authentic-elena',
    label: 'Sample 1: Authentic Record (Elena Vance)',
    expectedOutcome: 'VERIFIED',
    outcomeLabel: 'Expected: Verified',
    description: 'Matches active registry record for Bachelor of Science in Computer Science at National Institute of Technology.',
    certificateNumber: 'EDU-2024-88419',
    registrationNumber: 'REG-2020-0419',
    studentName: 'Elena Vance',
    institutionName: 'National Institute of Technology',
    degreeName: 'Bachelor of Science in Computer Science',
    issueDate: 'May 18, 2024',
    graduationYear: '2024',
    badgeColor: '#1E40AF'
  },
  {
    id: 'sample-authentic-marcus',
    label: 'Sample 2: Authentic Master\'s (Marcus Holloway)',
    expectedOutcome: 'VERIFIED',
    outcomeLabel: 'Expected: Verified',
    description: 'Matches active registry record for Master of Science in Information Systems at Pacific Coastal University.',
    certificateNumber: 'STAN-2023-7721',
    registrationNumber: 'SU-551092',
    studentName: 'Marcus Holloway',
    institutionName: 'Pacific Coastal University',
    degreeName: 'Master of Science in Information Systems',
    issueDate: 'June 22, 2023',
    graduationYear: '2023',
    badgeColor: '#0F766E'
  },
  {
    id: 'sample-tampered-name',
    label: 'Sample 3: Mismatched Record (Tampered Name)',
    expectedOutcome: 'REQUIRES_INSTITUTIONAL_VERIFICATION',
    outcomeLabel: 'Expected: Requires Institutional Verification',
    description: 'Uses valid certificate ID EDU-2024-88419 but student name was altered to Alexander Hayes.',
    certificateNumber: 'EDU-2024-88419',
    registrationNumber: 'REG-2020-0419',
    studentName: 'Alexander Hayes',
    institutionName: 'National Institute of Technology',
    degreeName: 'Bachelor of Science in Computer Science',
    issueDate: 'May 18, 2024',
    graduationYear: '2024',
    badgeColor: '#B45309'
  },
  {
    id: 'sample-revoked-julian',
    label: 'Sample 4: Revoked Credential (Julian Croft)',
    expectedOutcome: 'REQUIRES_INSTITUTIONAL_VERIFICATION',
    outcomeLabel: 'Expected: Requires Institutional Verification',
    description: 'Matches registered credential OXF-2022-3104 which has been officially revoked in the institution registry.',
    certificateNumber: 'OXF-2022-3104',
    registrationNumber: 'OX-992014',
    studentName: 'Julian Croft',
    institutionName: 'Apex Technical University',
    degreeName: 'Bachelor of Engineering in Mechanical Engineering',
    issueDate: 'November 10, 2022',
    graduationYear: '2022',
    badgeColor: '#B91C1C'
  },
  {
    id: 'sample-unregistered',
    label: 'Sample 5: Unregistered Certificate (Unknown ID)',
    expectedOutcome: 'NOT_FOUND',
    outcomeLabel: 'Expected: Not Found',
    description: 'Fictional certificate number UNK-2025-99411 that does not exist in any authenticated institutional ledger.',
    certificateNumber: 'UNK-2025-99411',
    registrationNumber: 'ST-008192',
    studentName: 'Arthur Pendelton',
    institutionName: 'Grandview Institute of Technology',
    degreeName: 'Bachelor of Arts in Economics',
    issueDate: 'March 14, 2025',
    graduationYear: '2025',
    badgeColor: '#6B7280'
  }
];

/**
 * Draws a clean, high-resolution certificate on an HTML canvas and returns
 * a PNG Data URL and File object.
 */
export function generateCertificateImage(sample: SampleCertificateTemplate): {
  dataUrl: string;
  file: File;
} {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 850;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer border
  ctx.strokeStyle = '#0F172A';
  ctx.lineWidth = 14;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

  // Inner hairline border
  ctx.strokeStyle = '#94A3B8';
  ctx.lineWidth = 2;
  ctx.strokeRect(44, 44, canvas.width - 88, canvas.height - 88);

  // Corner decorative marks
  const cornerSize = 24;
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(40, 40, cornerSize, 4);
  ctx.fillRect(40, 40, 4, cornerSize);
  ctx.fillRect(canvas.width - 40 - cornerSize, 40, cornerSize, 4);
  ctx.fillRect(canvas.width - 44, 40, 4, cornerSize);
  ctx.fillRect(40, canvas.height - 44, cornerSize, 4);
  ctx.fillRect(40, canvas.height - 40 - cornerSize, 4, cornerSize);
  ctx.fillRect(canvas.width - 40 - cornerSize, canvas.height - 44, cornerSize, 4);
  ctx.fillRect(canvas.width - 44, canvas.height - 40 - cornerSize, 4, cornerSize);

  // Institution Name (Top Header)
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 34px "Plus Jakarta Sans", serif, Arial';
  ctx.textAlign = 'center';
  ctx.fillText(sample.institutionName.toUpperCase(), canvas.width / 2, 130);

  ctx.fillStyle = '#64748B';
  ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('OFFICE OF ACADEMIC AFFAIRS AND REGISTRAR', canvas.width / 2, 165);

  // Certificate Heading
  ctx.fillStyle = '#1E3A8A';
  ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('CERTIFICATE OF ACADEMIC CONFERRAL', canvas.width / 2, 235);

  // Body prose
  ctx.fillStyle = '#475569';
  ctx.font = 'italic 18px "Plus Jakarta Sans", Georgia, serif';
  ctx.fillText('This is to certify that', canvas.width / 2, 290);

  // Student Name
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 42px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(sample.studentName, canvas.width / 2, 355);

  // Underline for name
  const nameWidth = ctx.measureText(sample.studentName).width;
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - nameWidth / 2 - 20, 370);
  ctx.lineTo(canvas.width / 2 + nameWidth / 2 + 20, 370);
  ctx.stroke();

  // Degree conferral text
  ctx.fillStyle = '#475569';
  ctx.font = '18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(
    'has fulfilled all requirements and is hereby awarded the degree of',
    canvas.width / 2,
    420
  );

  // Degree Name
  ctx.fillStyle = '#1E40AF';
  ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(sample.degreeName, canvas.width / 2, 475);

  // Details row
  ctx.fillStyle = '#334155';
  ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(
    `Graduation Year: ${sample.graduationYear}    |    Date of Issue: ${sample.issueDate}`,
    canvas.width / 2,
    535
  );

  // Bottom Box: Identifiers (Certificate No & Registration No)
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(160, 580, canvas.width - 320, 80);
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1;
  ctx.strokeRect(160, 580, canvas.width - 320, 80);

  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 16px "IBM Plex Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`Certificate No: ${sample.certificateNumber}`, 200, 626);
  ctx.textAlign = 'right';
  ctx.fillText(`Registration No: ${sample.registrationNumber}`, canvas.width - 200, 626);

  // Signatures
  ctx.textAlign = 'center';
  ctx.font = '15px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#64748B';

  // Registrar signature
  ctx.beginPath();
  ctx.moveTo(180, 740);
  ctx.lineTo(380, 740);
  ctx.strokeStyle = '#94A3B8';
  ctx.stroke();
  ctx.fillText('Authorized Registrar', 280, 765);

  // University Seal / Stamp placeholder circle in warm golden amber
  ctx.beginPath();
  ctx.arc(canvas.width / 2, 730, 38, 0, Math.PI * 2);
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.font = 'bold 10px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#D97706';
  ctx.fillText('OFFICIAL SEAL', canvas.width / 2, 725);
  ctx.fillText('AUTHENTICATED', canvas.width / 2, 740);

  // Chancellor signature
  ctx.beginPath();
  ctx.moveTo(canvas.width - 380, 740);
  ctx.lineTo(canvas.width - 180, 740);
  ctx.strokeStyle = '#94A3B8';
  ctx.stroke();
  ctx.fillStyle = '#64748B';
  ctx.font = '15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Chancellor / Dean', canvas.width - 280, 765);

  const dataUrl = canvas.toDataURL('image/png');

  // Convert to File
  const byteString = atob(dataUrl.split(',')[1]);
  const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  const filename = `${sample.id}.png`;
  const file = new File([blob], filename, { type: 'image/png' });

  return { dataUrl, file };
}
