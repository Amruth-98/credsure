import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: 'home' | 'verify' | 'result' | 'about';
  onNavigate: (page: 'home' | 'verify' | 'about') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: 'home' | 'verify' | 'about') => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#F4EFEA] shadow-[0_1px_3px_rgba(234,88,12,0.03)] transition-all">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Custom document-and-checkmark logo + CredSure wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#EA580C] rounded-md cursor-pointer group"
        >
          {/* Custom Document & Checkmark SVG Logo in warm Yellow-Orange */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#EA580C] flex items-center justify-center text-white shadow-xs group-hover:from-[#D97706] group-hover:to-[#C2410C] transition-all">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Document Outline with folded top-right corner */}
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              {/* Checkmark inside document */}
              <path d="m9 15 2 2 4-4" strokeWidth="2.5" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-[#1C1917] whitespace-nowrap font-heading">
            Cred<span className="text-[#EA580C]">Sure</span>
          </span>
        </button>

        {/* Center/Right Nav links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#78716C]">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-[#1C1917] ${
              currentPage === 'home'
                ? 'text-[#EA580C] font-semibold'
                : 'text-[#78716C]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('verify')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-[#1C1917] ${
              currentPage === 'verify'
                ? 'text-[#EA580C] font-semibold'
                : 'text-[#78716C]'
            }`}
          >
            Verify Certificate
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-[#1C1917] ${
              currentPage === 'about'
                ? 'text-[#EA580C] font-semibold'
                : 'text-[#78716C]'
            }`}
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="transition-colors whitespace-nowrap cursor-pointer text-[#78716C] hover:text-[#1C1917]"
          >
            About
          </button>
        </nav>

        {/* Far Right: Warm Orange Action Button (Desktop) */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('verify')}
            className="px-4.5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#C2410C] hover:to-[#EA580C] rounded-lg transition-all shadow-[0_2px_8px_rgba(234,88,12,0.25)] cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#EA580C] active:scale-[0.99]"
          >
            Verify Certificate
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#78716C] hover:text-[#1C1917] rounded-lg border border-[#F4EFEA] cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#F4EFEA] px-6 py-4 space-y-3">
          <button
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left py-2 text-sm font-medium ${
              currentPage === 'home' ? 'text-[#EA580C] font-semibold' : 'text-[#1C1917]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('verify')}
            className={`block w-full text-left py-2 text-sm font-medium ${
              currentPage === 'verify' ? 'text-[#EA580C] font-semibold' : 'text-[#1C1917]'
            }`}
          >
            Verify Certificate
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`block w-full text-left py-2 text-sm font-medium ${
              currentPage === 'about' ? 'text-[#EA580C] font-semibold' : 'text-[#1C1917]'
            }`}
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="block w-full text-left py-2 text-sm font-medium text-[#1C1917]"
          >
            About
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('verify')}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#C2410C] hover:to-[#EA580C] rounded-lg transition-colors cursor-pointer"
            >
              Verify Certificate
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
