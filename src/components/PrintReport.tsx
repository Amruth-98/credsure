import React from 'react';
import { VerificationResult } from '../types';

interface PrintReportProps {
  result: VerificationResult;
}

export const PrintReport: React.FC<PrintReportProps> = ({ result }) => {
  const isVerified = result.status === 'VERIFIED';
  const isRequiresAudit = result.status === 'REQUIRES_INSTITUTIONAL_VERIFICATION';

  const formattedDate = new Date(result.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return (
    <div className="hidden print:block p-8 bg-white text-black font-sans max-w-3xl mx-auto">
      {/* Official Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            CREDSURE
          </h1>
          <p className="text-xs uppercase tracking-wider text-slate-600 font-semibold mt-0.5">
            Academic Credential Authentication Audit Report
          </p>
        </div>
        <div className="text-right text-xs text-slate-600">
          <div>Report Ref: <strong className="font-mono text-slate-900">{result.verificationId}</strong></div>
          <div>Issued: {formattedDate}</div>
        </div>
      </div>

      {/* Verification Verdict Banner */}
      <div className="border border-slate-300 p-4 rounded-md mb-6 bg-slate-50">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Official Audit Decision:
          </span>
          <span
            className={`text-sm font-bold px-3 py-1 rounded border uppercase tracking-wider ${
              isVerified
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : isRequiresAudit
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-slate-100 text-slate-800 border-slate-300'
            }`}
          >
            {result.status.replace(/_/g, ' ')}
          </span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          {result.summaryExplanation}
        </p>
      </div>

      {/* Field-by-Field Audit Matrix */}
      <div className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
          Audit Comparison Summary
        </h2>
        <table className="w-full text-left text-xs border border-slate-300">
          <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-300">
            <tr>
              <th className="py-2 px-3 border-r border-slate-300">Parameter</th>
              <th className="py-2 px-3 border-r border-slate-300">Extracted from Document</th>
              <th className="py-2 px-3 border-r border-slate-300">Registry Value</th>
              <th className="py-2 px-3 text-right">Audit Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-800">
            {result.comparisons.map((comp, idx) => (
              <tr key={idx}>
                <td className="py-2 px-3 font-semibold border-r border-slate-300">{comp.field}</td>
                <td className="py-2 px-3 font-mono border-r border-slate-300">{comp.extractedValue || '—'}</td>
                <td className="py-2 px-3 font-mono border-r border-slate-300">{comp.registryValue || '—'}</td>
                <td className="py-2 px-3 text-right font-semibold">
                  {comp.isMatch ? 'MATCH' : 'DISCREPANCY'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cryptographic & Registry Metadata */}
      <div className="border border-slate-300 p-4 rounded-md mb-8 text-xs text-slate-600 space-y-1">
        <div>Document Hash: <span className="font-mono text-slate-900">{result.documentHash}</span></div>
        {result.matchedRecord && (
          <>
            <div>Authorized Issuing Body: <span className="font-semibold text-slate-900">{result.matchedRecord.institutionName}</span></div>
            <div>Signatory on File: <span className="font-semibold text-slate-900">{result.matchedRecord.authorizedSignatory}</span></div>
            <div>Registry Hash: <span className="font-mono text-slate-900">{result.matchedRecord.recordHash}</span></div>
          </>
        )}
      </div>

      {/* Signoff & Seal Section */}
      <div className="pt-8 border-t border-slate-300 flex justify-between items-end text-xs text-slate-600">
        <div>
          <div className="w-32 border-b border-slate-400 mb-1"></div>
          <div>Auditor Signature</div>
          <div className="text-[10px] text-slate-500">CredSure Verification Engine</div>
        </div>

        <div className="text-center border-2 border-slate-400 p-2 rounded text-[10px] uppercase font-bold tracking-wider text-slate-700">
          [ AUTHENTICATED AUDIT COPY ]
        </div>

        <div className="text-right text-[10px] text-slate-500">
          <div>Page 1 of 1</div>
          <div>Verified via Demonstration Database</div>
        </div>
      </div>
    </div>
  );
};
