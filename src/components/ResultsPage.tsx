import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Printer, 
  ArrowLeft, 
  Check, 
  X, 
  Copy,
  Info,
  Calendar,
  Hash,
  Building2,
  FileCheck2,
  ShieldAlert
} from 'lucide-react';
import { VerificationResult } from '../types';

interface ResultsPageProps {
  result: VerificationResult;
  onVerifyAnother: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ result, onVerifyAnother }) => {
  const [copiedId, setCopiedId] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(result.verificationId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const isVerified = result.status === 'VERIFIED';
  const isRequiresAudit = result.status === 'REQUIRES_INSTITUTIONAL_VERIFICATION';
  const isNotFound = result.status === 'NOT_FOUND';

  const formattedDate = new Date(result.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="w-full bg-white text-[#1C1917] py-10 md:py-16">
      <div className="max-w-[840px] mx-auto px-6">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between mb-8 no-print">
          <button
            onClick={onVerifyAnother}
            className="text-xs font-bold text-[#78716C] hover:text-[#EA580C] flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Verify another certificate
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 text-xs font-semibold text-[#1C1917] bg-white hover:bg-[#FFFDF7] border border-[#FED7AA] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-[#EA580C]" />
            Print / Download Report
          </button>
        </div>

        {/* Main Status Verdict Banner */}
        <div
          className={`rounded-xl border p-7 mb-8 ${
            isVerified
              ? 'bg-[#F0FDF4] border-[#BBF7D0]'
              : isRequiresAudit
              ? 'bg-[#FFFBEB] border-[#FDE68A]'
              : 'bg-[#FFFDF7] border-[#FED7AA]'
          }`}
        >
          {/* Header row with Reference ID and Date */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-5 border-b border-black/5">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${
                  isVerified
                    ? 'bg-[#16A34A] text-white shadow-xs'
                    : isRequiresAudit
                    ? 'bg-[#EA580C] text-white shadow-xs'
                    : 'bg-[#57534E] text-white'
                }`}
              >
                {isVerified ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : isRequiresAudit ? (
                  <AlertTriangle className="w-6 h-6" />
                ) : (
                  <XCircle className="w-6 h-6" />
                )}
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#78716C]">
                  Verification Verdict
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-[#1C1917] font-heading">
                  {result.statusTitle}
                </h2>
              </div>
            </div>

            <div className="flex flex-col sm:items-end text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-mono text-[#1C1917]">
                <Hash className="w-3.5 h-3.5 text-[#EA580C]" />
                <span className="font-bold">Ref: {result.verificationId}</span>
                <button
                  onClick={handleCopyId}
                  title="Copy reference ID"
                  className="text-[#78716C] hover:text-[#EA580C] ml-1 p-0.5 rounded cursor-pointer no-print"
                >
                  {copiedId ? <Check className="w-3 h-3 text-[#16A34A]" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="flex items-center gap-1.5 text-[#78716C]">
                <Calendar className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Short explanation */}
          <p className="text-sm text-[#1C1917] leading-relaxed mb-4">
            {result.summaryExplanation}
          </p>

          {/* Prototype Disclosure Notice */}
          <div className="text-[11px] text-[#78716C] pt-3 border-t border-black/5 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
            <span>
              Demonstration Mode: Evaluated against fictional academic test fixtures. Not an official state educational accreditation record.
            </span>
          </div>
        </div>

        {/* Field-by-Field Registry Audit */}
        <div className="bg-white rounded-xl border border-[#FED7AA] overflow-hidden shadow-[0_2px_8px_rgba(234,88,12,0.03)] mb-8">
          <div className="p-4 bg-[#FFFDF7] border-b border-[#FED7AA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-[#EA580C]" />
              <h3 className="text-sm font-bold text-[#1C1917] font-heading">
                Extracted Academic Details vs. Registry
              </h3>
            </div>
            <span className="text-xs text-[#78716C]">
              Field comparison audit
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFFDF7] text-[#78716C] font-semibold border-b border-[#FED7AA]">
                <tr>
                  <th className="py-3 px-4 w-1/4">Field</th>
                  <th className="py-3 px-4 w-1/3">Extracted from Document</th>
                  <th className="py-3 px-4 w-1/3">Authenticated Record</th>
                  <th className="py-3 px-4 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5EBE1] text-[#1C1917]">
                {result.comparisons.map((comp, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FFFDF7]/50'}>
                    <td className="py-3 px-4 font-bold text-[#1C1917]">
                      {comp.field}
                    </td>
                    <td className="py-3 px-4 font-mono text-[#78716C]">
                      {comp.extractedValue || '—'}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-[#1C1917]">
                      {comp.registryValue || '—'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {comp.isMatch ? (
                        <span className="inline-flex items-center gap-1 font-bold text-[#059669]">
                          <Check className="w-3.5 h-3.5" />
                          Match
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-bold text-[#DC2626]">
                          <X className="w-3.5 h-3.5" />
                          Mismatch
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Matched Institution Signatory details if record found */}
          {result.matchedRecord && (
            <div className="p-4 bg-[#FFFDF7] border-t border-[#FED7AA] text-xs text-[#78716C] grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>Issuing Authority: <strong className="text-[#1C1917]">{result.matchedRecord.institutionName}</strong></span>
              </div>
              <div>
                <span>Authorized Signatory: <strong className="text-[#1C1917]">{result.matchedRecord.authorizedSignatory}</strong></span>
              </div>
              <div className="sm:col-span-2 text-[11px] text-[#A8A29E] font-mono truncate">
                Registry Cryptographic Hash: {result.matchedRecord.recordHash}
              </div>
            </div>
          )}
        </div>

        {/* Next Recommended Action */}
        <div className="p-5 rounded-xl bg-[#FFFDF7] border border-[#FED7AA] mb-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1.5 flex items-center gap-2 font-heading">
            <ShieldAlert className="w-4 h-4 text-[#EA580C]" />
            Next Recommended Action
          </h4>
          <p className="text-xs text-[#78716C] leading-relaxed">
            {isVerified &&
              'The credential details align with the registered graduation record. You may download or archive this official verification statement for administrative compliance.'}
            {isRequiresAudit &&
              'Discrepancies or revocation status detected. Contact the Registrar’s Office of the issuing university with this reference ID to request manual transcript review.'}
            {isNotFound &&
              'No matching record exists for the provided identifier. Re-check the certificate serial number for typing errors, or request direct institutional verification.'}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#F5EBE1] no-print">
          <div className="text-xs text-[#A8A29E] font-mono">
            Fingerprint: {result.documentHash.slice(0, 24)}...
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-[#1C1917] bg-white hover:bg-[#FFFDF7] border border-[#FED7AA] rounded-lg transition-colors cursor-pointer"
            >
              Print / Download Report
            </button>
            <button
              onClick={onVerifyAnother}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#C2410C] hover:to-[#EA580C] rounded-lg transition-all shadow-[0_2px_8px_rgba(234,88,12,0.25)] cursor-pointer"
            >
              Verify Another Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
