import React from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, XCircle, Lock } from 'lucide-react';
import { 
  HeroCertificateIllustration, 
  Step1UploadIllustration, 
  Step2ExtractIllustration, 
  Step3CompareIllustration 
} from './Illustrations';

interface HomePageProps {
  onNavigate: (page: 'home' | 'verify' | 'about') => void;
  onSelectSampleForTest?: (sampleId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-white text-[#1C1917] overflow-x-hidden">
      {/* SECTION 1: HERO (Balanced Two-Column Layout in Yellow, Orange & White) */}
      <section className="max-w-[1240px] mx-auto px-6 pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#B45309] text-[12px] font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#EA580C]"></span>
              EDUCATIONAL CREDENTIAL VERIFICATION
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#1C1917] leading-[1.12] font-heading">
              Academic credentials.<br className="hidden sm:inline" /> Verified with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EA580C] via-[#F59E0B] to-[#D97706]">confidence.</span>
            </h1>

            <p className="text-lg text-[#78716C] max-w-xl leading-relaxed">
              Upload an educational certificate, extract its details, and compare them with available authenticated academic records.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onNavigate('verify')}
                className="px-7 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#C2410C] hover:to-[#EA580C] rounded-lg transition-all shadow-[0_4px_14px_rgba(234,88,12,0.3)] cursor-pointer text-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#EA580C]"
              >
                Verify a Certificate
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3.5 text-sm font-semibold text-[#1C1917] bg-white hover:bg-[#FFFDF7] border border-[#FED7AA] rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-2 shadow-2xs"
              >
                See How It Works
                <ArrowRight className="w-4 h-4 text-[#EA580C]" />
              </button>
            </div>

            {/* Privacy note */}
            <div className="pt-2 flex items-center gap-2 text-xs text-[#78716C]">
              <Lock className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Your documents should be handled securely.</span>
            </div>
          </div>

          {/* Right Column: Custom Visual Certificate Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroCertificateIllustration />
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW VERIFICATION WORKS (Alternating Storytelling Sections) */}
      <section className="border-t border-[#F5EBE1] bg-white">
        {/* Section Heading & Subtitle */}
        <div className="max-w-[1240px] mx-auto px-6 pt-20 pb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1917] font-heading">
            From certificate to verification result
          </h2>
          <p className="text-base text-[#78716C] mt-3 max-w-xl mx-auto">
            A simple process for checking educational records.
          </p>
        </div>

        {/* STEP 1: Upload the certificate (Soft warm yellow/cream background) */}
        <div className="bg-[#FFFDF7] border-y border-[#FED7AA]/60 py-16 md:py-24">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text Block with Large Subtle Step Number in Pale Gold */}
              <div className="lg:col-span-6 space-y-4">
                <div className="text-5xl sm:text-6xl font-extrabold font-mono text-[#FDE68A] tracking-tight select-none">
                  01
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1917] font-heading">
                  Upload the certificate
                </h3>
                <p className="text-base text-[#78716C] leading-relaxed max-w-lg">
                  Choose an academic certificate in PDF, JPG, JPEG, or PNG format. The system prepares the document for text extraction.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('verify')}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#EA580C] hover:text-[#C2410C] cursor-pointer"
                  >
                    Select a document to test &rarr;
                  </button>
                </div>
              </div>

              {/* Visual: Browser Upload Panel */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end">
                <Step1UploadIllustration />
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2: Extract academic details (White background) */}
        <div className="bg-white py-16 md:py-24">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Visual: Certificate to Extracted Fields */}
              <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center lg:justify-start">
                <Step2ExtractIllustration />
              </div>

              {/* Text Block with Large Subtle Step Number in Pale Gold */}
              <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
                <div className="text-5xl sm:text-6xl font-extrabold font-mono text-[#FDE68A] tracking-tight select-none">
                  02
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1917] font-heading">
                  Extract academic details
                </h3>
                <p className="text-base text-[#78716C] leading-relaxed max-w-lg">
                  Read the certificate and extract details such as the student's name, institution, course, registration number, and graduation year.
                </p>
                <div className="pt-2 text-xs text-[#78716C]">
                  Uses client-side optical character recognition with editable field review.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3: Compare with available records (Soft warm yellow/cream background) */}
        <div className="bg-[#FFFDF7] border-y border-[#FED7AA]/60 py-16 md:py-24">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text Block with Large Subtle Step Number in Pale Gold */}
              <div className="lg:col-span-6 space-y-4">
                <div className="text-5xl sm:text-6xl font-extrabold font-mono text-[#FDE68A] tracking-tight select-none">
                  03
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1917] font-heading">
                  Compare with available records
                </h3>
                <p className="text-base text-[#78716C] leading-relaxed max-w-lg">
                  Compare the extracted information with authenticated academic records and identify matches, missing records, or details requiring institutional review.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('verify')}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#EA580C] hover:text-[#C2410C] cursor-pointer"
                  >
                    Start verification workflow &rarr;
                  </button>
                </div>
              </div>

              {/* Visual: Comparison panel */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end">
                <Step3CompareIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: VERIFICATION OUTCOMES (Compact, Clean 3-Item Layout) */}
      <section className="max-w-[1240px] mx-auto px-6 py-20 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1C1917] font-heading">
            Clear, verifiable outcomes
          </h2>
          <p className="text-sm text-[#78716C] mt-2">
            Every audit resolves into one of three definitive states.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Outcome 1: Verified (Restrained Green) */}
          <div className="p-6 rounded-xl bg-white border border-[#E7E5E4] shadow-[0_2px_8px_rgba(234,88,12,0.03)] hover:border-[#10B981] transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#1C1917] mb-2 font-heading">
              Verified
            </h3>
            <p className="text-sm text-[#78716C] leading-relaxed">
              The submitted details match an active, authenticated academic record.
            </p>
          </div>

          {/* Outcome 2: Not Found (Restrained Slate/Neutral) */}
          <div className="p-6 rounded-xl bg-white border border-[#E7E5E4] shadow-[0_2px_8px_rgba(234,88,12,0.03)] hover:border-[#F59E0B] transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#FFFDF7] border border-[#FED7AA] text-[#78716C] flex items-center justify-center mb-4">
              <XCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#1C1917] mb-2 font-heading">
              Not Found
            </h3>
            <p className="text-sm text-[#78716C] leading-relaxed">
              No matching record was found in the available records.
            </p>
          </div>

          {/* Outcome 3: Requires Institutional Verification (Warm Amber/Yellow) */}
          <div className="p-6 rounded-xl bg-white border border-[#E7E5E4] shadow-[0_2px_8px_rgba(234,88,12,0.03)] hover:border-[#EA580C] transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-[#D97706] flex items-center justify-center mb-4">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#1C1917] mb-2 font-heading">
              Requires Institutional Verification
            </h3>
            <p className="text-sm text-[#78716C] leading-relaxed">
              Some details need confirmation from the issuing institution.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: FINAL CALL TO ACTION (Warm Light-Orange/Yellow Background) */}
      <section className="bg-gradient-to-b from-[#FFFDF7] via-[#FFFBEB] to-[#FFF7ED] border-t border-[#FED7AA]/60 py-20 text-center">
        <div className="max-w-[700px] mx-auto px-6 space-y-4">
          <div className="inline-block text-xs font-bold text-[#EA580C] uppercase tracking-wider mb-1">
            START VERIFYING TODAY
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1917] font-heading">
            Ready to check an academic certificate?
          </h2>
          <p className="text-base text-[#78716C] leading-relaxed">
            Upload a certificate to begin the verification process.
          </p>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('verify')}
              className="px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#C2410C] hover:to-[#EA580C] rounded-lg transition-all shadow-[0_4px_14px_rgba(234,88,12,0.3)] cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#EA580C]"
            >
              Verify a Certificate
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
