import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Terminal } from 'lucide-react';
import { GithubIcon } from './Icons';
import { useTheme } from '../context/ThemeContext';

export default function ProjectModal({ project, onClose }) {
  const themeContext = useTheme();
  const isBright = Boolean(themeContext?.isBright);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const isLocalBackend = project.liveDemo && project.liveDemo.includes('localhost');

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-2xl border rounded-2xl shadow-2xl overflow-hidden my-8 transition-all ${
          isBright 
            ? 'bg-white border-slate-300 text-slate-900 shadow-slate-300/60' 
            : 'bg-[#0d1322] border-slate-700/80 text-slate-100 shadow-black/60'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image banner */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${
            isBright ? 'from-white via-white/40 to-transparent' : 'from-[#0d1322] via-[#0d1322]/40 to-transparent'
          }`} />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition-colors focus:outline-none cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Project Title overlay */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 mb-1.5 backdrop-blur-md">
              {project.category}
            </span>
            <h3 className={`text-2xl sm:text-3xl font-bold ${
              isBright ? 'text-slate-900' : 'text-white'
            }`}>
              {project.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Tagline */}
          <p className={`font-medium text-sm sm:text-base leading-relaxed ${
            isBright ? 'text-slate-700' : 'text-slate-300'
          }`}>
            {project.tagline}
          </p>

          {/* Detailed Description */}
          <div className="space-y-2">
            <h4 className={`text-xs font-mono uppercase tracking-wider ${
              isBright ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Project Overview
            </h4>
            <p className={`text-sm leading-relaxed ${
              isBright ? 'text-slate-600' : 'text-slate-300'
            }`}>
              {project.description}
            </p>
          </div>

          {/* Localhost Live Service Note */}
          {isLocalBackend && (
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              isBright ? 'bg-cyan-50 border-cyan-200 text-cyan-900' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
            }`}>
              <Terminal className="w-5 h-5 shrink-0 mt-0.5 text-cyan-600 dark:text-cyan-400" />
              <div className="text-xs space-y-1">
                <p className="font-bold">Active Local Service Running</p>
                <p className={isBright ? 'text-cyan-800' : 'text-slate-300'}>
                  This application backend is hosted on your workstation at{' '}
                  <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-black/30 font-mono font-semibold">
                    {project.liveDemo}
                  </code>. You can launch it directly in your browser.
                </p>
              </div>
            </div>
          )}

          {/* Key Engineering Highlights */}
          <div className="space-y-3">
            <h4 className={`text-xs font-mono uppercase tracking-wider ${
              isBright ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Key Highlights &amp; Architecture
            </h4>
            <div className="space-y-2">
              {(project.highlights || []).map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span className={isBright ? 'text-slate-700' : 'text-slate-300'}>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div className="space-y-2">
            <h4 className={`text-xs font-mono uppercase tracking-wider ${
              isBright ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Technologies &amp; Libraries
            </h4>
            <div className="flex flex-wrap gap-2">
              {(project.technologies || project.tags || []).map((tech) => (
                <span
                  key={tech}
                  className={`px-3 py-1 rounded-lg text-xs font-mono border ${
                    isBright 
                      ? 'bg-slate-100 text-slate-800 border-slate-300' 
                      : 'bg-slate-800/80 text-cyan-300 border-slate-700'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className={`p-4 sm:px-6 sm:py-4 border-t flex flex-wrap items-center justify-between gap-3 ${
          isBright ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
        }`}>
          <div className="flex items-center gap-3">
            {project.liveDemo && project.liveDemo !== '#' && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-all"
              >
                <span>{isLocalBackend ? 'Open Application' : 'Open Live Demo'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {!project.isClosedSource && project.github && project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-colors ${
                  isBright 
                    ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
              isBright ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
