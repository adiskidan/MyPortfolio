import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Code, 
  Award, 
  CheckCircle2,
  FileText,
  Layout,
  FileCode
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo, certificatesData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function ResumeModal({ isOpen, onClose }) {
  const [activeView, setActiveView] = useState('executive'); // 'executive' (image match) | 'full'
  const themeContext = useTheme();
  const isBright = Boolean(themeContext?.isBright);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div 
        className="fixed inset-0 -z-10" 
        onClick={onClose}
        aria-label="Close modal backdrop" 
      />

      <div className={`relative w-full max-w-5xl max-h-[94vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border transition-all ${
        isBright 
          ? 'bg-slate-100 border-slate-300 text-slate-900 shadow-slate-400/30' 
          : 'bg-[#0a0f1d] border-slate-700/80 text-slate-100 shadow-black/80'
      }`}>
        
        {/* Modal Top Control Bar */}
        <div className={`px-4 sm:px-6 py-3 border-b flex flex-wrap items-center justify-between gap-3 ${
          isBright ? 'bg-white border-slate-200' : 'bg-[#0f172a] border-slate-800'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold leading-tight">
                Curriculum Vitae &bull; {personalInfo.name}
              </h3>
              <p className={`text-xs ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>
                {personalInfo.university} &bull; Expected {personalInfo.graduationYear}
              </p>
            </div>
          </div>

          {/* View Mode Toggle: Executive Template (User Screenshot) vs Full Tech CV */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/50 border border-slate-700/70 text-xs">
            <button
              onClick={() => setActiveView('executive')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'executive'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Executive Card</span>
            </button>
            <button
              onClick={() => setActiveView('full')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'full'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Detailed CV</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct PDF Download button */}
            <a
              href="/resume.pdf"
              download="Adis_Kidan_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-sm transition-all"
              title="Download official PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                isBright 
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title="Print resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer ${
                isBright ? 'hover:bg-slate-200 hover:text-slate-800' : 'hover:bg-slate-800'
              }`}
              aria-label="Close resume viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Resume Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8">
          
          {/* ========================================================= */}
          {/* VIEW 1: EXECUTIVE TEMPLATE (MATCHES USER SCREENSHOT)       */}
          {/* ========================================================= */}
          {activeView === 'executive' && (
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200/90 text-slate-800">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Left Column (7 cols): Top beige banner + Bottom 2x2 grid */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  
                  {/* Top Beige Banner Container */}
                  <div className="bg-[#e6e8e2] rounded-[24px] p-6 sm:p-7">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2a3429] tracking-tight">
                      Adis kidan
                    </h1>
                    <p className="text-xs sm:text-sm font-bold tracking-widest text-[#526050] uppercase mt-1">
                      Desktop App and Web Developer
                    </p>
                    <div className="w-full h-[1.5px] bg-[#bcc6b8] my-4" />
                    <p className="text-xs sm:text-[13px] text-[#3d483b] leading-relaxed">
                      Detail-oriented Full-Stack Developer and Computer Science student specializing in functional web and desktop applications. Proficient in building high-performance interfaces with Next.js, React, and Tailwind CSS, while leveraging Python and PHP for robust back-end logic and automation. From AI-driven advisors to media tools, I am passionate about engineering efficient, scalable solutions and solving complex technical challenges with clean code.
                    </p>
                  </div>

                  {/* Bottom 2x2 Section Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
                    
                    {/* Block 1: SKILLS */}
                    <div>
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#2a3429] border-b-2 border-[#2a3429] pb-1 inline-block mb-3">
                        Skills
                      </h3>
                      <ul className="space-y-1.5 text-xs text-[#3d483b] list-disc list-inside">
                        <li>Programming Languages</li>
                        <li>Frameworks &amp; Libraries</li>
                        <li>Tools &amp; Platforms</li>
                      </ul>
                    </div>

                    {/* Block 2: EXPERIENCE */}
                    <div>
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#2a3429] border-b-2 border-[#2a3429] pb-1 inline-block mb-3">
                        Experience
                      </h3>
                      <ul className="space-y-1.5 text-xs text-[#3d483b] list-disc list-inside">
                        <li>Full-Stack Web &amp; Desktop app Developer</li>
                        <li>Junior Web Developer</li>
                        <li>Freelance Programmer</li>
                      </ul>
                    </div>

                    {/* Block 3: EDUCATION */}
                    <div>
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#2a3429] border-b-2 border-[#2a3429] pb-1 inline-block mb-3">
                        Education
                      </h3>
                      <div className="text-xs text-[#3d483b] space-y-1">
                        <p className="font-bold text-[#2a3429]">BSc in Computer Science</p>
                        <p>Debre Berhan University, Ethiopia</p>
                        <p className="text-[#526050]">2023 &ndash; Present (Expected Graduation: 2027)</p>
                      </div>
                    </div>

                    {/* Block 4: CONTACT */}
                    <div>
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#2a3429] border-b-2 border-[#2a3429] pb-1 inline-block mb-3">
                        Contact
                      </h3>
                      <div className="text-xs text-[#3d483b] space-y-1.5">
                        <p className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#526050] shrink-0" />
                          <span>+251 900 000 000</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#526050] shrink-0" />
                          <a href="mailto:adiskidan368@gmail.com" className="hover:underline font-semibold text-[#2a3429]">
                            adiskidan368@gmail.com
                          </a>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#526050] shrink-0" />
                          <a href="https://github.com/adiskidan" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#2a3429]">
                            github.com/adiskidan
                          </a>
                        </p>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Right Column (5 cols): Dark Olive Green Card with Avatar & About Me */}
                <div className="lg:col-span-5 bg-[#4c5547] rounded-[30px] p-7 text-white flex flex-col items-center justify-center text-center shadow-lg">
                  {/* Circular Avatar Photo with White Border */}
                  <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl mb-6 bg-slate-800 shrink-0">
                    <img
                      src={personalInfo.avatarUrl}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* ABOUT ME Title */}
                  <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-widest text-white mb-3">
                    About Me
                  </h2>

                  {/* About Me Narrative Paragraph */}
                  <p className="text-xs sm:text-[13px] text-slate-100/90 leading-relaxed text-justify sm:text-center px-1">
                    A curious and motivated Full-Stack Developer dedicated to solving real-world problems through clean, scalable code. I thrive in collaborative environments and prioritize clean architecture using modern tools like Next.js and Python. I stay at the forefront of tech trends, viewing every complex challenge as a vital opportunity for professional growth and innovation.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 2: COMPREHENSIVE PORTFOLIO CV (FULL TECH BREAKDOWN)   */}
          {/* ========================================================= */}
          {activeView === 'full' && (
            <div className={`max-w-3xl mx-auto rounded-2xl p-6 sm:p-8 border shadow-lg ${
              isBright 
                ? 'bg-white border-slate-200 shadow-slate-200/60' 
                : 'bg-[#0f172a]/95 border-slate-800 shadow-black/40'
            }`}>
              {/* Header */}
              <div className="border-b pb-5 mb-5 border-slate-200 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-cyan-500">
                      ADIS KIDAN
                    </h1>
                    <p className="text-sm font-semibold tracking-wide text-indigo-400 mt-0.5">
                      4th-Year Computer Science Senior &bull; Full-Stack Web &amp; AI Developer
                    </p>
                    <p className={`text-xs mt-1 flex items-center gap-1.5 ${isBright ? 'text-slate-600' : 'text-slate-400'}`}>
                      <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                      Debre Berhan University, Amhara, Ethiopia
                    </p>
                  </div>

                  <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5 text-xs">
                    <a 
                      href={`mailto:${personalInfo.email}`}
                      className="inline-flex items-center gap-1 text-cyan-500 hover:underline font-mono"
                    >
                      <Mail className="w-3 h-3" />
                      {personalInfo.email}
                    </a>
                    <a 
                      href={personalInfo.github}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-400 font-mono"
                    >
                      <GithubIcon className="w-3 h-3" />
                      github.com/adiskidan
                    </a>
                    <a 
                      href={personalInfo.linkedin}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-400 font-mono"
                    >
                      <LinkedinIcon className="w-3 h-3" />
                      linkedin.com/in/adiskidan
                    </a>
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="mb-6">
                <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-500 flex items-center gap-1.5 mb-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  Professional Summary
                </h2>
                <p className={`text-xs sm:text-sm leading-relaxed ${isBright ? 'text-slate-700' : 'text-slate-300'}`}>
                  Detail-oriented Full-Stack Developer and 4th-year Computer Science student at Debre Berhan University specializing in functional web and desktop applications. Proficient in building high-performance interfaces with Next.js, React, and Tailwind CSS, while leveraging Python and PHP for robust back-end logic and automation. Passionate about engineering efficient, scalable solutions and contributing to local and international tech ecosystems.
                </p>
              </div>

              {/* Education */}
              <div className="mb-6">
                <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-500 flex items-center gap-1.5 mb-2.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Education
                </h2>
                <div className={`p-3.5 rounded-lg border ${
                  isBright ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-bold text-sm">
                      Bachelor of Science in Computer Science
                    </h3>
                    <span className="text-xs font-mono text-cyan-400">
                      Expected Graduation: 2027
                    </span>
                  </div>
                  <p className={`text-xs mt-0.5 ${isBright ? 'text-slate-600' : 'text-slate-400'}`}>
                    Debre Berhan University (DBU) &mdash; Faculty of Computing, Ethiopia
                  </p>
                </div>
              </div>

              {/* Technical Competencies */}
              <div className="mb-6">
                <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-500 flex items-center gap-1.5 mb-2.5">
                  <Code className="w-3.5 h-3.5" />
                  Technical Competencies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className={`p-3 rounded-lg border ${
                    isBright ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
                  }`}>
                    <p className="font-bold text-cyan-400 mb-1">Languages</p>
                    <p className={isBright ? 'text-slate-700' : 'text-slate-300'}>
                      Python 3, JavaScript (ES6+), TypeScript, Java, C++, PHP, SQL, HTML5/CSS3
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg border ${
                    isBright ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
                  }`}>
                    <p className="font-bold text-indigo-400 mb-1">Web &amp; Frameworks</p>
                    <p className={isBright ? 'text-slate-700' : 'text-slate-300'}>
                      Next.js, React.js, Tailwind CSS, Node.js, Express.js, Flask, REST APIs
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg border ${
                    isBright ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
                  }`}>
                    <p className="font-bold text-emerald-400 mb-1">Databases</p>
                    <p className={isBright ? 'text-slate-700' : 'text-slate-300'}>
                      MySQL, PostgreSQL, MongoDB, SQLite
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg border ${
                    isBright ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
                  }`}>
                    <p className="font-bold text-purple-400 mb-1">Tools &amp; AI</p>
                    <p className={isBright ? 'text-slate-700' : 'text-slate-300'}>
                      OpenCV (Computer Vision), Git/GitHub, Postman, Linux/Bash, VS Code
                    </p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-4">
                <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-500 flex items-center gap-1.5 mb-2.5">
                  <Award className="w-3.5 h-3.5" />
                  Official Certifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {(certificatesData || []).map((c) => (
                    <div 
                      key={c.id} 
                      className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 ${
                        isBright ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-slate-200 dark:text-white">{c.title}</p>
                        <p className={`text-[11px] ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>{c.issuer}</p>
                      </div>
                      <a 
                        href={c.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 text-xs flex items-center gap-1 underline shrink-0"
                      >
                        Verify
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Sticky Bar */}
        <div className={`px-4 sm:px-6 py-3 border-t flex items-center justify-between gap-3 ${
          isBright ? 'bg-white border-slate-200' : 'bg-[#0f172a] border-slate-800'
        }`}>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Official Profile &bull; Contact: adiskidan368@gmail.com</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              download="Adis_Kidan_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                isBright 
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
