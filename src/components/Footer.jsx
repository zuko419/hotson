import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    }, 800);
  };

  const linkColumns = [
    {
      title: 'VEHICLES',
      links: [
        { label: 'HOTSON GT-ONE', href: '#models' },
        { label: 'HOTSON PHANTOM S', href: '#models' },
        { label: 'HOTSON TERRA-X', href: '#models' },
        { label: 'Atelier Commission Program', href: '#models' },
        { label: 'Certified Pre-Owned', href: '#' },
      ],
    },
    {
      title: 'TECHNOLOGY',
      links: [
        { label: '800V Structural Battery', href: '#technology' },
        { label: 'Tri-Motor Vectoring', href: '#technology' },
        { label: 'Cryo-Pulse Thermal Loop', href: '#technology' },
        { label: 'Neural Highway Pilot', href: '#technology' },
        { label: 'Over-the-Air Telemetry', href: '#technology' },
      ],
    },
    {
      title: 'EXPERIENCE & COMPANY',
      links: [
        { label: 'Book a Test Drive', href: '#' },
        { label: 'Global Experience Ateliers', href: '#' },
        { label: 'Fleet & Corporate Concierge', href: '#' },
        { label: 'Sustainability & Carbon Ledger', href: '#stories' },
        { label: 'Press & Media Dispatches', href: '#' },
      ],
    },
  ];

  return (
    <footer className="relative bg-[#0A0A0C] text-white pt-20 pb-12 border-t border-white/[0.08] overflow-hidden">
      {/* Background soft glow */}
      <div
        className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-[#FF6A2B]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Section: Brand Info + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/[0.08]">
          
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-[#FF6A2B] flex items-center justify-center font-black text-[#0A0A0C] text-lg rotate-45">
                <span className="-rotate-45">H</span>
              </div>
              <span className="font-heading font-black text-2xl tracking-[0.2em] uppercase">
                HOTSON
              </span>
            </div>

            <p className="text-sm text-[#9B9BA8] max-w-sm font-body leading-relaxed">
              Defying convention through structural electric purity. Engineered at the intersection of extreme aerodynamic physics and profound human instinct.
            </p>

            <div className="pt-2 text-xs font-mono text-[#8E8E9F] space-y-1">
              <p>Global Headquarters: Zurich • Silicon Valley • Tokyo</p>
              <p>Client Concierge: concierge@hotson-motors.com</p>
            </div>
          </div>

          {/* Newsletter Form Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="max-w-xl">
              <span className="text-xs font-mono tracking-eyebrow uppercase text-[#FF6A2B] block mb-2">
                PRIVILEGED ACCESS
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold uppercase tracking-tight text-white mb-2">
                RECEIVE THE HOTSON DISPATCHES
              </h3>
              <p className="text-xs sm:text-sm text-[#9B9BA8] mb-5">
                Private previews of upcoming vehicle releases, invite-only track experiences, and technical whitepapers.
              </p>

              {/* Form */}
              <form onSubmit={handleNewsletterSubmit} className="relative">
                <div className="flex items-center rounded-full bg-white/[0.05] border border-white/15 focus-within:border-[#FF6A2B] focus-within:shadow-[0_0_20px_rgba(255,106,43,0.3)] transition-all p-1.5 pl-5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your private email address"
                    className="w-full bg-transparent text-sm text-white placeholder-[#8E8E9F] focus:outline-none"
                    aria-label="Email address for newsletter"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    aria-label="Submit newsletter subscription"
                    data-cursor="hover"
                    className="shrink-0 w-11 h-11 rounded-full bg-[#FF6A2B] hover:bg-[#FF8045] text-white flex items-center justify-center transition-all duration-300 shadow-[0_2px_12px_rgba(255,106,43,0.5)] active:scale-95 disabled:opacity-50"
                  >
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

                {/* Validation / Feedback states */}
                {status === 'error' && (
                  <p className="mt-2.5 text-xs text-red-400 flex items-center gap-1.5 font-mono">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errorMessage}</span>
                  </p>
                )}

                {status === 'success' && (
                  <p className="mt-2.5 text-xs text-emerald-400 flex items-center gap-1.5 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>You are registered for upcoming private dispatches.</span>
                  </p>
                )}
              </form>
            </div>
          </div>

        </div>

        {/* Middle Section: 3 Link Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 py-16 border-b border-white/[0.08]">
          {linkColumns.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-eyebrow uppercase text-[#E0E0E6]">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-body">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      data-cursor="hover"
                      className="text-[#8E8E9F] hover:text-[#FF6A2B] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section: Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#737380]">
          <p>© {new Date().getFullYear()} HOTSON Automotive Dynamics Inc. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Carbon Ledger</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

