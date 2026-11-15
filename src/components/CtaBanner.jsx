import React from 'react';
import Button from './ui/Button';
import { Calendar, ShieldCheck, Sparkles } from 'lucide-react';

export const CtaBanner = ({ onBookDriveClick }) => {
  return (
    <section className="relative w-full py-28 sm:py-36 overflow-hidden">
      {/* Full-Width Sunset Road Cinematic Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=85"
          alt="Cinematic coastal sunset highway"
          className="w-full h-full object-cover object-center transform scale-105"
          loading="lazy"
        />

        {/* Orange and Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/80 to-[#FF6A2B]/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-[#0A0A0C]/80" />
        <div className="absolute inset-0 bg-[#FF6A2B]/15 mix-blend-screen" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl space-y-8">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6A2B]" />
            <span className="text-xs font-mono uppercase tracking-eyebrow">
              BESPOKE TEST DRIVE APPOINTMENTS
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black uppercase text-white tracking-tight leading-[1.05]">
            YOUR NEXT CHAPTER{' '}
            <span className="block text-[#FF6A2B] drop-shadow-[0_0_35px_rgba(255,106,43,0.5)]">
              STARTS HERE.
            </span>
          </h2>

          <p className="text-base sm:text-xl text-[#E0E0E6] font-body font-normal leading-relaxed max-w-xl">
            Experience the visceral surge of instant torque vectoring and acoustic tranquility on your own terms. Private test drives arranged at your private residence or local HOTSON Experience Atelier.
          </p>

          {/* CTA Row with White Pill Button */}
          <div className="flex flex-wrap items-center gap-5 pt-4">
            <Button
              variant="white"
              size="lg"
              onClick={onBookDriveClick}
              aria-label="Book a Test Drive Appointment"
            >
              Book a Drive
            </Button>

            <div className="flex items-center gap-4 text-xs font-mono text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#FF6A2B]" />
                Flexible 48-Hour Rescheduling
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FF6A2B]" />
                Zero Obligation
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Thin Glowing Divider Lines */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF6A2B]/40 to-transparent" />
    </section>
  );
};

export default CtaBanner;

