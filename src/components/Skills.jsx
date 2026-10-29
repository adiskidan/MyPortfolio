import React, { useState } from 'react';
import { 
  Code2, 
  Wrench, 
  Database, 
  Sparkles, 
  Layers 
} from 'lucide-react';
import { TechIcon } from './TechIcons';
import { useTheme } from '../context/ThemeContext';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('All');
  const themeContext = useTheme();
  const isBright = Boolean(themeContext?.isBright);

  const tabs = [
    { id: 'All', label: 'All Disciplines', icon: Layers },
    { id: 'Languages', label: 'Languages', icon: Code2 },
    { id: 'Frameworks', label: 'Frameworks & Tools', icon: Wrench },
    { id: 'Databases', label: 'Databases', icon: Database },
  ];

  const skillGroups = [
    {
      id: 'Languages',
      title: 'Programming Languages',
      countText: '6 technologies',
      icon: Code2,
      headerIconColor: isBright 
        ? 'text-cyan-600 bg-cyan-50 border-cyan-200' 
        : 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      barGradient: 'from-cyan-400 to-blue-500',
      barGlow: 'shadow-[0_0_8px_rgba(56,189,248,0.35)]',
      skills: [
        { name: 'Python', percentage: 90, icon: 'python' },
        { name: 'Java', percentage: 85, icon: 'java' },
        { name: 'JavaScript', percentage: 88, icon: 'javascript' },
        { name: 'C++', percentage: 80, icon: 'c++' },
        { name: 'PHP', percentage: 75, icon: 'php' },
        { name: 'HTML/CSS', percentage: 92, icon: 'html/css' },
      ],
    },
    {
      id: 'Frameworks',
      title: 'Frameworks & Tools',
      countText: '6 technologies',
      icon: Wrench,
      headerIconColor: isBright 
        ? 'text-blue-600 bg-blue-50 border-blue-200' 
        : 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      barGradient: 'from-blue-500 to-indigo-500',
      barGlow: 'shadow-[0_0_8px_rgba(99,102,241,0.35)]',
      skills: [
        { name: 'React', percentage: 88, icon: 'react' },
        { name: 'Next.js', percentage: 85, icon: 'next.js', isNew: true },
        { name: 'Node.js', percentage: 82, icon: 'node.js' },
        { name: 'Git', percentage: 85, icon: 'git' },
        { name: 'Laravel', percentage: 78, icon: 'laravel' },
        { name: 'Tailwind CSS', percentage: 90, icon: 'tailwind css' },
      ],
    },
    {
      id: 'Databases',
      title: 'Databases & Storage',
      countText: '4 technologies',
      icon: Database,
      headerIconColor: isBright 
        ? 'text-indigo-600 bg-indigo-50 border-indigo-200' 
        : 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      barGradient: 'from-indigo-500 to-purple-500',
      barGlow: 'shadow-[0_0_8px_rgba(168,85,247,0.35)]',
      skills: [
        { name: 'PostgreSQL', percentage: 80, icon: 'postgresql' },
        { name: 'MySQL', percentage: 85, icon: 'mysql' },
        { name: 'MongoDB', percentage: 78, icon: 'mongodb' },
        { name: 'SQLite', percentage: 82, icon: 'sqlite' },
      ],
    },
  ];

  const filteredGroups = activeTab === 'All'
    ? skillGroups
    : skillGroups.filter((g) => g.id === activeTab);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative max-w-7xl mx-auto">
      {/* Background glow orbs */}
      <div className={`absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-[120px] pointer-events-none ${
        isBright ? 'bg-cyan-500/10' : 'bg-cyan-500/5'
      }`} />
      <div className={`absolute top-1/2 right-1/4 w-80 h-80 rounded-full blur-[130px] pointer-events-none ${
        isBright ? 'bg-purple-500/10' : 'bg-purple-500/5'
      }`} />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium mb-3 shadow-inner border ${
          isBright 
            ? 'bg-cyan-50 border-cyan-200 text-cyan-700' 
            : 'bg-cyan-950/50 border-cyan-500/30 text-cyan-400'
        }`}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>CORE COMPETENCIES</span>
        </div>

        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 ${
          isBright ? 'text-slate-900' : 'text-white'
        }`}>
          Technical <span className="gradient-text">Skills</span>
        </h2>

        <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
          isBright ? 'text-slate-600' : 'text-slate-400'
        }`}>
          A comprehensive overview of my technical stack, featuring Next.js, modern web frameworks, Python, and databases
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 scale-105'
                  : isBright
                    ? 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 shadow-sm'
                    : 'bg-[#0d1424]/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <TabIcon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3-Column Skills Grid */}
      <div className={`grid gap-6 ${
        activeTab === 'All' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1 max-w-xl mx-auto'
      }`}>
        {filteredGroups.map((group) => {
          const GroupIcon = group.icon;

          return (
            <div
              key={group.id}
              className={`backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-xl transition-all flex flex-col justify-between border ${
                isBright 
                  ? 'bg-white/95 border-slate-200/90 shadow-slate-200/60 hover:border-slate-300 hover:shadow-2xl' 
                  : 'bg-[#0c1220]/95 border-slate-800/90 shadow-black/40 hover:border-slate-700/80 hover:shadow-cyan-500/5'
              }`}
            >
              <div>
                {/* Card Header */}
                <div className={`flex items-center gap-3.5 mb-6 pb-4 border-b ${
                  isBright ? 'border-slate-100' : 'border-white/5'
                }`}>
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-inner ${group.headerIconColor}`}>
                    <GroupIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isBright ? 'text-slate-900' : 'text-white'}`}>
                      {group.title}
                    </h3>
                    <p className={`text-xs font-mono ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>
                      {group.countText}
                    </p>
                  </div>
                </div>

                {/* Skill Items List */}
                <div className="space-y-4">
                  {(group.skills || []).map((skill) => (
                    <div key={skill.name} className="space-y-1.5 group">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-2.5">
                          {/* Brand/Tech Icon */}
                          <TechIcon 
                            name={skill.icon} 
                            className="w-5 h-5 flex items-center justify-center" 
                          />
                          <span className={`font-semibold transition-colors ${
                            isBright 
                              ? 'text-slate-800 group-hover:text-cyan-600' 
                              : 'text-slate-200 group-hover:text-white'
                          }`}>
                            {skill.name}
                          </span>
                          {skill.isNew && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-500 border border-cyan-500/30 uppercase tracking-wider">
                              New
                            </span>
                          )}
                        </div>
                        <span className={`font-mono text-xs font-bold ${
                          isBright ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          {skill.percentage}%
                        </span>
                      </div>

                      {/* Progress Bar Track */}
                      <div className={`h-2 w-full rounded-full overflow-hidden p-0.5 ${
                        isBright 
                          ? 'bg-slate-100 border border-slate-200/80' 
                          : 'bg-slate-900/90 border border-slate-800/80'
                      }`}>
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${group.barGradient} ${group.barGlow} transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer Accent */}
              <div className={`mt-6 pt-4 border-t flex items-center justify-between text-[11px] font-mono ${
                isBright ? 'border-slate-100 text-slate-500' : 'border-white/5 text-slate-500'
              }`}>
                <span>Proficiency Level</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Production Ready</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
