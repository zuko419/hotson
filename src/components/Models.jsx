import React, { useState } from 'react';
import { modelsData } from '../data/models';
import ModelCard from './ModelCard';
import Button from './ui/Button';
import { Sparkles, SlidersHorizontal, ArrowRight, X, CheckCircle2 } from 'lucide-react';

export const Models = ({ onBookDriveClick }) => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [configuredSuccess, setConfiguredSuccess] = useState(false);

  const handleSelectModel = (model) => {
    setSelectedModel(model);
    setConfiguredSuccess(false);
  };

  const handleConfigureSubmit = (e) => {
    e.preventDefault();
    setConfiguredSuccess(true);
    setTimeout(() => {
      setSelectedModel(null);
      setConfiguredSuccess(false);
    }, 2500);
  };

  return (
    <section
      id="models"
      className="relative bg-[#F3EEE6] text-[#0A0A0C] py-24 sm:py-32 overflow-hidden border-t border-b border-[#0A0A0C]/10"
    >
      {/* Subtle organic watermark or background contour */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EAE3D6]/70 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFEADA]/50 rounded-full blur-[80px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Editorial Headline + View All Button) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A0A0C]/5 border border-[#0A0A0C]/10 text-xs font-mono uppercase tracking-eyebrow text-[#0A0A0C]">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6A2B]" />
                <span>The 2027 Lineup</span>
              </div>

              {/* Headline */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight uppercase text-[#0A0A0C] leading-[1.05]">
                BORN FROM
                <span className="block text-[#FF6A2B]">PURE PURPOSE.</span>
              </h2>

              <p className="text-base text-[#4E4E59] font-body leading-relaxed max-w-md">
                Three bespoke expressions of electric architecture. Each model is hand-finished with aerospace grade composites and calibrated for unmatched chassis dynamics.
              </p>

              {/* View All Button */}
              <div className="pt-2">
                <Button
                  variant="creamDark"
                  size="md"
                  onClick={onBookDriveClick}
                  aria-label="View all models and reserve"
                >
                  View All Models & Options
                </Button>
              </div>

              {/* Engineering Highlights List */}
              <div className="pt-8 border-t border-[#0A0A0C]/10 space-y-4 text-xs font-mono">
                <div className="flex items-center justify-between py-1 border-b border-[#0A0A0C]/5">
                  <span className="text-[#737380] uppercase">Chassis Platform</span>
                  <span className="font-bold text-[#0A0A0C]">Modular Carbon Matrix</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#0A0A0C]/5">
                  <span className="text-[#737380] uppercase">Autonomous Stack</span>
                  <span className="font-bold text-[#0A0A0C]">Neural Pilot Level 4</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#737380] uppercase">Global Warranty</span>
                  <span className="font-bold text-[#0A0A0C]">10 Yrs / 150,000 Mi</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: 3 Model Cards */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-6">
              {modelsData.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  onSelectModel={handleSelectModel}
                />
              ))}
            </div>

            {/* Bottom note */}
            <div className="mt-12 p-6 rounded-2xl bg-white/70 border border-[#0A0A0C]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#FF6A2B]/10 text-[#FF6A2B]">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-heading font-bold text-[#0A0A0C] uppercase tracking-wide">
                    Custom Atelier Commission Program
                  </p>
                  <p className="text-xs text-[#525260]">
                    Bespoke interior bespoke hides, custom paint-to-sample, and personalized aerodynamic trims.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onBookDriveClick}
                className="shrink-0 text-xs font-mono font-bold uppercase tracking-wider text-[#FF6A2B] hover:text-[#0A0A0C] transition-colors flex items-center gap-1.5"
              >
                <span>Consult Atelier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Configuration Drawer/Modal */}
      {selectedModel && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
        >
          <div className="relative w-full max-w-lg bg-[#15151A] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedModel(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#9B9BA8] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close configuration modal"
            >
              <X className="w-5 h-5" />
            </button>

            {configuredSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#FF6A2B]/20 text-[#FF6A2B] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-bold uppercase tracking-tight">
                  Specification Reserved
                </h3>
                <p className="text-sm text-[#9B9BA8]">
                  Your design token for <span className="text-white font-bold">{selectedModel.name}</span> has been dispatched to your private concierge.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfigureSubmit} className="space-y-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#FF6A2B]">
                    Reserve Allocation
                  </span>
                  <h3 className="text-2xl font-heading font-black uppercase text-white mt-1">
                    {selectedModel.name}
                  </h3>
                  <p className="text-xs text-[#9B9BA8] mt-1">{selectedModel.price}</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <img
                    src={selectedModel.image}
                    alt={selectedModel.name}
                    className="w-16 h-12 object-cover rounded-lg"
                  />
                  <div>
                    <p className="text-xs font-bold text-white uppercase">{selectedModel.type}</p>
                    <p className="text-[11px] text-[#9B9BA8]">Tri-motor AWD • 800V Architecture</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#9B9BA8] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Vane"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#FF6A2B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#9B9BA8] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jordan@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#FF6A2B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#9B9BA8] mb-1">
                      Preferred Delivery Region
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-xl bg-[#202028] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF6A2B]">
                      <option>North America (USA & Canada)</option>
                      <option>Western Europe & UK</option>
                      <option>Middle East & Gulf Region</option>
                      <option>Asia Pacific</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    className="w-full justify-center"
                  >
                    Confirm Build Request
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Models;

