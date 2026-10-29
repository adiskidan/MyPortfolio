import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Maximize2,
  Play
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import { useTheme } from '../context/ThemeContext';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const themeContext = useTheme();
  const isBright = Boolean(themeContext?.isBright);

  const categories = ['All', ...new Set(projectsData.map((p) => p.category))];

  const filteredProjects = filter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium mb-3 border ${
          isBright 
            ? 'bg-cyan-50 border-cyan-200 text-cyan-700' 
            : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
        }`}>
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>03 // FEATURED WORK</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${
          isBright ? 'text-slate-900' : 'text-white'
        }`}>
          Featured Engineering Projects
        </h2>
        <p className={`text-sm sm:text-base max-w-2xl mt-3 ${
          isBright ? 'text-slate-600' : 'text-slate-400'
        }`}>
          Full-stack web applications, biometric systems, and interactive software developed with real-world engineering standards.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              filter === cat
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : isBright
                  ? 'bg-white text-slate-700 hover:text-slate-950 border border-slate-200 shadow-sm'
                  : 'glass-panel text-slate-300 hover:text-white hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => {
          const hasWorkingDemo = project.liveDemo && project.liveDemo !== '#';
          const isLocalhost = project.liveDemo && project.liveDemo.includes('localhost');

          return (
            <div
              key={project.id}
              className={`rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col justify-between border shadow-lg ${
                isBright 
                  ? 'bg-white/95 border-slate-200 shadow-slate-200/60 hover:shadow-2xl hover:border-cyan-400' 
                  : 'glass-panel border-white/5 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10'
              }`}
            >
              {/* Project Image Banner (Clickable to open details) */}
              <div 
                className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900 cursor-pointer"
                onClick={() => setSelectedProject(project)}
                title="Click to view details"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/40 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-black/60 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                {/* Quick View Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white border border-white/10 backdrop-blur-md opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="View details"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Project Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 
                    onClick={() => setSelectedProject(project)}
                    className={`text-xl font-bold transition-colors mb-2 cursor-pointer ${
                      isBright 
                        ? 'text-slate-900 group-hover:text-cyan-600' 
                        : 'text-white group-hover:text-cyan-300'
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-4 ${
                    isBright ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    {project.tagline}
                  </p>

                  {/* Highlights Bullet Points */}
                  <ul className="space-y-1.5 mb-5">
                    {(project.highlights || []).slice(0, 2).map((item, idx) => (
                      <li key={idx} className={`text-xs flex items-start gap-2 ${
                        isBright ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {(project.technologies || project.tags || []).map((tech) => (
                      <span
                        key={tech}
                        className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono border ${
                          isBright 
                            ? 'bg-slate-100 text-slate-700 border-slate-200' 
                            : 'bg-white/5 text-slate-300 border-white/10'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className={`flex items-center gap-3 pt-4 border-t ${
                  isBright ? 'border-slate-100' : 'border-white/5'
                }`}>
                  {/* Live Demo or Local App Button */}
                  {hasWorkingDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 transition-all hover:-translate-y-0.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isLocalhost ? 'Launch App' : 'Live Demo'}</span>
                    </a>
                  )}

                  {/* GitHub Repo Button or Closed Source Pill */}
                  {project.isClosedSource ? (
                    <span 
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono border ${
                        isBright 
                          ? 'bg-slate-100 text-slate-500 border-slate-200' 
                          : 'bg-white/5 text-slate-400 border-white/10'
                      }`}
                      title="Source code is private per project requirements"
                    >
                      <span>🔒 Private / Closed Source</span>
                    </span>
                  ) : (
                    project.github && project.github !== '#' && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors ${
                          isBright 
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300' 
                            : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10'
                        }`}
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )
                  )}

                  {/* More Details Modal trigger */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className={`ml-auto text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                      isBright 
                        ? 'text-cyan-700 hover:text-cyan-800' 
                        : 'text-slate-400 hover:text-cyan-400'
                    }`}
                  >
                    <span>Details</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
