import React, { useRef, useState } from 'react';
import { Play, ArrowRight, ShieldCheck, Sparkles, X } from 'lucide-react';
import Button from './ui/Button';
import StatsBar from './StatsBar';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Hero = ({ onExploreClick, onWatchFilmClick }) => {
  const prefersReduced = useReducedMotion();
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const handleExplore = (e) => {
    e.preventDefault();
    if (onExploreClick) {
      onExploreClick();
    } else {
      const target = document.querySelector('#models');
      if (target) {
        if (window.__lenis) {
          window.__lenis.scrollTo(target, { offset: 0 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-36 bg-[#0A0A0C] overflow-hidden">
      {/* Ambient background glow behind car */}
      <div
        className="absolute top-1/3 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6A2B]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#15151A] rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-8 lg:py-16">
          
          {/* Left Column: Headlines & CTAs (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 sm:space-y-8">
            
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#FF6A2B] animate-pulse" />
              <span className="text-[11px] font-mono tracking-eyebrow uppercase text-[#E0E0E6]">
                ELECTRIC | INTELLIGENT | HUMAN-CENTRED
              </span>
            </div>

            {/* Two-Line Headline with line 2 in Orange */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-black tracking-tight leading-[1.04] uppercase text-white">
              <span className="block overflow-hidden">
                <span className={`block transform transition-transform duration-1000 ease-out ${prefersReduced ? '' : 'translate-y-0'}`}>
                  MOVE BEYOND
                </span>
              </span>
              <span className="block overflow-hidden mt-1 sm:mt-2">
                <span className="block text-[#FF6A2B] drop-shadow-[0_0_35px_rgba(255,106,43,0.35)]">
                  THE EXPECTED.
                </span>
              </span>
            </h1>

            {/* Paragraph Description */}
            <p className="max-w-xl text-base sm:text-lg text-[#9B9BA8] font-body font-normal leading-relaxed">
              Engineered without concession. Combining ultra-dense 800V structural energy, sub-millisecond tri-motor vectoring, and an uncompromising sanctuary sculpted around human instinct.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handleExplore}
                aria-label="Explore models"
              >
                Explore Models
              </Button>

              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                data-cursor="hover"
                className="group inline-flex items-center gap-3 px-6 py-4 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30 text-white font-medium text-xs sm:text-sm tracking-wide uppercase transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-[#FF6A2B]/20 group-hover:bg-[#FF6A2B] flex items-center justify-center text-[#FF6A2B] group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch the Film</span>
              </button>
            </div>

            {/* Subtle badges */}
            <div className="flex items-center gap-6 pt-4 text-xs font-mono text-[#8E8E9F]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FF6A2B]" />
                <span>Zero Carbon Footprint</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div>Global Hypercharger Network</div>
            </div>

          </div>

          {/* Right Column: Hero Product Showcase (5 cols on lg) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Visual Rim Light & Glow Backdrop */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-w-2xl lg:max-w-none group">
              
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6A2B]/25 via-transparent to-white/5 rounded-3xl blur-2xl transform group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
              
              {/* Image Container with Border and Slow Zoom */}
              <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.12] bg-[#15151A] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=85"
                  alt="HOTSON GT-ONE Electric Hyper-GT in Matte Obsidian Black"
                  className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="eager"
                />

                {/* Glass Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 rounded-xl bg-[#0A0A0C]/80 backdrop-blur-md border border-white/[0.08] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono tracking-eyebrow text-[#FF6A2B] uppercase block">
                      Active Aerodynamics
                    </span>
                    <span className="text-sm font-heading font-bold text-white tracking-wider">
                      HOTSON GT-ONE PROTOTYPE
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-[#8E8E9F] block">
                      Drag Coefficient
                    </span>
                    <span className="text-sm font-mono font-bold text-white">
                      0.198 Cd
                    </span>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#FF6A2B]/60 pointer-events-none" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#FF6A2B]/60 pointer-events-none" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* StatsBar pinned at the bottom of the Hero section */}
      <StatsBar />

      {/* Video Modal Player */}
      {videoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl animate-fade-in"
        >
          <div className="relative w-full max-w-4xl bg-[#15151A] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0A0C]/60">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A2B]" />
                <span className="text-xs font-mono tracking-widest text-white uppercase">
                  World Premiere — The Genesis of HOTSON
                </span>
              </div>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="p-1.5 rounded-lg text-[#9B9BA8] hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Body: Embedded High Quality Clean EV Cinematic */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1"
                title="HOTSON Brand Film"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            <div className="p-4 bg-[#0A0A0C] flex items-center justify-between text-xs text-[#8E8E9F]">
              <span>Shot on location in Iceland and Nürburgring Nordschleife</span>
              <span className="text-[#FF6A2B]">4K HDR 60FPS</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;

