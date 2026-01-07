'use client';

import { useState, useRef, useEffect } from 'react';

export function DownloadCVButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDownloadMobile = (language: 'es' | 'en') => {
    setIsOpen(false);
  };

  const handleDownloadDesktop = (language: 'es' | 'en') => {
    const fileName = language === 'es' ? 'CV-web-Johann-Vasquez-ES.pdf' : 'CV-web-Johann-Vasquez-EN.pdf';
    window.open(`/${fileName}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-3 bg-[#2DD4BF] text-[#0F1115] rounded-lg hover:bg-[#5EEAD4] transition-all duration-200 font-medium shadow-lg shadow-[#2DD4BF]/20 hover:shadow-[#2DD4BF]/40"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Descargar CV
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Dropdown para móvil - Descarga directa */}
          <div className="md:hidden absolute top-full mt-2 w-full min-w-[200px] bg-[#181B23] border border-[#2DD4BF]/20 rounded-lg shadow-xl shadow-[#2DD4BF]/10 overflow-hidden z-50 opacity-0 animate-fadeInDropdown">
            <a
              href="/CV-web-Johann-Vasquez-ES.pdf"
              download="CV_Johann_Vasquez_ES.pdf"
              onClick={() => handleDownloadMobile('es')}
              className="w-full px-4 py-3 text-left text-[#EAEAEA] hover:bg-[#2DD4BF]/10 transition-colors duration-200 flex items-center gap-2"
            >
              <span className="text-sm font-semibold text-[#2DD4BF]">ES</span>
              Español
            </a>
            <a
              href="/CV-web-Johann-Vasquez-EN.pdf"
              download="CV_Johann_Vasquez_EN.pdf"
              onClick={() => handleDownloadMobile('en')}
              className="w-full px-4 py-3 text-left text-[#EAEAEA] hover:bg-[#2DD4BF]/10 transition-colors duration-200 flex items-center gap-2 border-t border-[#2DD4BF]/10"
            >
              <span className="text-sm font-semibold text-[#2DD4BF]">EN</span>
              English
            </a>
          </div>

          {/* Dropdown para desktop - Abrir en nueva pestaña */}
          <div className="hidden md:block absolute top-full mt-2 w-full min-w-[200px] bg-[#181B23] border border-[#2DD4BF]/20 rounded-lg shadow-xl shadow-[#2DD4BF]/10 overflow-hidden z-50 opacity-0 animate-fadeInDropdown">
            <a
              href="/CV-web-Johann-Vasquez-ES.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleDownloadDesktop('es')}
              className="w-full px-4 py-3 text-left text-[#EAEAEA] hover:bg-[#2DD4BF]/10 transition-colors duration-200 flex items-center gap-2"
            >
              <span className="text-sm font-semibold text-[#2DD4BF]">ES</span>
              Español
            </a>
            <a
              href="/CV-web-Johann-Vasquez-EN.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleDownloadDesktop('en')}
              className="w-full px-4 py-3 text-left text-[#EAEAEA] hover:bg-[#2DD4BF]/10 transition-colors duration-200 flex items-center gap-2 border-t border-[#2DD4BF]/10"
            >
              <span className="text-sm font-semibold text-[#2DD4BF]">EN</span>
              English
            </a>
          </div>
        </>
      )}
    </div>
  );
}
