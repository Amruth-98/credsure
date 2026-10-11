import React from 'react';
import { 
  ShieldCheck, 
  Database, 
  ArrowRight, 
  Lock, 
  Layers, 
  Award 
} from 'lucide-react';
import { DEMONSTRATION_RECORDS } from '../data/demonstrationRecords';

interface HowItWorksPageProps {
  onNavigateToVerifyWithSample?: (sampleId: string) => void;
  onNavigate: (page: 'home' | 'verify' | 'about') => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ 
  onNavigateToVerifyWithSample, 
  onNavigate 
}) => {
  return (
    <div className="w-full bg-white text-[#1C1917] py-12 md:py-20">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-block text-[12px] font-bold tracking-wider text-[#EA580C] uppercase mb-2">
            SYSTEM ARCHITECTURE &amp; METHODOLOGY
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1917] font-heading">
            How CredSure Works
          </h1>
          <p className="text-base text-[#78716C] mt-3 leading-relaxed">
            A transparent overview of our Online Educational Record Authentication and Verification System, explaining optical extraction, field validation, and institutional comparison.
          </p>
        </div>

        {/* Core Principle Callout */}
        <div className="p-7 rounded-xl bg-gradient-to-r from-[#FFFBEB] to-[#FFF7ED] border border-[#FDE68A] mb-16 max-w-4xl mx-auto shadow-2xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#EA580C] to-[#F97316] text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1C1917] font-heading">
                Fundamental Principle: OCR Extracts Information; It Does Not Prove Authenticity
              </h3>
              <p className="text-sm text-[#57534E] leading-relaxed mt-1.5">
                A document with sharp typography, seals, and signatures can still be entirely counterfeit. Our system purposefully decouples <strong>information extraction</strong> (reading characters from the uploaded image or PDF) from <strong>cryptographic authentication</strong> (checking values against verified academic ledgers). A certificate is only classified as authentic when its extracted data matches the issuing institution’s authorized records.
              </p>
            </div>
          </div>
        </div>

        {/* 4-Stage Pipeline */}
        <section className="mb-20 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Layers className="w-5 h-5 text-[#EA580C]" />
            <h2 className="text-2xl font-extrabold text-[#1C1917] font-heading">
              The Four-Stage Verification Pipeline
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-xl border border-[#FED7AA]/80 bg-[#FFFDF7] flex flex-col sm:flex-row items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#FDBA74] text-[#EA580C] font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                01
              </div>
              <div>
                <h4 className="text-base font-bold text-[#1C1917] font-heading">
                  Document Ingestion &amp; Image Pre-processing
                </h4>
                <p className="text-sm text-[#78716C] mt-1 leading-relaxed">
                  Accepts PDF files and raster image scans (PNG, JPG, JPEG). Documents are checked for supported MIME types and size thresholds (&le;10MB), then rendered onto an offscreen canvas for character recognition.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-[#FED7AA]/80 bg-[#FFFDF7] flex flex-col sm:flex-row items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#FDBA74] text-[#EA580C] font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                02
              </div>
              <div>
                <h4 className="text-base font-bold text-[#1C1917] font-heading">
                  Optical Character Recognition (OCR) &amp; Field Parsing
                </h4>
                <p className="text-sm text-[#78716C] mt-1 leading-relaxed">
                  Tesseract.js extracts character streams directly in the browser or via backend processing. Structural regular expressions detect the student's name, institution, conferred degree, certificate serial number, and graduation date.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-[#FED7AA]/80 bg-[#FFFDF7] flex flex-col sm:flex-row items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#FDBA74] text-[#EA580C] font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                03
              </div>
              <div>
                <h4 className="text-base font-bold text-[#1C1917] font-heading">
                  Human-in-the-Loop Review &amp; Error Correction
                </h4>
                <p className="text-sm text-[#78716C] mt-1 leading-relaxed">
                  Because physical scans may have folds, slight rotation, or contrast variations, the user reviews all parsed fields in an editable form prior to database lookup, ensuring optical mistakes do not trigger false negative audits.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-[#FED7AA]/80 bg-[#FFFDF7] flex flex-col sm:flex-row items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#FDBA74] text-[#EA580C] font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                04
              </div>
              <div>
                <h4 className="text-base font-bold text-[#1C1917] font-heading">
                  Registry Cross-Referencing &amp; Audit Report
                </h4>
                <p className="text-sm text-[#78716C] mt-1 leading-relaxed">
                  The verified fields are compared against authenticated university records. The verification engine assigns one of three definitive outcomes: <strong>VERIFIED</strong>, <strong>REQUIRES INSTITUTIONAL VERIFICATION</strong>, or <strong>NOT FOUND</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Demonstration Records Reference Table */}
        <section className="mb-20 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#EA580C]" />
                <h2 className="text-2xl font-extrabold text-[#1C1917] font-heading">
                  Configured Demonstration Records
                </h2>
              </div>
              <p className="text-sm text-[#78716C] mt-1">
                Fictional academic test records configured for system evaluation and live demonstration.
              </p>
            </div>

            <button
              onClick={() => onNavigate('verify')}
              className="text-xs font-bold text-[#EA580C] hover:text-[#C2410C] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
            >
              Open Verifier &rarr;
            </button>
          </div>

          <div className="border border-[#FED7AA] rounded-xl bg-white overflow-hidden shadow-[0_2px_8px_rgba(234,88,12,0.03)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFFDF7] text-[#78716C] font-semibold border-b border-[#FED7AA]">
                  <tr>
                    <th className="py-3.5 px-4">Certificate ID</th>
                    <th className="py-3.5 px-4">Graduate Full Name</th>
                    <th className="py-3.5 px-4">Conferred Degree &amp; Institution</th>
                    <th className="py-3.5 px-4">Status in Registry</th>
                    <th className="py-3.5 px-4 text-right">Quick Test</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5EBE1] text-[#1C1917]">
                  {DEMONSTRATION_RECORDS.map((rec) => (
                    <tr key={rec.certificateNumber} className="hover:bg-[#FFFDF7] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#1C1917]">
                        {rec.certificateNumber}
                        <div className="text-[11px] text-[#A8A29E] font-normal">
                          Reg: {rec.registrationNumber}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#1C1917]">
                        {rec.studentName}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-[#1C1917] font-semibold">{rec.degreeName}</div>
                        <div className="text-[#78716C] text-[11px]">{rec.institutionName}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        {rec.status === 'ACTIVE' ? (
                          <span className="text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded text-[11px] font-bold">
                            Active Record
                          </span>
                        ) : (
                          <span className="text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA] px-2 py-0.5 rounded text-[11px] font-bold">
                            Revoked / Flagged
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            const sampleMap: Record<string, string> = {
                              'EDU-2024-88419': 'sample-authentic-elena',
                              'STAN-2023-7721': 'sample-authentic-marcus',
                              'OXF-2022-3104': 'sample-revoked-julian'
                            };
                            const sampleId = sampleMap[rec.certificateNumber] || 'sample-authentic-elena';
                            if (onNavigateToVerifyWithSample) {
                              onNavigateToVerifyWithSample(sampleId);
                            } else {
                              onNavigate('verify');
                            }
                          }}
                          className="text-xs text-[#EA580C] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          Test In Verifier
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* About CredSure Mission */}
        <section className="p-8 rounded-xl bg-[#FFFDF7] border border-[#FED7AA] max-w-4xl mx-auto shadow-2xs">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-[#EA580C]" />
            <h3 className="text-lg font-bold text-[#1C1917] font-heading">
              About the CredSure Project
            </h3>
          </div>
          <p className="text-sm text-[#78716C] leading-relaxed mb-4">
            CredSure was conceived as an academic engineering prototype to address the growing global issue of counterfeit academic credentials. By replacing vulnerable paper verification chains with a streamlined, two-tier model (client-side optical extraction followed by authoritative registry ledger lookups), employers and institutions can authenticate academic credentials without exposing student data to unvetted third parties.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#78716C]">
            <Lock className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Developed for academic evaluation. All records shown are fictional test fixtures.</span>
          </div>
        </section>
      </div>
    </div>
  );
};
