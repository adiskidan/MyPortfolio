import React from 'react';
import { 
  GraduationCap, 
  Code, 
  MapPin, 
  Layers, 
  BookOpen 
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function About() {
  const themeContext = useTheme();
  const isBright = Boolean(themeContext?.isBright);

  const facts = [
    {
      icon: GraduationCap,
      title: 'Academic Foundation',
      subtitle: 'B.Sc. in Computer Science',
      desc: 'Debre Berhan University (DBU), focusing on rigorous CS core principles.',
      color: 'from-blue-500/20 to-cyan-500/20 text-cyan-500 border-cyan-500/30',
    },
    {
      icon: Code,
      title: 'Full-Stack Engineering',
      subtitle: 'React & Node.js Ecosystem',
      desc: 'Crafting responsive user interfaces backed by performant RESTful APIs.',
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-500 border-emerald-500/30',
    },
    {
      icon: Layers,
      title: 'Problem Solving',
      subtitle: 'Algorithms & System Design',
      desc: 'Deep interest in clean architecture, time/space complexity, and clean code.',
      color: 'from-purple-500/20 to-pink-500/20 text-purple-500 border-purple-500/30',
    },
    {
      icon: MapPin,
      title: 'Based in Ethiopia',
      subtitle: 'Global & Remote Mindset',
      desc: 'Ready to contribute to local teams and international remote engineering roles.',
      color: 'from-amber-500/20 to-orange-500/20 text-amber-500 border-amber-500/30',
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative max-w-5xl mx-auto">
      {/* Background soft glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] pointer-events-none ${
        isBright ? 'bg-cyan-500/10' : 'bg-cyan-500/5'
      }`} />

      {/* Section Title */}
      <div className="flex flex-col items-center text-center mb-14">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium mb-3 border ${
          isBright ? 'bg-cyan-50 border-cyan-200 text-cyan-700' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
        }`}>
          <BookOpen className="w-3.5 h-3.5" />
          <span>01 // ABOUT ME</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${
          isBright ? 'text-slate-900' : 'text-white'
        }`}>
          Engineering With Curiosity &amp; Purpose
        </h2>
        <p className={`text-sm sm:text-base max-w-2xl mt-3 ${
          isBright ? 'text-slate-600' : 'text-slate-400'
        }`}>
          A glimpse into my background, academic journey, and what drives me to write clean code every day.
        </p>
      </div>

      <div className="space-y-8">
        {/* Narrative Story */}
        <div className={`glass-panel p-6 sm:p-8 rounded-3xl border shadow-xl space-y-4 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto text-center sm:text-left transition-all ${
          isBright 
            ? 'bg-white/90 border-slate-200 text-slate-700 shadow-slate-200/50' 
            : 'border-white/5 text-slate-300 shadow-black/30'
        }`}>
          <p>
            Hi there! I&apos;m <span className={`font-semibold ${isBright ? 'text-slate-900' : 'text-white'}`}>{personalInfo.name}</span>, a passionate Computer Science student studying at{' '}
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{personalInfo.university}</span> in Ethiopia.
          </p>
          <p>
            My journey into technology began with a deep curiosity about how software powers modern life.
            Over the course of my university studies, I have progressed from writing algorithmic routines in C++ and Python
            to engineering full-stack production-ready web applications using <span className={`font-medium ${isBright ? 'text-slate-900' : 'text-white'}`}>React, Node.js, Express, and PostgreSQL/MongoDB</span>.
          </p>
          <p>
            I believe in building software that is not only functional, but also clean, maintainable, and user-centered.
            Whether I&apos;m collaborating on campus projects, practicing data structures for technical interviews, or learning the latest web standards,
            I am constantly pushing my limits to become an impactful software engineer.
          </p>
        </div>

        {/* Quick Fact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto pt-2">
          {facts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <div
                key={index}
                className={`glass-panel p-5 rounded-2xl border transition-all group shadow-md ${
                  isBright 
                    ? 'bg-white/90 border-slate-200 hover:border-cyan-400 shadow-slate-200/50' 
                    : 'border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center gap-3.5 mb-2.5">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${fact.color} border`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`text-[11px] font-mono uppercase tracking-wider ${
                      isBright ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      {fact.title}
                    </h4>
                    <h3 className={`text-sm font-semibold transition-colors ${
                      isBright 
                        ? 'text-slate-900 group-hover:text-cyan-600' 
                        : 'text-white group-hover:text-cyan-300'
                    }`}>
                      {fact.subtitle}
                    </h3>
                  </div>
                </div>
                <p className={`text-xs leading-relaxed ${
                  isBright ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  {fact.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
