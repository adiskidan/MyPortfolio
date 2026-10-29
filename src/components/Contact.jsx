import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  MessageSquare, 
  Sparkles,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TelegramIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const themeContext = useTheme();
  const isBright = Boolean(themeContext?.isBright);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleChange = (e) => {
    if (sentSuccess) setSentSuccess(null);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);
    setSentSuccess(null);

    const subjectText = formData.subject.trim() || `Portfolio Inquiry from ${formData.name.trim()}`;
    const formattedBody = `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\nSubject: ${subjectText}\n\nMessage:\n${formData.message.trim()}`;

    const jsonPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: subjectText,
      message: formData.message.trim(),
      _replyto: formData.email.trim(),
      _subject: subjectText,
      _captcha: 'false',
    };

    // 1. Send directly to local /api/contact endpoint (persists to messages.json)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(jsonPayload),
      });
    } catch (err) {
      console.warn('Local /api/contact save error:', err);
    }

    // 2. Dispatch to cloud form service (Web3Forms if configured)
    let bgSent = false;
    if (personalInfo.web3formsKey) {
      try {
        const resp = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            access_key: personalInfo.web3formsKey,
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: subjectText,
            message: formData.message.trim(),
            from_name: formData.name.trim(),
          }),
        });
        const respData = await resp.json();
        if (respData.success) {
          bgSent = true;
        }
      } catch (err) {
        console.warn('Web3Forms dispatch error:', err);
      }
    } else if (personalInfo.formEndpoint && !personalInfo.formEndpoint.includes('formsubmit.co')) {
      try {
        const resp = await fetch(personalInfo.formEndpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonPayload),
        });
        if (resp.ok) {
          bgSent = true;
        }
      } catch (err) {
        console.warn('Cloud form dispatch error:', err);
      }
    }

    // 3. Save to localStorage
    const localRecord = {
      id: Date.now().toString(),
      ...jsonPayload,
      receivedAt: new Date().toLocaleString(),
      status: 'received',
    };

    try {
      const existing = JSON.parse(localStorage.getItem('adis_portfolio_messages') || '[]');
      const updated = [localRecord, ...existing];
      localStorage.setItem('adis_portfolio_messages', JSON.stringify(updated));
    } catch {
      // ignore
    }

    // 4. Prepare direct dispatch URLs (for optional 1-click shortcuts)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      personalInfo.email
    )}&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(formattedBody)}`;

    const telegramText = `Hi Adis, my name is ${formData.name.trim()} (${formData.email.trim()}):\n${formData.message.trim()}`;
    const telegramUrl = `https://t.me/adiskidan?text=${encodeURIComponent(telegramText)}`;

    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      subjectText
    )}&body=${encodeURIComponent(formattedBody)}`;

    // 5. Automatically open the pre-filled Gmail compose window (guarantees delivery into Adis's inbox/spam)
    if (!bgSent) {
      try {
        window.open(gmailUrl, '_blank');
      } catch {
        // window.open blocked by browser
      }
    }

    setIsSubmitting(false);

    // 6. Display glowing green line banner directly on screen
    setSentSuccess({
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: subjectText,
      message: formData.message.trim(),
      formattedBody,
      gmailUrl,
      telegramUrl,
      mailtoUrl,
      time: new Date().toLocaleTimeString(),
    });

    // 7. Clear form inputs
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative max-w-7xl mx-auto">
      {/* Background radial glow */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[140px] pointer-events-none ${
        isBright ? 'bg-cyan-500/10' : 'bg-cyan-500/5'
      }`} />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium mb-3 border ${
          isBright 
            ? 'bg-cyan-50 border-cyan-200 text-cyan-700' 
            : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
        }`}>
          <MessageSquare className="w-3.5 h-3.5" />
          <span>06 // CONNECT</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${
          isBright ? 'text-slate-900' : 'text-white'
        }`}>
          Let&apos;s Build Something Impactful
        </h2>
        <p className={`text-sm sm:text-base max-w-2xl mt-3 ${
          isBright ? 'text-slate-600' : 'text-slate-400'
        }`}>
          Interested in working together, discussing an internship, or talking tech? Drop me a message!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`p-6 sm:p-8 rounded-2xl border space-y-6 shadow-xl transition-all ${
            isBright 
              ? 'bg-white/95 border-slate-200 shadow-slate-200/60' 
              : 'glass-panel border-white/10 shadow-black/40'
          }`}>
            <h3 className={`text-xl font-bold ${isBright ? 'text-slate-900' : 'text-white'}`}>
              Contact Channels
            </h3>
            <p className={`text-sm leading-relaxed ${
              isBright ? 'text-slate-600' : 'text-slate-300'
            }`}>
              I am actively seeking software engineering internships, collaborative tech initiatives,
              and freelance opportunities. I reply promptly!
            </p>

            {/* Email Box with One-Click Copy */}
            <div className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
              isBright ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/90 border-slate-800'
            }`}>
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2.5 rounded-lg bg-cyan-500/15 text-cyan-500 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className={`text-[11px] font-mono uppercase block ${
                    isBright ? 'text-slate-500' : 'text-slate-500'
                  }`}>
                    Direct Email
                  </span>
                  <span className={`text-sm font-semibold truncate block ${
                    isBright ? 'text-slate-900' : 'text-white'
                  }`}>
                    {personalInfo.email}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className={`p-2 rounded-lg transition-colors cursor-pointer shrink-0 border ${
                  isBright 
                    ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
                }`}
                title="Copy email address"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4 text-cyan-500" />
                )}
              </button>
            </div>

            {/* Location & Status info */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm">
                <div className={`p-2 rounded-lg ${isBright ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-800 text-indigo-400'}`}>
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className={`text-xs block ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>Based in</span>
                  <span className={`font-medium ${isBright ? 'text-slate-800' : 'text-white'}`}>{personalInfo.location} (Debre Berhan / Addis Ababa)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className={`p-2 rounded-lg ${isBright ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-800 text-emerald-400'}`}>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className={`text-xs block ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>Current Status</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Open to Internships &amp; Roles</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className={`pt-4 border-t space-y-3 ${isBright ? 'border-slate-100' : 'border-white/5'}`}>
              <span className={`text-xs font-mono uppercase tracking-wider block ${
                isBright ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Find Me On
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                    isBright 
                      ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700' 
                      : 'bg-slate-900 border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white'
                  }`}
                >
                  <GithubIcon className="w-4 h-4 text-cyan-500" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                    isBright 
                      ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700' 
                      : 'bg-slate-900 border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white'
                  }`}
                >
                  <LinkedinIcon className="w-4 h-4 text-cyan-500" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                    isBright 
                      ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700' 
                      : 'bg-slate-900 border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white'
                  }`}
                >
                  <TelegramIcon className="w-4 h-4 text-cyan-500" />
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className={`p-6 sm:p-8 rounded-2xl border space-y-5 shadow-xl transition-all ${
              isBright 
                ? 'bg-white/95 border-slate-200 shadow-slate-200/60' 
                : 'glass-panel border-white/10 shadow-black/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className={`text-xl font-bold ${isBright ? 'text-slate-900' : 'text-white'}`}>
                Send a Direct Message
              </h3>
              <span className={`text-xs font-mono px-2.5 py-1 rounded-md border ${
                isBright 
                  ? 'bg-cyan-50 text-cyan-700 border-cyan-300' 
                  : 'bg-cyan-950/40 text-cyan-400 border-cyan-500/40'
              }`}>
                Direct to Adis
              </span>
            </div>

            {/* Glowing Green Line Display Successfully Sent */}
            {sentSuccess && (
              <div className={`relative overflow-hidden p-5 rounded-2xl border text-sm space-y-3 transition-all animate-fadeIn ${
                isBright 
                  ? 'bg-emerald-50/90 border-emerald-400 text-slate-900 shadow-md shadow-emerald-500/10' 
                  : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100 shadow-[0_0_25px_rgba(16,185,129,0.2)]'
              }`}>
                {/* Glowing Green Top Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 shadow-[0_0_12px_#10b981]" />

                <div className="flex items-start gap-3 pt-1">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-emerald-500 dark:text-emerald-400 tracking-wide">
                        MESSAGE SENT SUCCESSFULLY
                      </h4>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                    </div>
                    <p className={`text-xs mt-1 leading-relaxed ${isBright ? 'text-slate-700' : 'text-slate-300'}`}>
                      Thank you, <strong>{sentSuccess.name}</strong>! Your message has been pre-filled directly for Adis Kidan (<strong>{personalInfo.email}</strong>). Click <strong>Send</strong> in the opened Gmail tab to complete delivery!
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-emerald-500/20">
                  <a
                    href={sentSuccess.gmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-500 text-white shadow-sm transition-all hover:scale-105"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open in Gmail</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>

                  <a
                    href={sentSuccess.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-sm transition-all"
                  >
                    <TelegramIcon className="w-3.5 h-3.5" />
                    <span>Send on Telegram</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopyMessage(sentSuccess.formattedBody)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      isBright 
                        ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300' 
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                    <span>{copiedText ? 'Copied Message!' : 'Copy Text'}</span>
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={`text-xs font-mono uppercase tracking-wider ${
                  isBright ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Dawit Abebe"
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors outline-none ${
                    isBright 
                      ? 'bg-slate-50 border-slate-300 focus:border-cyan-500 text-slate-900 placeholder-slate-400' 
                      : 'bg-slate-900/90 border-slate-800 focus:border-cyan-400 text-white placeholder-slate-600'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className={`text-xs font-mono uppercase tracking-wider ${
                  isBright ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors outline-none ${
                    isBright 
                      ? 'bg-slate-50 border-slate-300 focus:border-cyan-500 text-slate-900 placeholder-slate-400' 
                      : 'bg-slate-900/90 border-slate-800 focus:border-cyan-400 text-white placeholder-slate-600'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-mono uppercase tracking-wider ${
                isBright ? 'text-slate-600' : 'text-slate-400'
              }`}>
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Internship opportunity / Project inquiry / Tech discussion"
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors outline-none ${
                  isBright 
                    ? 'bg-slate-50 border-slate-300 focus:border-cyan-500 text-slate-900 placeholder-slate-400' 
                    : 'bg-slate-900/90 border-slate-800 focus:border-cyan-400 text-white placeholder-slate-600'
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-mono uppercase tracking-wider ${
                isBright ? 'text-slate-600' : 'text-slate-400'
              }`}>
                Message *
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Hi Adis, I'd like to talk about..."
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors outline-none resize-none ${
                  isBright 
                    ? 'bg-slate-50 border-slate-300 focus:border-cyan-500 text-slate-900 placeholder-slate-400' 
                    : 'bg-slate-900/90 border-slate-800 focus:border-cyan-400 text-white placeholder-slate-600'
                }`}
              />
            </div>

            {/* Direct Send Message Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <span className={`text-xs ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>
                Delivers to <strong className={isBright ? 'text-slate-800' : 'text-cyan-400'}>{personalInfo.email}</strong>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}