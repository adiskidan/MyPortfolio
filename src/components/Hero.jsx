import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  MapPin, 
  FileText, 
  Copy, 
  Check, 
  ChevronDown,
  GitFork,
  Sun,
  Layers
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TelegramIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import ResumeModal from './ResumeModal';

const ROLES = [
  'Full-Stack Web & Next.js Developer',
  'Intelligent Web & AI Systems',
  'Scalable Software Engineer',
  'Mobile & Desktop App Developer',
];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const themeContext = useTheme();
  const isBright = Boolean(themeContext?.isBright);

  useEffect(() => {
    let timeoutId;
    const fullText = ROLES[currentRoleIndex];

    if (!isDeleting && currentText === fullText) {
      // Pause at complete word for 2.2 seconds before deleting
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && currentText === '') {
      // Short pause before typing next role
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
      }, 400);
    } else {
      // Typing or deleting next character
      timeoutId = setTimeout(() => {
        const nextChar = isDeleting
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1);
        setCurrentText(nextChar);
      }, isDeleting ? 35 : 85);
    }

    return () => clearTimeout(timeoutId);
  }, [currentText, isDeleting, currentRoleIndex]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <>
      <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-pattern">
        {/* Background ambient lighting */}
        <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none ${
          isBright ? 'bg-cyan-500/10' : 'bg-cyan-500/10'
        }`} />
        <div className={`absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none ${
          isBright ? 'bg-indigo-500/10' : 'bg-purple-500/10'
        }`} />

        <div className="relative max-w-6xl mx-auto w-full">
          {/* Top Status Pill - Placed at Top-Left */}
          <div className="mb-6 lg:mb-8 text-left">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-md shadow-md border ${
              isBright 
                ? 'bg-emerald-50/90 border-emerald-500/40 text-emerald-800 shadow-emerald-500/10' 
                : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
              <span>{personalInfo.statusPill}</span>
            </div>
          </div>

          {/* Main 2-Column Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Profile Avatar Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative group">
                {/* Outer Glowing Neon Ring & Halo */}
                <div className={`absolute -inset-2 rounded-full blur-xl pointer-events-none transition-opacity duration-500 ${
                  isBright 
                    ? 'bg-cyan-400/30 opacity-70' 
                    : 'bg-gradient-to-tr from-cyan-500/50 via-sky-400/40 to-blue-600/50 opacity-80 group-hover:opacity-100 shadow-[0_0_60px_rgba(34,211,238,0.4)]'
                }`} />
                
                {/* Circular Avatar Container */}
                <div className={`relative w-60 h-60 sm:w-72 sm:h-72 rounded-full overflow-hidden border-2 shadow-2xl ring-4 transition-all duration-500 ${
                  isBright 
                    ? 'border-white ring-cyan-500/40 bg-slate-100 shadow-slate-300' 
                    : 'border-cyan-400/80 ring-cyan-500/30 bg-[#060b16] shadow-black'
                }`}>
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Senior Badge */}
                <div className={`absolute bottom-2 right-2 sm:bottom-3 sm:right-3 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-xl backdrop-blur-md border ${
                  isBright 
                    ? 'bg-white/95 text-cyan-800 border-cyan-400 shadow-slate-300' 
                    : 'bg-[#0b1322]/95 text-white border-cyan-500/40 shadow-black'
                }`}>
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{personalInfo.yearSenior}</span>
                </div>
              </div>

              {/* University Location Footer */}
              <div className={`flex items-center gap-1.5 mt-5 text-xs font-mono uppercase tracking-wider ${
                isBright ? 'text-slate-600 font-medium' : 'text-cyan-400/90 font-medium'
              }`}>
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{personalInfo.universityLocation}</span>
              </div>
            </div>

            {/* Right Column: Bio Narrative & Academic Hub */}
            <div className="lg:col-span-7 space-y-5 text-left">
              {/* Main Greeting / Name */}
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight ${
                isBright ? 'text-slate-900' : 'text-white'
              }`}>
                Hi, I&apos;m <span className="text-cyan-400">{personalInfo.firstName}</span>{' '}
                <span className="text-purple-400">{personalInfo.lastName}</span>
              </h1>

              {/* Typewriter Dynamic Subheadline */}
              <div className="h-8 sm:h-9 flex items-center">
                <p className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">
                  {currentText}
                  <span className="inline-block w-0.5 h-6 bg-cyan-400 ml-1 animate-pulse align-middle" />
                </p>
              </div>

              {/* Bio Narrative */}
              <p className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
                isBright ? 'text-slate-700' : 'text-slate-300'
              }`}>
                {personalInfo.bio}
              </p>

              {/* Academic Status Card */}
              <div className={`p-4 sm:p-5 rounded-2xl max-w-xl transition-all border ${
                isBright 
                  ? 'bg-white/95 border-slate-200/90 shadow-md shadow-slate-200/50' 
                  : 'bg-[#0b1322]/90 border-slate-800/80 shadow-xl'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold leading-tight ${
                      isBright ? 'text-slate-900' : 'text-white'
                    }`}>
                      Academic Status
                    </h4>
                    <p className={`text-xs ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>
                      {personalInfo.university}
                    </p>
                  </div>
                </div>

                <div className="border-l-2 border-cyan-500/60 pl-3.5 space-y-2">
                  <p className={`text-sm font-semibold ${
                    isBright ? 'text-slate-800' : 'text-slate-100'
                  }`}>
                    {personalInfo.degree}
                  </p>

                  <div className="flex items-center gap-2.5">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md border ${
                      isBright
                        ? 'bg-cyan-50 text-cyan-700 border-cyan-300'
                        : 'bg-cyan-950/50 text-cyan-400 border border-cyan-500/40'
                    }`}>
                      4th Year
                    </span>
                    <span className={`text-xs ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>
                      Graduation: {personalInfo.graduationYear}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white shadow-lg shadow-cyan-500/25 transition-all hover:-translate-y-0.5"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm border transition-all hover:-translate-y-0.5 shadow-md ${
                    isBright 
                      ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 hover:border-cyan-500/50 shadow-slate-200' 
                      : 'bg-[#0e172a] hover:bg-[#152342] text-slate-200 hover:text-white border-slate-700/80 hover:border-cyan-500/40 shadow-black/20'
                  }`}
                >
                  <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={personalInfo.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm border transition-all hover:-translate-y-0.5 shadow-md ${
                    isBright 
                      ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 hover:border-cyan-500/50 shadow-slate-200' 
                      : 'bg-[#0e172a] hover:bg-[#152342] text-slate-200 hover:text-white border-slate-700/80 hover:border-cyan-500/40 shadow-black/20'
                  }`}
                >
                  <TelegramIcon className="w-4 h-4 text-cyan-400" />
                  <span>Telegram</span>
                </a>


                <button
                  onClick={handleCopyEmail}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm border transition-all hover:-translate-y-0.5 shadow-md cursor-pointer ${
                    isBright 
                      ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 hover:border-cyan-500/50 shadow-slate-200' 
                      : 'bg-[#0e172a] hover:bg-[#152342] text-slate-200 hover:text-white border-slate-700/80 hover:border-cyan-500/40 shadow-black/20'
                  }`}
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-cyan-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Resume Row */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => setIsResumeOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(147,51,234,0.35)] hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Full Resume</span>
                </button>

                <span className={`text-xs ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>
                  {personalInfo.resumeLabel}
                </span>
              </div>

            </div>

          </div>

          {/* Bottom Row: 4 Metric Stats Cards */}
          <div className="mt-14 sm:mt-16 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Card 1: Academic Standing */}
            <div className={`p-5 rounded-2xl border transition-all ${
              isBright 
                ? 'bg-white/95 border-slate-200 shadow-md shadow-slate-200/50 hover:border-cyan-500/40' 
                : 'bg-[#0b1322]/85 border-slate-800/80 hover:border-slate-700/80 shadow-lg'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className={`text-2xl font-bold tracking-tight ${isBright ? 'text-slate-900' : 'text-white'}`}>
                  4th Year
                </span>
              </div>
              <h4 className={`text-sm font-semibold mt-2.5 ${isBright ? 'text-slate-900' : 'text-slate-100'}`}>
                Academic Standing
              </h4>
              <p className={`text-xs mt-0.5 ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>
                Debre Berhan University
              </p>
            </div>

            {/* Card 2: Portfolio Projects */}
            <div className={`p-5 rounded-2xl border transition-all ${
              isBright 
                ? 'bg-white/95 border-slate-200 shadow-md shadow-slate-200/50 hover:border-cyan-500/40' 
                : 'bg-[#0b1322]/85 border-slate-800/80 hover:border-slate-700/80 shadow-lg'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <GitFork className="w-5 h-5" />
                </div>
                <span className={`text-2xl font-bold tracking-tight ${isBright ? 'text-slate-900' : 'text-white'}`}>
                  10+
                </span>
              </div>
              <h4 className={`text-sm font-semibold mt-2.5 ${isBright ? 'text-slate-900' : 'text-slate-100'}`}>
                Portfolio Projects
              </h4>
              <p className={`text-xs mt-0.5 ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>
                Production, Mobile &amp; Open-Source
              </p>
            </div>

            {/* Card 3: Certifications */}
            <div className={`p-5 rounded-2xl border transition-all ${
              isBright 
                ? 'bg-white/95 border-slate-200 shadow-md shadow-slate-200/50 hover:border-cyan-500/40' 
                : 'bg-[#0b1322]/85 border-slate-800/80 hover:border-slate-700/80 shadow-lg'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-950/70 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Sun className="w-5 h-5 fill-amber-400/20" />
                </div>
                <span className={`text-2xl font-bold tracking-tight ${isBright ? 'text-slate-900' : 'text-white'}`}>
                  4
                </span>
              </div>
              <h4 className={`text-sm font-semibold mt-2.5 ${isBright ? 'text-slate-900' : 'text-slate-100'}`}>
                Certifications
              </h4>
              <p className={`text-xs mt-0.5 ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>
                Udacity Verified
              </p>
            </div>

            {/* Card 4: Core Technologies */}
            <div className={`p-5 rounded-2xl border transition-all ${
              isBright 
                ? 'bg-white/95 border-slate-200 shadow-md shadow-slate-200/50 hover:border-cyan-500/40' 
                : 'bg-[#0b1322]/85 border-slate-800/80 hover:border-slate-700/80 shadow-lg'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple-950/70 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Layers className="w-5 h-5" />
                </div>
                <span className={`text-2xl font-bold tracking-tight ${isBright ? 'text-slate-900' : 'text-white'}`}>
                  12+
                </span>
              </div>
              <h4 className={`text-sm font-semibold mt-2.5 ${isBright ? 'text-slate-900' : 'text-slate-100'}`}>
                Core Technologies
              </h4>
              <p className={`text-xs mt-0.5 ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>
                Next.js, React, Java &amp; Python
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#skills"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-400 hover:text-cyan-500 transition-colors flex flex-col items-center gap-1 group"
          aria-label="Scroll to skills section"
        >
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </section>

      {/* Full Resume Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
        isBright={isBright}
      />
    </>
  );
}