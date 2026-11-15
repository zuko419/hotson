import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight, ShieldCheck, Calendar, Phone, Sparkles } from 'lucide-react';
import Button from './ui/Button';

export const Navbar = ({ onBookDriveClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll listener for backdrop blur state after 50px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialize
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Models', href: '#models' },
    { label: 'Technology', href: '#technology' },
    { label: 'Design & Interior', href: '#stories' },
    { label: 'Performance', href: '#stats' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -70 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-[#0A0A0C]/80 backdrop-blur-md py-4 border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-gradient-to-b from-[#0A0A0C]/90 via-[#0A0A0C]/40 to-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo Left */}
          <a
            href="#"
            data-cursor="hover"
            aria-label="HOTSON Homepage"
            className="group flex items-center gap-3 select-none"
          >
            {/* Geometric Emblem */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#FF6A2B]/20 rounded-md rotate-45 group-hover:rotate-90 group-hover:bg-[#FF6A2B]/40 transition-transform duration-500" />
              <div className="w-5 h-5 border border-[#FF6A2B] rounded-sm flex items-center justify-center rotate-45">
                <div className="w-2 h-2 bg-white rounded-full group-hover:bg-[#FF6A2B] transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl tracking-[0.22em] text-white">
                HOTSON
              </span>
              <span className="text-[9px] tracking-[0.3em] text-[#FF6A2B] font-mono -mt-1 uppercase">
                Hyper-EV
              </span>
            </div>
          </a>

          {/* Links Center (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                data-cursor="hover"
                className="text-xs lg:text-sm uppercase font-medium tracking-[0.14em] text-[#9B9BA8] hover:text-white transition-colors duration-200 relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF6A2B] group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            ))}
          </nav>

          {/* Right Side: Search Icon + Orange Pill CTA */}
          <div className="flex items-center gap-4">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search models and specs"
              data-cursor="hover"
              className="p-2.5 text-[#9B9BA8] hover:text-white hover:bg-white/5 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-[#FF6A2B]"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Book a Drive Button */}
            <div className="hidden sm:block">
              <Button
                variant="primary"
                size="sm"
                onClick={onBookDriveClick}
                aria-label="Book a Test Drive"
              >
                Book a Drive
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
              data-cursor="hover"
              className="md:hidden p-2 text-white hover:text-[#FF6A2B] focus-visible:ring-2 focus-visible:ring-[#FF6A2B] rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0A0A0C]/95 backdrop-blur-2xl transition-all duration-500 md:hidden flex flex-col justify-between p-8 pt-28 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-eyebrow text-[#FF6A2B] font-mono">
            Navigation Menu
          </p>
          <div className="flex flex-col space-y-4">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-2xl font-heading font-semibold uppercase tracking-wider text-white hover:text-[#FF6A2B] transition-colors flex items-center justify-between border-b border-white/5 pb-3"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-[#9B9BA8]">0{idx + 1}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-white/10">
          <Button
            variant="primary"
            size="lg"
            className="w-full justify-center"
            onClick={() => {
              setMobileMenuOpen(false);
              if (onBookDriveClick) onBookDriveClick();
            }}
          >
            Book a Test Drive
          </Button>
          <p className="text-center text-xs text-[#9B9BA8]">
            Customer Concierge: +1 (800) 468-7663
          </p>
        </div>
      </div>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md animate-fade-in"
        >
          <div className="relative w-full max-w-2xl bg-[#15151A] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Search className="w-5 h-5 text-[#FF6A2B]" />
              <input
                type="text"
                autoFocus
                placeholder="Search models, specs, tech (e.g. GT-ONE, 800V, Range)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-[#8E8E9F] focus:outline-none text-base"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 text-[#9B9BA8] hover:text-white"
                aria-label="Close search modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <p className="text-xs uppercase tracking-eyebrow text-[#8E8E9F] font-mono">
                Suggested Searches
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { title: 'HOTSON GT-ONE', desc: '1,420 HP Tri-Motor Hyper GT', href: '#models' },
                  { title: '800V Silicon-Carbide Tech', desc: '12-minute rapid charging', href: '#technology' },
                  { title: 'HOTSON PHANTOM S', desc: 'Executive luxury aeroback', href: '#models' },
                  { title: 'Acoustic Human Interior', desc: 'Sustainable cashmere & vegan grain', href: '#stories' },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={(e) => {
                      setSearchOpen(false);
                      handleLinkClick(e, item.href);
                    }}
                    className="p-3 rounded-xl bg-white/[0.03] hover:bg-[#FF6A2B]/10 hover:border-[#FF6A2B]/30 border border-transparent transition-all group"
                  >
                    <p className="text-sm font-semibold text-white group-hover:text-[#FF6A2B]">
                      {item.title}
                    </p>
                    <p className="text-xs text-[#8E8E9F]">{item.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

