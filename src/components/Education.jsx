import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { educationData, timelineData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function Education() {
  const edu = educationData[0];
  const themeContext = useTheme();
  const isBright = Boolean(themeContext?.isBright);

  return (
    <section id="journey" className="py-24 px-4 sm:px-6 lg:px-8 relative max-w-7xl mx-auto scroll-mt-16">
      {/* Fallback anchor for #education */}
      <span id="education" className="sr-only">Education</span>

      {/* Background glow */}
      <div className={`absolute top-1/2 left-1/4 w-80 h-80 rounded-full blur-[130px] pointer-events-none ${
        isBright ? 'bg-cyan-500/10' : 'bg-cyan-500/5'
      }`} />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium mb-3 border ${
          isBright 
            ? 'bg-cyan-50 border-cyan-200 text-cyan-700' 
            : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
        }`}>
          <GraduationCap className="w-3.5 h-3.5" />
          <span>04 // EDUCATION &amp; JOURNEY</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${
          isBright ? 'text-slate-900' : 'text-white'
        }`}>
          Academic Foundations &amp; Growth
        </h2>
        <p className={`text-sm sm:text-base max-w-2xl mt-3 ${
          isBright ? 'text-slate-600' : 'text-slate-400'
        }`}>
          My formal education at Debre Berhan University, core theoretical coursework, and practical milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: University Spotlight Card */}
        <div className={`lg:col-span-7 rounded-2xl p-6 sm:p-8 border shadow-xl space-y-6 transition-all ${
          isBright 
            ? 'bg-white/95 border-slate-200 shadow-slate-200/60' 
            : 'glass-panel border-white/10 shadow-black/40'
        }`}>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-500 shadow-inner">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h3 className={`text-xl sm:text-2xl font-bold ${
                  isBright ? 'text-slate-900' : 'text-white'
                }`}>
                  {edu.institution}
                </h3>
                <p className="text-cyan-600 dark:text-cyan-400 font-medium text-sm sm:text-base">
                  {edu.degree}
                </p>
              </div>
            </div>

            <div className={`flex flex-col items-start sm:items-end text-xs font-mono gap-1 ${
              isBright ? 'text-slate-600' : 'text-slate-400'
            }`}>
              <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${
                isBright ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-800/80 border-slate-700 text-slate-300'
              }`}>
                <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                {edu.period}
              </span>
              <span className={`flex items-center gap-1 ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>
                <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                {edu.location}
              </span>
            </div>
          </div>

          <p className={`text-sm sm:text-base leading-relaxed ${
            isBright ? 'text-slate-700' : 'text-slate-300'
          }`}>
            {edu.description}
          </p>

          {/* Key Coursework */}
          <div className="space-y-3 pt-2">
            <h4 className={`text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 ${
              isBright ? 'text-slate-600' : 'text-slate-400'
            }`}>
              <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
              <span>Key CS Coursework &amp; Topics</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(edu?.coursework || []).map((course, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 text-xs p-2.5 rounded-lg border ${
                    isBright 
                      ? 'text-slate-700 bg-slate-50 border-slate-200' 
                      : 'text-slate-300 bg-slate-900/60 border-slate-800/80'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Extracurriculars & Achievements */}
          <div className={`space-y-3 pt-2 border-t ${
            isBright ? 'border-slate-100' : 'border-white/5'
          }`}>
            <h4 className={`text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 ${
              isBright ? 'text-slate-600' : 'text-slate-400'
            }`}>
              <Award className="w-3.5 h-3.5 text-emerald-500" />
              <span>Activities &amp; Highlights</span>
            </h4>
            <ul className="space-y-2">
              {(edu?.achievements || []).map((ach, idx) => (
                <li key={idx} className={`flex items-start gap-2 text-xs sm:text-sm ${
                  isBright ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Growth Timeline */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className={`text-lg font-bold flex items-center gap-2 mb-6 ${
            isBright ? 'text-slate-900' : 'text-white'
          }`}>
            <Clock className="w-5 h-5 text-cyan-500" />
            <span>Learning Milestones</span>
          </h3>

          <div className={`relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] ${
            isBright 
              ? 'before:bg-gradient-to-b before:from-cyan-500 before:via-blue-500 before:to-slate-300' 
              : 'before:bg-gradient-to-b before:from-cyan-400 before:via-blue-500 before:to-slate-800'
          }`}>
            {timelineData.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node dot */}
                <div className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-cyan-500 group-hover:bg-cyan-500 transition-colors shadow-md ${
                  isBright ? 'bg-white' : 'bg-[#080c14]'
                }`} />

                <div className={`p-4 rounded-xl border transition-all ${
                  isBright 
                    ? 'bg-white/95 border-slate-200 group-hover:border-cyan-400 shadow-sm' 
                    : 'glass-panel border-white/5 group-hover:border-cyan-500/20'
                }`}>
                  <span className={`inline-block text-[11px] font-mono font-semibold px-2 py-0.5 rounded border mb-1.5 ${
                    isBright 
                      ? 'text-cyan-700 bg-cyan-50 border-cyan-200' 
                      : 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
                  }`}>
                    {item.year}
                  </span>
                  <h4 className={`text-sm font-bold transition-colors ${
                    isBright 
                      ? 'text-slate-900 group-hover:text-cyan-600' 
                      : 'text-white group-hover:text-cyan-300'
                  }`}>
                    {item.title}
                  </h4>
                  <p className="text-xs text-indigo-500 font-medium mb-1">
                    {item.role}
                  </p>
                  <p className={`text-xs leading-relaxed ${
                    isBright ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
