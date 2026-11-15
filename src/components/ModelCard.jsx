import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Check } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const ModelCard = ({ model, onSelectModel }) => {
  const prefersReduced = useReducedMotion();
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt calculation (-8 to 8 deg)
    const rotX = -((y - centerY) / centerY) * 7;
    const rotY = ((x - centerX) / centerX) * 7;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        y: isHovered && !prefersReduced ? -8 : 0,
      }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 260,
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      data-cursor="hover"
      className="relative flex flex-col bg-white rounded-3xl overflow-hidden border border-[#0A0A0C]/10 shadow-[0_15px_35px_rgba(10,10,12,0.06)] hover:shadow-[0_25px_50px_rgba(10,10,12,0.14)] transition-shadow duration-500 w-full group"
    >
      {/* Top Media Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#15151A]">
        <img
          src={model.image}
          alt={model.name}
          className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />

        {/* Subtle Dark Gradient Overlay at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Badge Top Left */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest font-bold uppercase bg-[#0A0A0C]/85 text-[#F3EEE6] backdrop-blur-md border border-white/10">
            {model.badge}
          </span>
        </div>

        {/* Price Tag Bottom Right */}
        <div className="absolute bottom-3 right-4 z-10">
          <span className="text-xs font-mono font-medium text-white/90 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm">
            {model.price}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-white">
        <div>
          {/* Header */}
          <div className="flex items-baseline justify-between mb-1.5">
            <h3 className="text-xl sm:text-2xl font-heading font-black text-[#0A0A0C] tracking-tight uppercase group-hover:text-[#FF6A2B] transition-colors">
              {model.name}
            </h3>
            <span className="p-1.5 rounded-full bg-[#0A0A0C]/5 group-hover:bg-[#FF6A2B] group-hover:text-white transition-colors duration-300">
              <ArrowUpRight className="w-4 h-4 text-[#0A0A0C] group-hover:text-white" />
            </span>
          </div>

          <p className="text-xs uppercase font-mono tracking-wider text-[#FF6A2B] font-semibold mb-3">
            {model.type}
          </p>

          <p className="text-xs sm:text-sm text-[#4E4E59] font-body line-clamp-2 mb-6">
            {model.tagline}
          </p>
        </div>

        {/* 3 Mini-Specs Grid */}
        <div>
          <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-[#0A0A0C]/10 mb-5 bg-[#F9F6F0] rounded-xl px-3">
            {model.specs.map((spec, idx) => (
              <div key={idx} className="flex flex-col text-center">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737380]">
                  {spec.label}
                </span>
                <span className="text-sm sm:text-base font-heading font-black text-[#0A0A0C]">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* Key Feature highlights */}
          <div className="space-y-1.5 mb-5">
            {model.features.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-[#525260]">
                <Check className="w-3.5 h-3.5 text-[#FF6A2B] shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={() => onSelectModel && onSelectModel(model)}
            className="w-full py-3 px-4 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 flex items-center justify-center gap-2 bg-[#0A0A0C] text-[#F3EEE6] hover:bg-[#FF6A2B] hover:text-white shadow-sm"
          >
            <span>Configure Specification</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ModelCard;

