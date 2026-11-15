import React, { useRef, useState, useEffect } from 'react';
import { Zap, Compass, Activity, BatteryCharging, Timer } from 'lucide-react';
import { statsData } from '../data/stats';
import { useCountUp } from '../hooks/useCountUp';

// Icon mapper for lucide-react icons
const iconMap = {
  Zap,
  Compass,
  Activity,
  BatteryCharging,
  Timer,
};

const StatItem = ({ item, isTriggered }) => {
  const IconComponent = iconMap[item.icon] || Zap;
  const countedValue = useCountUp(
    item.value,
    1800,
    item.decimals || 0,
    isTriggered
  );

  return (
    <div
      data-cursor="hover"
      className="flex flex-col items-center sm:items-start text-center sm:text-left px-4 py-4 group transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg bg-[#FF6A2B]/10 text-[#FF6A2B] group-hover:bg-[#FF6A2B] group-hover:text-white transition-colors duration-300">
          <IconComponent className="w-4 h-4 stroke-[2.2]" />
        </div>
        <span className="text-[11px] font-mono tracking-eyebrow uppercase text-[#8E8E9F] group-hover:text-white transition-colors">
          {item.label}
        </span>
      </div>

      <div className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-white flex items-baseline">
        <span>{countedValue}</span>
        <span className="text-[#FF6A2B] text-2xl sm:text-3xl font-bold ml-0.5">
          {item.suffix}
        </span>
      </div>

      <p className="text-xs text-[#8E8E9F] mt-1 font-body">
        {item.sublabel}
      </p>
    </div>
  );
};

export const StatsBar = () => {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="stats"
      ref={containerRef}
      className="relative z-20 border-y border-white/[0.08] bg-[#15151A]/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
          {statsData.map((item) => (
            <StatItem key={item.id} item={item} isTriggered={isInView} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;

