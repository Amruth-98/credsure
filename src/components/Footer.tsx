import React from 'react';

interface FooterProps {
  onNavigate: (page: 'home' | 'verify' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-white border-t border-[#F5EBE1] mt-auto">
      <div className="max-w-[1240px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#F5EBE1]">
          {/* Logo & One-line product description */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#EA580C] flex items-center justify-center text-white shadow-2xs">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="m9 15 2 2 4-4" strokeWidth="2.5" />
                </svg>
              </div>
              <span className="text-base font-extrabold text-[#1C1917] font-heading">
                Cred<span className="text-[#EA580C]">Sure</span>
              </span>
            </div>
            <span className="hidden sm:inline text-[#E7E5E4]">&middot;</span>
            <p className="text-xs text-[#78716C]">
              Online Educational Record Authentication and Verification System.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 text-xs font-semibold text-[#78716C]">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#EA580C] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('verify')}
              className="hover:text-[#EA580C] transition-colors cursor-pointer"
            >
              Verify Certificate
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-[#EA580C] transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-[#EA580C] transition-colors cursor-pointer"
            >
              Privacy
            </button>
          </nav>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8A29E]">
          <div>
            &copy; {new Date().getFullYear()} CredSure. All rights reserved.
          </div>
          <div className="text-[11px]">
            Academic verification prototype &middot; Fictional test database comparison
          </div>
        </div>
      </div>
    </footer>
  );
};
