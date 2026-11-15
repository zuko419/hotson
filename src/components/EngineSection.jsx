import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useMousePosition } from '../hooks/useMousePosition';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Cpu, Zap, Thermometer, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── SVG ENGINE PART GRAPHICS ───────────────────────────────────────────────

const BatteryGraphic = ({ active }) => (
  <svg viewBox="0 0 600 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main tray body */}
    <rect x="30" y="30" width="540" height="160" rx="18" fill="#0E0E14" stroke={active ? '#FF6A2B' : '#2A2A38'} strokeWidth={active ? 2 : 1.5} />
    <rect x="46" y="46" width="508" height="128" rx="10" fill="#0A0A10" stroke="#FF6A2B" strokeWidth="0.8" strokeOpacity={active ? 0.7 : 0.25} />

    {/* 6 Cell modules */}
    {[0, 1, 2, 3, 4, 5].map((col) => (
      <g key={col}>
        <rect x={62 + col * 83} y="58" width="68" height="104" rx="6" fill="#141420" stroke="#3A3A50" strokeWidth="1.2" />
        {/* Cell terminals — orange lines */}
        <line x1={70 + col * 83} y1="72" x2={122 + col * 83} y2="72" stroke="#FF6A2B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1={70 + col * 83} y1="90" x2={122 + col * 83} y2="90" stroke="#FF6A2B" strokeWidth="1.8" strokeOpacity="0.6" strokeLinecap="round" />
        <line x1={70 + col * 83} y1="108" x2={122 + col * 83} y2="108" stroke="#FF6A2B" strokeWidth="1.8" strokeOpacity="0.6" strokeLinecap="round" />
        {/* Terminal dot */}
        <circle cx={96 + col * 83} cy="136" r="4" fill="#FF6A2B" fillOpacity={active ? 1 : 0.5} />
      </g>
    ))}

    {/* Top busbar */}
    <path d="M60 24 H540" stroke="#FF6A2B" strokeWidth="2.5" strokeDasharray="10 5" strokeOpacity={active ? 0.9 : 0.4} />
    {/* Bottom busbar */}
    <path d="M60 196 H540" stroke="#FF6A2B" strokeWidth="2.5" strokeDasharray="10 5" strokeOpacity={active ? 0.9 : 0.4} />

    {/* Label */}
    <text x="300" y="14" textAnchor="middle" fill="#FF6A2B" fontSize="11" fontFamily="monospace" letterSpacing="4" fillOpacity={active ? 1 : 0.5}>
      800V · 118 kWh SILICON-GRAPHITE STRUCTURAL PACK
    </text>
  </svg>
);

const MotorGraphic = ({ active }) => (
  <svg viewBox="0 0 500 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left motor housing */}
    <rect x="30" y="30" width="140" height="160" rx="14" fill="#12121C" stroke={active ? '#FF6A2B' : '#3A3A50'} strokeWidth={active ? 2 : 1.2} />
    <circle cx="100" cy="110" r="52" fill="#0A0A14" stroke="#FF6A2B" strokeWidth="2" strokeOpacity={active ? 0.9 : 0.4} />
    <circle cx="100" cy="110" r="34" fill="#161624" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
    <circle cx="100" cy="110" r="16" fill={active ? '#FF6A2B' : '#2A1A10'} />
    {/* Stator coil windings */}
    {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle) => (
      <rect key={angle} x="96" y="66" width="8" height="14" rx="2" fill="#D96B30" transform={`rotate(${angle} 100 110)`} />
    ))}
    {/* Spin axis */}
    <line x1="100" y1="40" x2="100" y2="180" stroke="#FF6A2B" strokeWidth="1.5" strokeDasharray="5 3" strokeOpacity="0.7" />

    {/* Right motor housing */}
    <rect x="330" y="30" width="140" height="160" rx="14" fill="#12121C" stroke={active ? '#FF6A2B' : '#3A3A50'} strokeWidth={active ? 2 : 1.2} />
    <circle cx="400" cy="110" r="52" fill="#0A0A14" stroke="#FF6A2B" strokeWidth="2" strokeOpacity={active ? 0.9 : 0.4} />
    <circle cx="400" cy="110" r="34" fill="#161624" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
    <circle cx="400" cy="110" r="16" fill={active ? '#FF6A2B' : '#2A1A10'} />
    {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle) => (
      <rect key={angle} x="396" y="66" width="8" height="14" rx="2" fill="#D96B30" transform={`rotate(${angle} 400 110)`} />
    ))}
    <line x1="400" y1="40" x2="400" y2="180" stroke="#FF6A2B" strokeWidth="1.5" strokeDasharray="5 3" strokeOpacity="0.7" />

    {/* Centre coupling shaft */}
    <rect x="170" y="97" width="160" height="26" rx="6" fill={active ? '#FF6A2B' : '#3A2010'} />
    <line x1="250" y1="97" x2="250" y2="123" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.3" />

    {/* Label */}
    <text x="250" y="206" textAnchor="middle" fill="#FF6A2B" fontSize="10" fontFamily="monospace" letterSpacing="3" fillOpacity={active ? 1 : 0.5}>
      TRI-MOTOR SiC · 24,000 RPM · 1,750 Nm
    </text>
  </svg>
);

const ThermalGraphic = ({ active }) => (
  <svg viewBox="0 0 500 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Heat exchanger housing */}
    <rect x="60" y="30" width="380" height="140" rx="12" fill="#0A0F17" stroke={active ? '#38BDF8' : '#1E3545'} strokeWidth={active ? 2 : 1.2} />

    {/* Microchannel fins */}
    {[...Array(20)].map((_, i) => (
      <line key={i} x1={80 + i * 17} y1="45" x2={80 + i * 17} y2="155" stroke="#38BDF8" strokeWidth="1.8" strokeOpacity={active ? 0.65 : 0.25} />
    ))}

    {/* Coolant loop — cyan dashed */}
    <path d="M80 70 Q 250 20 420 70 Q 500 95 420 130 Q 250 180 80 130 Z"
      stroke="#38BDF8" strokeWidth="2.2" fill="none" strokeDasharray="8 4" strokeOpacity={active ? 0.85 : 0.3} />

    {/* Hot return loop — orange */}
    <path d="M80 150 Q 250 195 420 150"
      stroke="#FF6A2B" strokeWidth="2" fill="none" strokeOpacity={active ? 0.8 : 0.3} />

    {/* Centre manifold valve */}
    <circle cx="250" cy="100" r="14" fill="#111B26" stroke="#38BDF8" strokeWidth="2" />
    <circle cx="250" cy="100" r="5" fill={active ? '#38BDF8' : '#1A3040'} />

    {/* Side port connectors */}
    <rect x="42" y="88" width="18" height="24" rx="4" fill="#0D1A25" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.7" />
    <rect x="440" y="88" width="18" height="24" rx="4" fill="#0D1A25" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.7" />

    {/* Label */}
    <text x="250" y="208" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="monospace" letterSpacing="3" fillOpacity={active ? 1 : 0.5}>
      CRYO-PULSE MICROCHANNEL HEAT EXCHANGER
    </text>
  </svg>
);

const SubframeGraphic = ({ active }) => (
  <svg viewBox="0 0 560 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main chassis cross-member */}
    <path d="M60 150 L 160 90 L 400 90 L 500 150 L 460 190 L 360 170 L 200 170 L 100 190 Z"
      fill="#0E0E18" stroke={active ? '#FF6A2B' : '#3A3A55'} strokeWidth={active ? 2 : 1.5} />

    {/* Internal triangulated trusses */}
    <line x1="160" y1="90" x2="200" y2="170" stroke="#FF6A2B" strokeWidth="1.8" strokeOpacity={active ? 0.8 : 0.35} />
    <line x1="400" y1="90" x2="360" y2="170" stroke="#FF6A2B" strokeWidth="1.8" strokeOpacity={active ? 0.8 : 0.35} />
    <line x1="280" y1="90" x2="280" y2="170" stroke="#606075" strokeWidth="1.5" strokeOpacity={active ? 0.9 : 0.4} />
    <line x1="220" y1="90" x2="200" y2="170" stroke="#444455" strokeWidth="1.2" strokeOpacity="0.5" />
    <line x1="340" y1="90" x2="360" y2="170" stroke="#444455" strokeWidth="1.2" strokeOpacity="0.5" />

    {/* Hub carriers */}
    <circle cx="60" cy="150" r="20" fill="#161624" stroke={active ? '#FF6A2B' : '#3A3A55'} strokeWidth="2" />
    <circle cx="60" cy="150" r="8" fill={active ? '#FF6A2B' : '#2A1800'} />
    <circle cx="500" cy="150" r="20" fill="#161624" stroke={active ? '#FF6A2B' : '#3A3A55'} strokeWidth="2" />
    <circle cx="500" cy="150" r="8" fill={active ? '#FF6A2B' : '#2A1800'} />

    {/* Damper body */}
    <rect x="258" y="40" width="44" height="50" rx="6" fill="#141424" stroke="#606075" strokeWidth="1.5" />
    <rect x="270" y="28" width="20" height="14" rx="3" fill="#FF6A2B" fillOpacity={active ? 0.9 : 0.3} />

    {/* Label */}
    <text x="280" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="monospace" letterSpacing="3" fillOpacity={active ? 0.9 : 0.4}>
      TITANIUM WISHBONE · MR DAMPER · 1,000 Hz
    </text>
  </svg>
);

// ─── SCROLL PROGRESS BAR ────────────────────────────────────────────────────
const ScrollProgressBar = ({ progress }) => (
  <div className="absolute left-6 top-1/2 -translate-y-1/2 h-40 w-[2px] hidden lg:flex flex-col items-center z-30" aria-hidden="true">
    <div className="flex-1 w-full bg-white/10 rounded-full relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#FF6A2B] to-[#FF8045] rounded-full transition-none"
        style={{ height: `${progress * 100}%` }}
      />
    </div>
    <div className="mt-2 text-[9px] font-mono text-[#8E8E9F] tracking-widest rotate-90 origin-center">SCROLL</div>
  </div>
);

// ─── PART CONFIG ────────────────────────────────────────────────────────────
const PARTS = [
  {
    id: 'battery',
    label: '01 · ENERGY',
    title: '118 kWh 800V Pack',
    desc: 'Structural skateboard battery floor. Increases torsional rigidity 42% with hyper-low CoG.',
    icon: Zap,
    accentColor: '#FF6A2B',
    // Which direction it moves when exploded (desktop px)
    explode: { x: 0, y: 180, z: -60, rotX: 14, rotY: 0, scale: 0.94 },
    explodeMobile: { x: 0, y: 90, z: -20, rotX: 8, rotY: 0, scale: 0.97 },
    // callout corner
    corner: 'bottom-left',
  },
  {
    id: 'motor',
    label: '02 · PROPULSION',
    title: '24,000 RPM Tri-Motor',
    desc: '1,420 HP silicon-carbide inverters with sub-millisecond torque vectoring per wheel.',
    icon: Cpu,
    accentColor: '#FF6A2B',
    explode: { x: -180, y: -60, z: 80, rotX: -8, rotY: 20, scale: 1.06 },
    explodeMobile: { x: -80, y: -40, z: 25, rotX: -4, rotY: 10, scale: 1.02 },
    corner: 'top-left',
  },
  {
    id: 'thermal',
    label: '03 · THERMAL',
    title: 'Cryo-Pulse Matrix',
    desc: 'Triple-zone microchannel cooling. Eliminates heat-soak enabling unlimited track sessions.',
    icon: Thermometer,
    accentColor: '#38BDF8',
    explode: { x: 180, y: -70, z: 50, rotX: 8, rotY: -18, scale: 1.04 },
    explodeMobile: { x: 80, y: -40, z: 15, rotX: 4, rotY: -8, scale: 1.02 },
    corner: 'top-right',
  },
  {
    id: 'drive',
    label: '04 · DYNAMICS',
    title: 'Titanium Subframe',
    desc: 'Forged Ti-6Al-4V wishbones with MR dampers scanning road topology 1,000 times per second.',
    icon: Shield,
    accentColor: '#FF6A2B',
    explode: { x: 0, y: -180, z: 90, rotX: -16, rotY: 0, scale: 1.08 },
    explodeMobile: { x: 0, y: -90, z: 30, rotX: -8, rotY: 0, scale: 1.03 },
    corner: 'bottom-right',
  },
];

const GraphicComponents = {
  battery: BatteryGraphic,
  motor: MotorGraphic,
  thermal: ThermalGraphic,
  drive: SubframeGraphic,
};

// Corner → Tailwind classes for callout positioning
const CORNER_CLASSES = {
  'bottom-left':  'bottom-4 left-4 lg:bottom-6 lg:left-16',
  'top-left':     'top-4 left-4 lg:top-6 lg:left-16',
  'top-right':    'top-4 right-4 lg:top-6 lg:right-16',
  'bottom-right': 'bottom-4 right-4 lg:bottom-6 lg:right-16',
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export const EngineSection = () => {
  const sectionRef    = useRef(null);
  const pinWrapRef    = useRef(null);  // the element we pin
  const engineGroupRef = useRef(null);
  const partRefs      = useRef({});    // { battery: el, motor: el, ... }
  const calloutRefs   = useRef({});
  const lineRefs      = useRef({});

  // quickTo refs — created once, not re-created on every mouse move
  const quickRotYRef = useRef(null);
  const quickRotXRef = useRef(null);

  const prefersReduced  = useReducedMotion();
  const mousePosition   = useMousePosition();

  // Scroll progress for the sidebar bar (0–1) and active part index
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIdx, setActiveIdx]           = useState(0);

  // ── Mouse parallax (apply via quickTo, created once) ──────────────────────
  useEffect(() => {
    if (prefersReduced || !engineGroupRef.current) return;

    quickRotYRef.current = gsap.quickTo(engineGroupRef.current, 'rotationY', {
      duration: 0.8,
      ease: 'power2.out',
    });
    quickRotXRef.current = gsap.quickTo(engineGroupRef.current, 'rotationX', {
      duration: 0.8,
      ease: 'power2.out',
    });

    return () => {
      quickRotYRef.current = null;
      quickRotXRef.current = null;
    };
  }, [prefersReduced]);

  // Apply mouse position to quickTo every frame (this is intentional, it's cheap)
  useEffect(() => {
    if (prefersReduced) return;
    if (quickRotYRef.current) quickRotYRef.current(mousePosition.normalizedX * 7);
    if (quickRotXRef.current) quickRotXRef.current(-mousePosition.normalizedY * 5);
  }, [mousePosition, prefersReduced]);

  // ── Main GSAP scroll animation ─────────────────────────────────────────────
  useGSAP(
    () => {
      if (prefersReduced || !pinWrapRef.current) return;

      const isMobile  = window.innerWidth < 768;
      const scrollLen = isMobile ? '+=150%' : '+=300%';

      // ── Timeline pinned to the wrapper ──────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapRef.current,
          pin: true,
          pinSpacing: true,
          scrub: 1.4,          // slight lag for cinematic feel
          start: 'top top',
          end: scrollLen,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);

            // Active part window: each part owns 25% of scroll
            const idx = Math.min(3, Math.floor(p * 4));
            setActiveIdx(idx);
          },
        },
      });

      // ── 0–100%: Rotate the whole group while scrolling ───────────────────
      tl.fromTo(
        engineGroupRef.current,
        { rotationY: -18, scale: 0.88 },
        { rotationY: 18,  scale: 1.12, ease: 'none' },
        0
      );

      // ── Phase 1 (0% → 50%): Explode parts apart ─────────────────────────
      PARTS.forEach((part) => {
        const el     = partRefs.current[part.id];
        const offset = isMobile ? part.explodeMobile : part.explode;
        if (!el) return;

        tl.fromTo(
          el,
          { x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, scale: 1, opacity: 1 },
          { x: offset.x, y: offset.y, z: offset.z,
            rotateX: offset.rotX, rotateY: offset.rotY, scale: offset.scale,
            opacity: 1, ease: 'power2.inOut' },
          '<'   // all start together at tl position 0
        );
      });

      // ── Phase 2 (50% → 100%): Reassemble ────────────────────────────────
      PARTS.forEach((part) => {
        const el = partRefs.current[part.id];
        if (!el) return;

        tl.to(
          el,
          { x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, scale: 1,
            ease: 'power2.inOut' },
          0.5    // start at 50% of timeline
        );
      });

      // ── Callout panels: fade in sequentially, then dim (via GSAP not state) ──
      PARTS.forEach((part, i) => {
        const calloutEl = calloutRefs.current[part.id];
        const lineEl    = lineRefs.current[part.id];
        if (!calloutEl) return;

        // Each callout enters at ~12% intervals starting from 5%
        const enterAt  = 0.05 + i * 0.12;
        const exitAt   = enterAt + 0.14;

        // Line draw-in
        if (lineEl) {
          const lineLen = lineEl.getTotalLength?.() ?? 60;
          gsap.set(lineEl, { strokeDasharray: lineLen, strokeDashoffset: lineLen, opacity: 0 });

          tl.to(
            lineEl,
            { strokeDashoffset: 0, opacity: 1, ease: 'power2.out', duration: 0.08 },
            enterAt
          );
          // fade line out when next one comes in
          if (i < PARTS.length - 1) {
            tl.to(lineEl, { opacity: 0, duration: 0.05 }, exitAt);
          }
        }

        // Callout panel
        gsap.set(calloutEl, { y: 20, opacity: 0, scale: 0.9 });
        tl.to(
          calloutEl,
          { y: 0, opacity: 1, scale: 1, ease: 'back.out(1.4)', duration: 0.1 },
          enterAt
        );
        if (i < PARTS.length - 1) {
          tl.to(calloutEl, { opacity: 0.25, scale: 0.95, duration: 0.07 }, exitAt);
        }
      });

      // Refresh after first render settles
      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        // Kill only the triggers owned by this section
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === pinWrapRef.current) st.kill();
        });
      };
    },
    { scope: sectionRef, dependencies: [prefersReduced] }
  );

  // ─── REDUCED MOTION STATIC RENDER ──────────────────────────────────────────
  if (prefersReduced) {
    return (
      <section id="technology" className="relative bg-[#0A0A0C] py-24 sm:py-32 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-mono tracking-eyebrow uppercase text-[#FF6A2B]">
              POWERTRAIN ARCHITECTURE
            </span>
            <h2 className="text-4xl sm:text-5xl font-heading font-black uppercase tracking-tight">
              STRUCTURAL POWER. <span className="text-[#FF6A2B]">ZERO COMPROMISE.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PARTS.map((part) => {
              const Icon = part.icon;
              const Graphic = GraphicComponents[part.id];
              return (
                <div key={part.id} className="p-6 rounded-2xl bg-[#15151A] border border-white/10">
                  <div className="mb-4 h-32">
                    <Graphic active={true} />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4" style={{ color: part.accentColor }} />
                    <span className="text-xs font-mono tracking-widest uppercase" style={{ color: part.accentColor }}>
                      {part.label}
                    </span>
                  </div>
                  <h3 className="text-base font-heading font-bold text-white uppercase mb-1">{part.title}</h3>
                  <p className="text-xs text-[#9B9BA8]">{part.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // ─── FULL ANIMATED RENDER ──────────────────────────────────────────────────
  return (
    <section id="technology" ref={sectionRef} className="relative bg-[#0A0A0C] text-white overflow-hidden">
      {/* ── Pinned wrapper — this is what ScrollTrigger pins ── */}
      <div ref={pinWrapRef} className="relative w-full h-screen flex flex-col overflow-hidden">

        {/* Ambient radial glow */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,106,43,0.09)_0%,rgba(10,10,12,0.98)_70%)] pointer-events-none"
          aria-hidden="true"
        />
        {/* Fine grid */}
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Scroll progress sidebar */}
        <ScrollProgressBar progress={scrollProgress} />

        {/* ── Section Header ── */}
        <div className="relative z-20 pt-24 sm:pt-28 pb-4 text-center px-6 shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A2B] animate-pulse" />
            <span className="text-[10px] font-mono tracking-eyebrow uppercase text-[#E0E0E6]">
              POWERTRAIN ARCHITECTURE · EXPLODED TELEMETRY
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase leading-tight">
            STRUCTURAL POWER.&nbsp;
            <span className="text-[#FF6A2B] drop-shadow-[0_0_30px_rgba(255,106,43,0.5)]">ZERO COMPROMISE.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#9B9BA8] max-w-lg mx-auto mt-3 font-body">
            Scroll to deconstruct the core. Four synchronized subsystems — explore each one as it separates from the whole.
          </p>
        </div>

        {/* ── 3D Engine Stage ── */}
        <div
          className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center px-4"
          style={{ perspective: '1400px' }}
        >
          {/* Rotating engine group */}
          <div
            ref={engineGroupRef}
            className="relative w-full h-full max-h-[380px] sm:max-h-[420px] flex items-center justify-center will-change-transform"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Each part sits at center and gets GSAP-translated outward */}
            {PARTS.map((part) => {
              const Graphic = GraphicComponents[part.id];
              return (
                <div
                  key={part.id}
                  id={`part-${part.id}`}
                  ref={(el) => { partRefs.current[part.id] = el; }}
                  className="absolute inset-0 flex items-center justify-center will-change-transform"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="w-[90%] sm:w-[80%] lg:w-[75%]">
                    <Graphic active={activeIdx === PARTS.indexOf(part)} />
                  </div>
                </div>
              );
            })}

            {/* SVG connector lines (drawn over the engine group) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Battery → bottom-left callout */}
              <line
                ref={(el) => { lineRefs.current['battery'] = el; }}
                x1="28" y1="68" x2="12" y2="78"
                stroke="#FF6A2B" strokeWidth="0.5" fill="none"
              />
              {/* Motor → top-left callout */}
              <line
                ref={(el) => { lineRefs.current['motor'] = el; }}
                x1="30" y1="34" x2="13" y2="22"
                stroke="#FF6A2B" strokeWidth="0.5" fill="none"
              />
              {/* Thermal → top-right callout */}
              <line
                ref={(el) => { lineRefs.current['thermal'] = el; }}
                x1="70" y1="30" x2="87" y2="20"
                stroke="#38BDF8" strokeWidth="0.5" fill="none"
              />
              {/* Drive → bottom-right callout */}
              <line
                ref={(el) => { lineRefs.current['drive'] = el; }}
                x1="72" y1="66" x2="88" y2="76"
                stroke="#FF6A2B" strokeWidth="0.5" fill="none"
              />
            </svg>
          </div>

          {/* ── Callout Panels ── */}
          {PARTS.map((part) => {
            const Icon = part.icon;
            const isActive = activeIdx === PARTS.indexOf(part);
            const isAccentBlue = part.accentColor === '#38BDF8';

            return (
              <div
                key={part.id}
                ref={(el) => { calloutRefs.current[part.id] = el; }}
                className={`absolute ${CORNER_CLASSES[part.corner]} max-w-[220px] sm:max-w-xs p-3.5 sm:p-4 rounded-2xl border backdrop-blur-md z-30 pointer-events-none`}
                style={{
                  background: isActive ? 'rgba(21,21,26,0.95)' : 'rgba(21,21,26,0.6)',
                  borderColor: isActive ? part.accentColor : 'rgba(255,255,255,0.1)',
                  boxShadow: isActive ? `0 0 28px ${part.accentColor}44` : 'none',
                }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Icon
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: part.accentColor }}
                  />
                  <span
                    className="text-[10px] font-mono tracking-widest uppercase font-semibold"
                    style={{ color: part.accentColor }}
                  >
                    {part.label}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-heading font-bold text-white uppercase leading-tight mb-1">
                  {part.title}
                </h4>
                <p className="text-[11px] text-[#9B9BA8] font-body leading-snug">
                  {part.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Bottom Telemetry Ticker ── */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 sm:px-8 pb-6 sm:pb-8 shrink-0">
          <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#8E8E9F]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6A2B] animate-ping" />
              <span className="text-white font-bold">TELEMETRY SYNC</span>
              <span className="text-[#8E8E9F]">— INVERTER FREQ. 24.8 KHz</span>
            </div>
            <div className="flex items-center gap-4">
              <span>TORQUE SPLIT: 40% F / 60% R</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span>REGEN: 0.4g HARVEST ACTIVE</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="text-[#FF6A2B] font-bold">η 97.4%</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EngineSection;
