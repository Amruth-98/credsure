import React from 'react';

/**
 * Section 1 Hero Illustration:
 * Fictional academic certificate with realistic layout, abstract placeholder lines,
 * subtle golden-orange seal, and a separate conceptual verification panel.
 */
export const HeroCertificateIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-[520px] mx-auto select-none">
      {/* Background warm soft glow / offset card backdrop */}
      <div className="absolute inset-0 bg-[#FFFBEB] rounded-2xl transform rotate-1 scale-[0.98] -z-10 border border-[#FDE68A]"></div>

      {/* Main Certificate Document Card */}
      <div className="bg-white rounded-xl border border-[#F4EFEA] shadow-[0_12px_36px_rgba(234,88,12,0.06)] p-7 md:p-9 relative overflow-hidden">
        {/* Subtle decorative inner certificate border in warm gold */}
        <div className="absolute inset-3.5 border border-[#FDE68A]/60 rounded-lg pointer-events-none"></div>

        {/* Certificate Header: University Crest / Institution Badge */}
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <div className="w-11 h-11 rounded-full bg-[#FFFBEB] border border-[#FCD34D] flex items-center justify-center mb-2.5 shadow-2xs">
            <svg
              className="w-5 h-5 text-[#D97706]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <div className="h-3 w-40 bg-[#1C1917] rounded-xs mb-1.5 opacity-90"></div>
          <div className="h-2 w-28 bg-[#A8A29E] rounded-xs"></div>
        </div>

        {/* Certificate Title Banner with Orange/Amber tint */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-2.5 w-48 bg-gradient-to-r from-[#F59E0B] to-[#EA580C] rounded-xs mb-1.5 opacity-90"></div>
          <div className="h-1.5 w-32 bg-[#E7E5E4] rounded-xs"></div>
        </div>

        {/* Recipient Presentation Text */}
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <div className="h-1.5 w-24 bg-[#A8A29E] rounded-xs"></div>
          {/* Prominent Student Name abstract bar */}
          <div className="h-4 w-52 bg-[#1C1917] rounded-sm my-1"></div>
          <div className="h-1.5 w-44 bg-[#A8A29E] rounded-xs"></div>
          <div className="h-2.5 w-40 bg-[#44403C] rounded-xs"></div>
        </div>

        {/* Document Footer: Signatures & Golden University Seal */}
        <div className="flex items-end justify-between pt-6 border-t border-[#F5EBE1] mt-4">
          {/* Left signature placeholder */}
          <div className="flex flex-col items-center">
            <svg className="w-20 h-6 text-[#A8A29E]" viewBox="0 0 100 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 18 C 15 5, 25 22, 35 12 C 45 4, 55 19, 70 14 C 80 10, 90 20, 95 15" strokeLinecap="round" />
            </svg>
            <div className="w-16 h-1 bg-[#D6D3D1] rounded-xs mt-1"></div>
            <div className="w-12 h-1 bg-[#E7E5E4] rounded-xs mt-1"></div>
          </div>

          {/* Central Golden Seal */}
          <div className="w-12 h-12 rounded-full border-2 border-[#F59E0B] bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] flex items-center justify-center p-1 shadow-xs">
            <div className="w-full h-full rounded-full border border-dashed border-[#D97706] flex items-center justify-center">
              <span className="text-[8px] font-extrabold tracking-widest text-[#B45309]">SEAL</span>
            </div>
          </div>

          {/* Right signature placeholder */}
          <div className="flex flex-col items-center">
            <svg className="w-20 h-6 text-[#A8A29E]" viewBox="0 0 100 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 16 C 20 8, 30 20, 45 10 C 60 2, 70 16, 85 11" strokeLinecap="round" />
            </svg>
            <div className="w-16 h-1 bg-[#D6D3D1] rounded-xs mt-1"></div>
            <div className="w-12 h-1 bg-[#E7E5E4] rounded-xs mt-1"></div>
          </div>
        </div>
      </div>

      {/* Floating Verification Result Panel in warm orange & white */}
      <div className="absolute -bottom-6 -right-3 md:-right-6 w-[270px] sm:w-[290px] bg-white rounded-xl border border-[#FED7AA] shadow-[0_16px_32px_rgba(234,88,12,0.1)] p-4.5">
        <div className="flex items-center gap-3 mb-3">
          {/* Conceptual Green Checkmark Badge with Golden Border */}
          <div className="w-8 h-8 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669] shrink-0">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-bold text-[#1C1917]">
              Institutional Record Check
            </div>
            <div className="text-[11px] text-[#059669] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span>
              Active Conferral Matched
            </div>
          </div>
        </div>

        {/* Abstract data rows */}
        <div className="space-y-1.5 pt-2 border-t border-[#F5EBE1]">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#78716C]">Registry ID</span>
            <span className="font-mono text-[#EA580C] font-semibold">EDU-2024-88419</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#78716C]">Audit Ledger</span>
            <span className="text-[#059669] font-medium font-mono text-[10px]">Verified Match &check;</span>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-[#F5EBE1] text-[10px] text-[#A8A29E] text-center">
          Conceptual verification workflow
        </div>
      </div>
    </div>
  );
};

/**
 * Step 1 Illustration:
 * Browser upload panel in warm orange & yellow accents showing file upload.
 */
export const Step1UploadIllustration: React.FC = () => {
  return (
    <div className="w-full max-w-[460px] mx-auto bg-white rounded-xl border border-[#F4EFEA] shadow-[0_8px_24px_rgba(234,88,12,0.05)] overflow-hidden select-none">
      {/* Browser Header Bar */}
      <div className="px-4 py-3 bg-[#FFFDF7] border-b border-[#F4EFEA] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FDE68A]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#FED7AA]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#E7E5E4]"></div>
        </div>
        <div className="text-[11px] font-medium text-[#78716C] font-mono">
          credsure.verify / upload
        </div>
        <div className="w-6"></div>
      </div>

      {/* Upload Zone Area */}
      <div className="p-6">
        <div className="border-2 border-dashed border-[#FED7AA] rounded-xl p-6 bg-[#FFFDF7] flex flex-col items-center text-center">
          {/* Upload Cloud / Arrow Icon in warm Orange */}
          <div className="w-12 h-12 rounded-full bg-white border border-[#FED7AA] shadow-2xs flex items-center justify-center text-[#EA580C] mb-3">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
              <path d="M12 12v9" />
              <path d="m16 16-4-4-4 4" />
            </svg>
          </div>

          <div className="text-xs font-bold text-[#1C1917] mb-1">
            Drop certificate document here
          </div>
          <div className="text-[11px] text-[#78716C] mb-4">
            Supports PDF, JPG, JPEG, or PNG &middot; Up to 10MB
          </div>

          {/* Staged Document Card Preview */}
          <div className="w-full bg-white rounded-lg border border-[#FED7AA] p-3 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-9 rounded bg-[#FFF7ED] border border-[#FDBA74] flex items-center justify-center text-[#EA580C] text-[10px] font-bold">
                PDF
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-[#1C1917]">
                  academic_degree_scan.pdf
                </div>
                <div className="text-[10px] text-[#78716C]">
                  2.4 MB &middot; Ready for OCR ingestion
                </div>
              </div>
            </div>

            <span className="text-[10px] font-semibold text-[#B45309] bg-[#FEF3C7] border border-[#FDE68A] px-2 py-0.5 rounded-full">
              Validated
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Step 2 Illustration:
 * Dual-panel with certificate scanning mapped to structured extracted fields in warm yellow/orange.
 */
export const Step2ExtractIllustration: React.FC = () => {
  return (
    <div className="w-full max-w-[500px] mx-auto select-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-center relative">
        {/* Left Side: Scanned Document with OCR highlight indicators */}
        <div className="bg-white rounded-xl border border-[#F4EFEA] shadow-[0_6px_20px_rgba(234,88,12,0.04)] p-4 relative">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#F5EBE1]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716C]">
              Scanned Certificate
            </span>
            <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse"></span>
          </div>

          {/* Mini certificate layout with warm amber/orange scan boxes */}
          <div className="space-y-2.5">
            <div className="h-2 w-24 bg-[#E7E5E4] rounded-xs mx-auto"></div>
            
            {/* Scanned field 1: Institution */}
            <div className="p-1 rounded border border-[#F59E0B]/50 bg-[#FFFBEB]">
              <div className="h-2 w-28 bg-[#D97706] rounded-xs opacity-80"></div>
            </div>

            {/* Scanned field 2: Student Name */}
            <div className="p-1 rounded border border-[#EA580C]/50 bg-[#FFF7ED]">
              <div className="h-2.5 w-32 bg-[#1C1917] rounded-xs"></div>
            </div>

            {/* Scanned field 3: Degree */}
            <div className="p-1 rounded border border-[#F59E0B]/50 bg-[#FFFBEB]">
              <div className="h-2 w-36 bg-[#44403C] rounded-xs"></div>
            </div>

            {/* Scanned field 4: ID */}
            <div className="p-1 rounded border border-[#EA580C]/50 bg-[#FFF7ED]">
              <div className="h-2 w-20 bg-[#EA580C] rounded-xs"></div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#F5EBE1] flex items-center justify-between text-[10px] text-[#78716C]">
            <span>Optical Scan</span>
            <span className="font-mono text-[#EA580C] font-semibold">100% Parsed</span>
          </div>
        </div>

        {/* Center connector icon in warm orange */}
        <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white items-center justify-center shadow-md">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>

        {/* Right Side: Structured Extracted Fields Card */}
        <div className="bg-[#FFFDF7] rounded-xl border border-[#FED7AA] shadow-[0_6px_20px_rgba(234,88,12,0.04)] p-4">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#FED7AA]/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C]">
              Extracted Fields
            </span>
            <span className="text-[10px] font-semibold text-[#059669]">Editable</span>
          </div>

          <div className="space-y-2 text-left">
            <div className="bg-white p-1.5 rounded border border-[#FED7AA]">
              <div className="text-[9px] text-[#78716C] uppercase">Student Name</div>
              <div className="text-[11px] font-bold text-[#1C1917]">Elena Vance</div>
            </div>

            <div className="bg-white p-1.5 rounded border border-[#FED7AA]">
              <div className="text-[9px] text-[#78716C] uppercase">Conferred Degree</div>
              <div className="text-[11px] font-medium text-[#1C1917] truncate">B.Sc. Computer Science</div>
            </div>

            <div className="bg-white p-1.5 rounded border border-[#FED7AA]">
              <div className="text-[9px] text-[#78716C] uppercase">Certificate Serial #</div>
              <div className="text-[11px] font-mono font-semibold text-[#EA580C]">EDU-2024-88419</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Step 3 Illustration:
 * Comparison panel in warm yellow & orange detailing registry match.
 */
export const Step3CompareIllustration: React.FC = () => {
  return (
    <div className="w-full max-w-[460px] mx-auto bg-white rounded-xl border border-[#F4EFEA] shadow-[0_8px_24px_rgba(234,88,12,0.05)] p-5 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F5EBE1]">
        <div>
          <div className="text-xs font-bold text-[#1C1917]">
            Academic Registry Comparison
          </div>
          <div className="text-[10px] text-[#78716C]">
            Querying Authorized University Ledger
          </div>
        </div>
        <span className="text-[10px] font-mono bg-[#FFFBEB] text-[#D97706] px-2 py-0.5 rounded border border-[#FDE68A]">
          LEDGER: SYNCED
        </span>
      </div>

      {/* Comparison Rows */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#FFFDF7] border border-[#FED7AA] text-xs">
          <div>
            <div className="text-[11px] font-semibold text-[#1C1917]">Certificate Serial No</div>
            <div className="text-[10px] font-mono text-[#EA580C]">EDU-2024-88419</div>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#059669]">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Match</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-[#FFFDF7] border border-[#FED7AA] text-xs">
          <div>
            <div className="text-[11px] font-semibold text-[#1C1917]">Graduate Full Name</div>
            <div className="text-[10px] text-[#78716C]">Elena Vance</div>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#059669]">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Match</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-[#FFFDF7] border border-[#FED7AA] text-xs">
          <div>
            <div className="text-[11px] font-semibold text-[#1C1917]">Conferred Degree Title</div>
            <div className="text-[10px] text-[#78716C]">B.Sc. Computer Science</div>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#059669]">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Match</span>
          </div>
        </div>
      </div>

      {/* Result Status Preview Banner */}
      <div className="p-3 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center text-[10px] font-bold">
            &check;
          </div>
          <span className="text-xs font-bold text-[#065F46]">
            Record Verified
          </span>
        </div>
        <span className="text-[10px] font-medium text-[#047857]">
          Active Credential
        </span>
      </div>
    </div>
  );
};
