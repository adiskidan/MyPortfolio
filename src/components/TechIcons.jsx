import React from 'react';

export function TechIcon({ name, className = "w-5 h-5" }) {
  switch (name.toLowerCase()) {
    case 'python':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M11.9 2c-3.1 0-5.2.3-5.2 2.3v2.4h5.3v.8H4.6C2.5 7.5 2 9.4 2 12.3c0 3.2.7 4.7 2.6 4.7h1.6v-2.3c0-1.7 1.4-3.1 3.2-3.1h5.3c1.5 0 2.7-1.2 2.7-2.7V4.3C17.4 2.3 15.3 2 11.9 2zm-1.5 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z" fill="#387eb8"/>
          <path d="M12.1 22c3.1 0 5.2-.3 5.2-2.3v-2.4h-5.3v-.8h7.4c2.1 0 2.6-1.9 2.6-4.8 0-3.2-.7-4.7-2.6-4.7h-1.6v2.3c0 1.7-1.4 3.1-3.2 3.1H9.3c-1.5 0-2.7 1.2-2.7 2.7v4.6c0 2 2.1 2.3 5.5 2.3zm1.5-1.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" fill="#ffe052"/>
        </svg>
      );
    case 'java':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M8.5 17.5c1.5.3 3.5.4 5.2.1 1.2-.2 2.3-.6 2.3-.6s-.6.5-1.8.8c-2 .5-4.4.5-5.7-.3M7.8 19.8c2 .3 4.6.4 6.9-.1 1.6-.3 3.1-.9 3.1-.9s-.8.7-2.4 1.1c-2.7.7-5.9.6-7.6-.1M13.2 13.7c.8 1-1 2-2.3 2.8 1.8-.4 3.2-1.4 2.3-2.8M10 6.5s-2 2.5 1 4.5c2 1.3 2.8 2.6 2 4.2 1.6-1.5 2.3-3.6.5-5-2-1.7-1.5-2.7-3.5-3.7z" stroke="#ea2d2e" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M14.5 9s1 1-1 3c2-.5 2.5-2 1-3z" fill="#5382a1"/>
        </svg>
      );
    case 'javascript':
    case 'js':
      return (
        <div className={`${className} bg-[#f7df1e] text-black font-bold flex items-center justify-center rounded text-[10px] leading-none font-mono`}>
          JS
        </div>
      );
    case 'c++':
    case 'cpp':
      return (
        <div className={`${className} bg-[#00599c] text-white font-bold flex items-center justify-center rounded text-[9px] font-mono`}>
          C++
        </div>
      );
    case 'php':
      return (
        <div className={`${className} bg-[#777bb4] text-white font-bold flex items-center justify-center rounded text-[9px] font-mono tracking-tighter`}>
          php
        </div>
      );
    case 'html/css':
    case 'html':
      return (
        <div className={`${className} bg-gradient-to-r from-[#e34f26] to-[#1572b6] text-white font-bold flex items-center justify-center rounded text-[8px] font-mono`}>
          &lt;/&gt;
        </div>
      );
    case 'react':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00d8ff" strokeWidth="1.5" transform="rotate(30 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00d8ff" strokeWidth="1.5" transform="rotate(90 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00d8ff" strokeWidth="1.5" transform="rotate(150 12 12)"/>
          <circle cx="12" cy="12" r="1.8" fill="#00d8ff"/>
        </svg>
      );
    case 'next.js':
    case 'nextjs':
      return (
        <div className={`${className} bg-black border border-white/30 text-white font-bold flex items-center justify-center rounded-full text-[10px] font-mono`}>
          N
        </div>
      );
    case 'node.js':
    case 'nodejs':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#68a063">
          <path d="M12 2l9 5.2v10.4L12 23l-9-5.2V7.2L12 2zm0 2.3L4.8 8.5v7.5L12 20.2l7.2-4.2V8.5L12 4.3z"/>
          <path d="M12 7l5 3v5l-5 3-5-3v-5l5-3z"/>
        </svg>
      );
    case 'git':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#f05032">
          <path d="M21.7 10.7l-8.4-8.4c-.9-.9-2.5-.9-3.4 0L7.5 4.7 9.8 7c.8-.3 1.7-.1 2.3.5.6.6.8 1.5.5 2.3l2.2 2.2c.8-.3 1.7-.1 2.3.5.9.9.9 2.5 0 3.4-.9.9-2.5.9-3.4 0-.7-.7-.9-1.8-.4-2.6l-2.1-2.1v5.1c.3.2.5.5.6.8.5 1 .1 2.3-.9 2.8-1 .5-2.3.1-2.8-.9-.5-1-.1-2.3.9-2.8.4-.2.8-.3 1.2-.2V8.3c-.4.1-.8 0-1.2-.2L6.6 6 2.3 10.3c-.9.9-.9 2.5 0 3.4l8.4 8.4c.9.9 2.5.9 3.4 0l7.6-7.6c.9-.9.9-2.5 0-3.8z"/>
        </svg>
      );
    case 'laravel':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#ff2d20">
          <path d="M22 6.5l-9.5-5.5L3 6.5v11L12.5 23l9.5-5.5v-11zm-9.5-3.8l7.5 4.3-3.5 2-7.5-4.3 3.5-2zm-8 4.7l7 4v8l-7-4v-8zm8.5 12V11.5l3.5-2v7.9l-3.5 2zm8-4.6l-3.5 2v-7.9l3.5-2v7.9z"/>
        </svg>
      );
    case 'tailwind css':
    case 'tailwind':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#38bdf8">
          <path d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5 1 .3 1.6 1 2.3 1.7 1.2 1.2 2.6 2.5 5.2 2.5 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-1-.3-1.6-1-2.3-1.7-1.2-1.2-2.6-2.5-5.2-2.5zM5 12c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5 1 .3 1.6 1 2.3 1.7 1.2 1.2 2.6 2.5 5.2 2.5 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-1-.3-1.6-1-2.3-1.7-1.2-1.2-2.6-2.5-5.2-2.5z"/>
        </svg>
      );
    case 'mysql':
      return (
        <div className={`${className} bg-[#00758f] text-white font-bold flex items-center justify-center rounded text-[8px] font-mono tracking-tighter`}>
          SQL
        </div>
      );
    case 'mongodb':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#47a248">
          <path d="M12 2C11.5 4.5 8 9.5 8 13.5c0 3 1.8 5.5 4 6.5v2c.5 0 .5 0 0-2 2.2-1 4-3.5 4-6.5C16 9.5 12.5 4.5 12 2z"/>
          <path d="M12 20v-7.5c-1.5 0-3 1.5-3 3.5 0 1.8 1.5 3.5 3 4z" fill="#499d4a"/>
        </svg>
      );
    case 'postgresql':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#336791">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.3 9.3.2-.2.3-.5.3-.8v-2.3c-.6.1-1.2.2-1.8.2-2.3 0-3.6-1.4-3.9-3.5h1.7c.3 1.2 1 1.8 2.2 1.8.6 0 1.1-.1 1.6-.3v-4.1c-.8-.5-1.4-1.4-1.4-2.5 0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.1-.6 2-1.4 2.5v7.2c3.5-1.4 6-4.8 6-8.8 0-5.5-4.5-10-10-10z"/>
        </svg>
      );
    case 'sqlite':
      return (
        <div className={`${className} bg-[#003b57] text-[#00a8e8] font-bold flex items-center justify-center rounded text-[8px] font-mono tracking-tighter`}>
          Lite
        </div>
      );
    default:
      return (
        <div className={`${className} bg-slate-800 text-cyan-400 font-bold flex items-center justify-center rounded text-[10px]`}>
          &bull;
        </div>
      );
  }
}
