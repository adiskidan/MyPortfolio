import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const themeContext = useTheme();
  const isBright = Boolean(themeContext?.isBright);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t py-12 px-4 sm:px-6 lg:px-8 transition-colors ${
      isBright 
        ? 'bg-slate-100 border-slate-200 text-slate-600' 
        : 'bg-[#060910] border-white/5 text-slate-400'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center space-y-3 relative">
        {/* Brand: [AK] Adis Kidan */}
        <div 
          onClick={scrollToTop}
          className="inline-flex items-center gap-2.5 cursor-pointer group select-none"
          title="Back to top"
        >
          <div className="w-8 h-8 rounded-lg bg-[#0284c7] flex items-center justify-center text-white font-black text-xs shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            AK
          </div>
          <span className={`text-base sm:text-lg font-bold tracking-tight group-hover:text-cyan-400 transition-colors ${
            isBright ? 'text-slate-900' : 'text-white'
          }`}>
            {personalInfo.name}
          </span>
        </div>

        {/* Copyright with Ethiopian Calendar (2018 E.C.) */}
        <p className={`text-xs sm:text-sm ${
          isBright ? 'text-slate-600' : 'text-slate-400'
        }`}>
          &copy; {CURRENT_YEAR} {personalInfo.name} (2018 E.C.). All rights reserved.
        </p>

        {/* Scholar & Tech Stack Info */}
        <p className={`text-[11px] sm:text-xs font-normal tracking-wide ${
          isBright ? 'text-slate-500' : 'text-slate-500'
        }`}>
          4th-Year Computer Science Scholar &bull; Debre Berhan University &bull; Engineered with React, Vite &amp; Tailwind CSS
        </p>

        {/* Subtle Back to top button */}
        <button
          onClick={scrollToTop}
          className={`mt-2 p-2 rounded-lg border transition-all cursor-pointer opacity-70 hover:opacity-100 ${
            isBright 
              ? 'bg-white border-slate-300 hover:border-cyan-500 text-slate-600 hover:text-cyan-600 shadow-sm' 
              : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400'
          }`}
          title="Back to top"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
