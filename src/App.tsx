import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { VerifyPage } from './components/VerifyPage';
import { ResultsPage } from './components/ResultsPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { PrintReport } from './components/PrintReport';
import { VerificationResult } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'verify' | 'result' | 'about'>('home');
  const [activeResult, setActiveResult] = useState<VerificationResult | null>(null);
  const [presetSampleId, setPresetSampleId] = useState<string | null>(null);

  const handleNavigate = (page: 'home' | 'verify' | 'about') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVerificationComplete = (result: VerificationResult) => {
    setActiveResult(result);
    setCurrentPage('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVerifyAnother = () => {
    setActiveResult(null);
    setPresetSampleId(null);
    setCurrentPage('verify');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToVerifyWithSample = (sampleId: string) => {
    setPresetSampleId(sampleId);
    setCurrentPage('verify');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1C1917] font-sans">
      {/* Navigation (hidden when printing) */}
      <div className="no-print">
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full no-print">
        {currentPage === 'home' && (
          <HomePage 
            onNavigate={handleNavigate} 
            onSelectSampleForTest={handleNavigateToVerifyWithSample} 
          />
        )}

        {currentPage === 'verify' && (
          <VerifyPage
            onVerificationComplete={handleVerificationComplete}
            presetSampleId={presetSampleId}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'result' && activeResult && (
          <ResultsPage
            result={activeResult}
            onVerifyAnother={handleVerifyAnother}
          />
        )}

        {currentPage === 'about' && (
          <HowItWorksPage
            onNavigate={handleNavigate}
            onNavigateToVerifyWithSample={handleNavigateToVerifyWithSample}
          />
        )}
      </main>

      {/* Printable Report (rendered strictly for @media print) */}
      {activeResult && <PrintReport result={activeResult} />}

      {/* Footer (hidden when printing) */}
      <div className="no-print mt-auto">
        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
