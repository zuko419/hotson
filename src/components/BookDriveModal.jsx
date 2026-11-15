import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import Button from './ui/Button';

export const BookDriveModal = ({ isOpen, onClose, preselectedModel = 'HOTSON GT-ONE' }) => {
  const [model, setModel] = useState(preselectedModel);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('New York Atelier');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after 3s
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    }, 500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
    >
      <div className="relative w-full max-w-xl bg-[#15151A] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FF6A2B]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#9B9BA8] hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#FF6A2B]/20 text-[#FF6A2B] flex items-center justify-center shadow-[0_0_30px_rgba(255,106,43,0.4)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight">
              Test Drive Confirmed
            </h3>
            <p className="text-sm text-[#9B9BA8] max-w-sm mx-auto font-body">
              A private appointment voucher for the <span className="text-white font-bold">{model}</span> has been dispatched to {email || 'your email'}. Our client concierge will contact you within 2 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#FF6A2B] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Experience Allocation</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-white">
                BOOK YOUR EXPERIENCE
              </h3>
              <p className="text-xs text-[#9B9BA8] font-body mt-1">
                Complimentary 90-minute private evaluation on curated closed courses and open scenic highways.
              </p>
            </div>

            <div className="space-y-3.5">
              {/* Model Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#9B9BA8] mb-1">
                  Selected Vehicle
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF6A2B]"
                >
                  <option value="HOTSON GT-ONE">HOTSON GT-ONE (1,420 HP Hyper-GT)</option>
                  <option value="HOTSON PHANTOM S">HOTSON PHANTOM S (1,180 HP Executive Aeroback)</option>
                  <option value="HOTSON TERRA-X">HOTSON TERRA-X (1,050 HP Hyper-SUV)</option>
                </select>
              </div>

              {/* Location & Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#9B9BA8] mb-1">
                    Atelier Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF6A2B]"
                  >
                    <option value="New York Atelier">New York • Manhattan Atelier</option>
                    <option value="Silicon Valley Studio">Silicon Valley • Palo Alto</option>
                    <option value="London Mayfair">London • Mayfair Experience</option>
                    <option value="Zurich Boutique">Zurich • Bahnhofstrasse</option>
                    <option value="Tokyo Ginza">Tokyo • Ginza Flagship</option>
                    <option value="Private Residence Delivery">Private Residence Concierge Delivery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#9B9BA8] mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF6A2B]"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#9B9BA8] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Vane"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#FF6A2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#9B9BA8] mb-1">
                    Direct Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#FF6A2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#9B9BA8] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="jordan.vane@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#FF6A2B]"
                />
              </div>
            </div>

            <div className="pt-3">
              <Button
                variant="primary"
                size="lg"
                type="submit"
                className="w-full justify-center"
              >
                Reserve Test Drive Appointment
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#8E8E9F]">
              <Shield className="w-3.5 h-3.5 text-[#FF6A2B]" />
              <span>Full Insurance & Security Escort Provided by HOTSON</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookDriveModal;

