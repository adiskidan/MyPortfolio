import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  CornerDownLeft, 
  Trash2, 
  X 
} from 'lucide-react';
import { personalInfo, skillsData, projectsData, educationData, certificatesData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const themeContext = useTheme();
  const isBright = Boolean(themeContext?.isBright);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: `Welcome to Adis Kidan's Dev Terminal v1.0.0 (Debre Berhan University)\nType 'help' for available commands, or click the quick pills below.`
    }
  ]);

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [isOpen, history]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
      // Optional shortcut: Ctrl + ` or ~
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    let response = '';

    switch (trimmed) {
      case 'help':
        response = `Available commands:
  • about         - Display biography & university profile
  • skills        - List core technical stack & competencies
  • projects      - View featured engineering projects
  • certificates  - View accredited certifications (Ethio-Coder/Udacity)
  • education     - Show university & academic coursework
  • inbox         - View messages received from contact form
  • contact       - Display direct contact details & socials
  • clear         - Clear the terminal screen
  • whoami        - Print current user session
  • exit          - Close the terminal
  • sudo          - Run with elevated privileges`;
        break;

      case 'inbox':
      case 'messages':
        try {
          const stored = JSON.parse(localStorage.getItem('adis_portfolio_messages') || '[]');
          if (stored.length === 0) {
            response = '📬 INBOX: No messages received yet. Submit the contact form to see messages here!';
          } else {
            response = `📬 INBOX (${stored.length} message${stored.length > 1 ? 's' : ''} received):\n\n` +
              stored.map((m, i) => `[#${i + 1}] ${m.receivedAt || 'Recent'}\nFrom:    ${m.name} <${m.email}>\nSubject: ${m.subject || 'No subject'}\nMessage: ${m.message}`).join('\n\n' + '-'.repeat(40) + '\n\n');
          }
        } catch {
          response = 'Unable to read inbox messages.';
        }
        break;

      case 'about':
        response = `${personalInfo.name} - ${personalInfo.title}
University: ${personalInfo.university}
Degree: ${personalInfo.degree}
Location: ${personalInfo.location}

Bio: ${personalInfo.bio}`;
        break;

      case 'skills':
        response = skillsData
          .map((cat) => `[${cat.category}]\n  ` + cat.skills.map((s) => s.name).join(', '))
          .join('\n\n');
        break;

      case 'projects':
        response = (projectsData || [])
          .map((p) => `* ${p.title} (${p.category})\n  Tech: ${(p.tags || p.technologies || []).join(', ')}\n  ${p.github ? `GitHub: ${p.github}` : '[Commercial / Closed Source]'}`)
          .join('\n\n');
        break;

      case 'certificates':
        response = certificatesData
          .map((c) => `[✓] ${c.title}\n    Issuer: ${c.issuer}\n    PDF: ${c.pdfUrl}`)
          .join('\n\n');
        break;

      case 'education':
        response = `${educationData[0].institution}
${educationData[0].degree} (${educationData[0].period})
Location: ${educationData[0].location}
Key Modules: ${educationData[0].coursework.slice(0, 4).join(', ')}`;
        break;

      case 'contact':
        response = `Email:    ${personalInfo.email}
GitHub:   ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}
Telegram: ${personalInfo.telegram}
TikTok:   ${personalInfo.tiktok || 'https://www.tiktok.com/@adiskidan'}`;
        break;

      case 'whoami':
        response = `guest@visitor-host: (Welcome! You are exploring Adis Kidan's interactive terminal)`;
        break;

      case 'exit':
        setIsOpen(false);
        return;

      case 'sudo':
      case 'sudo rm -rf /':
        response = `[ACCESS GRANTED] You already have full access! Feel free to explore every project and get in touch.`;
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        response = `Command not recognized: '${trimmed}'. Type 'help' to see list of valid commands.`;
        break;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'user', text: cmd },
      { type: 'output', text: response }
    ]);
    setInputVal('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  const quickCommands = ['help', 'inbox', 'about', 'skills', 'projects', 'certificates', 'education', 'contact', 'clear'];

  return (
    <>
      {/* 🚀 Floating Bottom-Left Button matching user's screenshot */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-medium shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 group cursor-pointer ${
          isBright
            ? 'bg-white/95 hover:bg-slate-50 border-slate-300 hover:border-cyan-500 text-slate-800 shadow-slate-300/60'
            : 'bg-[#0b1222]/90 hover:bg-[#0f182d] border-cyan-500/30 hover:border-cyan-400 text-slate-200 hover:text-white shadow-black/50'
        }`}
        aria-label="Open Dev Terminal"
        title="Open interactive terminal"
      >
        <span className="text-cyan-400 font-bold group-hover:text-cyan-300 transition-colors">&gt;_</span>
        <span>Dev Terminal</span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 animate-pulse ml-0.5" />
      </button>

      {/* 💻 Terminal Popup Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative w-full max-w-3xl bg-[#0a0f1d] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Title Bar */}
            <div className="bg-[#0f172a] px-4 py-3 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 inline-block transition-colors cursor-pointer" 
                  title="Close terminal (Esc)" 
                />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-mono text-xs text-slate-400 flex items-center gap-1.5">
                  <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>adis@dbu-cs:~ (bash)</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setHistory([])}
                  className="text-xs font-mono text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Clear terminal"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Command Pills */}
            <div className="bg-[#0b1224] px-4 py-2 border-b border-white/5 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-slate-500 text-[11px]">Quick:</span>
              {quickCommands.map((qCmd) => (
                <button
                  key={qCmd}
                  onClick={() => executeCommand(qCmd)}
                  className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 border border-slate-700/60 transition-colors cursor-pointer text-xs"
                >
                  {qCmd}
                </button>
              ))}
            </div>

            {/* Terminal Screen Body */}
            <div className="p-5 font-mono text-xs sm:text-sm text-slate-300 min-h-[300px] max-h-[440px] overflow-y-auto space-y-3.5 bg-[#070b16]">
              {history.map((entry, index) => (
                <div key={index} className="leading-relaxed">
                  {entry.type === 'system' && (
                    <div className="text-cyan-400/90 whitespace-pre-wrap pb-1">
                      {entry.text}
                    </div>
                  )}
                  {entry.type === 'user' && (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span className="text-slate-500">adis@dbu:~$</span>
                      <span className="text-white font-semibold">{entry.text}</span>
                    </div>
                  )}
                  {entry.type === 'output' && (
                    <div className="text-slate-300 whitespace-pre-wrap pl-4 border-l-2 border-cyan-500/30 my-1">
                      {entry.text}
                    </div>
                  )}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Interactive Input Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-[#0c1326] px-4 py-3 border-t border-white/5 flex items-center gap-2"
            >
              <span className="text-emerald-400 font-mono text-xs sm:text-sm font-bold">
                adis@dbu:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type 'help' or click quick pills above..."
                className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder-slate-600"
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="submit"
                className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-colors cursor-pointer"
                aria-label="Submit command"
              >
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
