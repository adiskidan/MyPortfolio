import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Education from './components/Education';
import InteractiveTerminal from './components/InteractiveTerminal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function PortfolioApp() {
  const themeContext = useTheme();
  const isBright = Boolean(themeContext?.isBright);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 selection:bg-cyan-500/25 ${
      isBright 
        ? 'bg-[#f8fafc] text-slate-900 selection:text-cyan-700' 
        : 'bg-[#080c14] text-slate-100 selection:text-cyan-300'
    }`}>
      {/* Sticky Navigation with Theme Switcher */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <Skills />
        <Projects />
        <Certificates />
        <Education />
        <Contact />
      </main>

      {/* Floating Corner Dev Terminal (>_ Dev Terminal) */}
      <InteractiveTerminal />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
