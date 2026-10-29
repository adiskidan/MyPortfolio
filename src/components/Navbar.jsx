import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const themeContext = useTheme();
  const isBright = Boolean(themeContext?.isBright);
  const toggleTheme = themeContext?.toggleTheme || (() => {});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Map navigation IDs to sections
      const sections = ['hero', 'skills', 'journey', 'projects', 'certificates', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        // Also check 'education' or 'about' if mapped to journey
        let el = document.getElementById(section);
        if (!el && section === 'journey') {
          el = document.getElementById('education');
        }

        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Journey', href: '#journey', id: 'journey' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Certifications', href: '#certificates', id: 'certificates' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isBright
            ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/90 shadow-md shadow-slate-200/40 py-3.5'
            : 'bg-[#080c14]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Adis Kidan Portfolio Home"
          >
            <div className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border transition-all shadow-inner ${
              isBright 
                ? 'border-cyan-500/50 group-hover:border-cyan-600 ring-2 ring-cyan-500/20 bg-slate-100 shadow-cyan-500/10' 
                : 'border-cyan-500/40 group-hover:border-cyan-400 ring-2 ring-cyan-500/20 bg-slate-900 shadow-cyan-500/20'
            }`}>
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.name}
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className={`font-bold tracking-wide text-base transition-colors ${
              isBright 
                ? 'text-slate-900 group-hover:text-cyan-600' 
                : 'text-white group-hover:text-cyan-300'
            }`}>
              {personalInfo.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? isBright
                        ? 'text-cyan-600 font-semibold'
                        : 'text-white font-semibold'
                      : isBright
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-fadeIn" />
                  )}
                </a>
              );
            })}

            {/* Bright / Dark Theme Switcher Button */}
            <div className="ml-2 pl-2 border-l border-slate-700/40 dark:border-slate-700/60">
              <button
                onClick={toggleTheme}
                aria-label={isBright ? "Switch to Dark Mode" : "Switch to Bright Mode"}
                title={isBright ? "Switch to Dark Mode" : "Switch to Bright Mode"}
                className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
                  isBright
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800 shadow-sm'
                    : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700/80 text-amber-400 hover:text-amber-300 shadow-sm shadow-amber-400/10'
                }`}
              >
                {isBright ? (
                  <Moon className="w-4 h-4 text-slate-700 transition-transform rotate-0 hover:-rotate-12" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Right Controls: Theme Toggle + Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label={isBright ? "Switch to Dark Mode" : "Switch to Bright Mode"}
              className={`p-2 rounded-lg border transition-all ${
                isBright
                  ? 'bg-slate-100 border-slate-300 text-slate-800'
                  : 'bg-slate-800/80 border-slate-700/80 text-amber-400'
              }`}
            >
              {isBright ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isBright 
                  ? 'text-slate-700 hover:bg-slate-100' 
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className={`md:hidden px-4 pt-3 pb-5 space-y-1.5 border-b shadow-2xl transition-all ${
          isBright 
            ? 'bg-white/95 backdrop-blur-xl border-slate-200 shadow-slate-300/40' 
            : 'bg-[#0a0f1d]/95 backdrop-blur-xl border-white/10 shadow-black/50'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === link.id
                  ? isBright
                    ? 'text-cyan-600 bg-cyan-50 font-semibold border-l-4 border-cyan-500'
                    : 'text-cyan-400 bg-cyan-500/15 border-l-4 border-cyan-500 font-semibold'
                  : isBright
                    ? 'text-slate-700 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex gap-2">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="flex-1 text-center py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
