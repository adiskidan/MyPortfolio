import React from 'react';
import { 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  Calendar,
  Building
} from 'lucide-react';
import { certificatesData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function Certificates() {
  const themeContext = useTheme();
  const isBright = Boolean(themeContext?.isBright);

  return (
    <section id="certificates" className="py-24 px-4 sm:px-6 lg:px-8 relative max-w-7xl mx-auto">
      {/* Background glow */}
      <div className={`absolute top-1/2 left-1/3 w-80 h-80 rounded-full blur-[120px] pointer-events-none ${
        isBright ? 'bg-purple-500/10' : 'bg-purple-500/5'
      }`} />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-14">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium mb-3 border ${
          isBright 
            ? 'bg-purple-50 border-purple-200 text-purple-700' 
            : 'bg-purple-500/10 border-purple-500/20 text-purple-400'
        }`}>
          <Award className="w-3.5 h-3.5" />
          <span>03 // PROFESSIONAL CERTIFICATIONS</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${
          isBright ? 'text-slate-900' : 'text-white'
        }`}>
          Verified Credentials &amp; Certifications
        </h2>
        <p className={`text-sm sm:text-base max-w-2xl mt-3 ${
          isBright ? 'text-slate-600' : 'text-slate-400'
        }`}>
          Accredited certifications earned through the Ethio Coders Initiative in partnership with Udacity and the Ministry of Innovation &amp; Technology (MInT).
        </p>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificatesData.map((cert) => (
          <div
            key={cert.id}
            className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 group flex flex-col justify-between shadow-lg ${
              isBright 
                ? 'bg-white/95 border-slate-200 shadow-slate-200/60 hover:shadow-2xl hover:border-purple-300' 
                : 'glass-panel border-white/5 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10'
            }`}
          >
            <div>
              {/* Header: Badge & Verified Pill */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className={`text-[11px] font-mono px-3 py-1 rounded-full border ${
                  isBright 
                    ? 'bg-purple-50 text-purple-700 border-purple-200 font-semibold' 
                    : `bg-gradient-to-r ${cert.badgeColor}`
                }`}>
                  {cert.category}
                </span>
                <span className={`flex items-center gap-1.5 text-xs font-mono px-2.5 py-0.5 rounded-full border ${
                  isBright 
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
                    : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Verified</span>
                </span>
              </div>

              {/* Title */}
              <h3 className={`text-xl font-bold transition-colors mb-2 ${
                isBright 
                  ? 'text-slate-900 group-hover:text-purple-700' 
                  : 'text-white group-hover:text-cyan-300'
              }`}>
                {cert.title}
              </h3>

              {/* Issuer Details */}
              <div className={`space-y-1.5 mb-4 text-xs ${
                isBright ? 'text-slate-600' : 'text-slate-300'
              }`}>
                <p className="flex items-center gap-2 font-medium">
                  <Building className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span>{cert.issuer}</span>
                </p>
                <p className={`pl-5.5 ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>
                  {cert.organization}
                </p>
                <p className={`flex items-center gap-2 pl-5.5 ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>
                  <Calendar className="w-3 h-3 text-cyan-500" />
                  <span>Issued: {cert.issueDate}</span>
                </p>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {(cert.skills || []).map((skill) => (
                  <span
                    key={skill}
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono border ${
                      isBright 
                        ? 'bg-slate-100 text-slate-700 border-slate-200' 
                        : 'bg-white/5 text-slate-300 border-white/10'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className={`flex items-center justify-between pt-4 border-t ${
              isBright ? 'border-slate-100' : 'border-white/5'
            }`}>
              <span className={`text-xs font-mono flex items-center gap-1.5 ${
                isBright ? 'text-slate-500' : 'text-slate-400'
              }`}>
                <FileText className="w-3.5 h-3.5 text-purple-500" />
                <span>Official PDF Credential</span>
              </span>

              <a
                href={cert.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-600/20 transition-all hover:-translate-y-0.5"
              >
                <span>View Certificate</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
