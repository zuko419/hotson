import React from 'react';
import { ArrowRight, Compass, Sparkles, Feather } from 'lucide-react';
import Button from './ui/Button';

export const StoryInterior = ({ onBookDriveClick }) => {
  const stories = [
    {
      id: 'change',
      eyebrow: 'SUSTAINABILITY & PHILOSOPHY',
      title: 'PEOPLE DRIVE CHANGE',
      subtitle: 'Circular architecture designed with generational permanence.',
      description:
        'Every square centimeter is responsibly curated. From ocean-reclaimed polyamide carpets to carbon-neutral vegan bio-composites, luxury is redefined through radical ecological stewardship.',
      image:
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
      ctaText: 'Explore Circular Craft',
      icon: Feather,
    },
    {
      id: 'human-drive',
      eyebrow: 'SANCTUARY & INTERIOR COCKPIT',
      title: 'A MORE HUMAN DRIVE',
      subtitle: 'Intuitive ergonomics that calm the senses and heighten the soul.',
      description:
        'A cocoon of acoustic serenity. Featuring active road-noise cancellation, hand-machined knurled aluminum rotary controls, and natural circadian ambient illumination that harmonizes with your journey.',
      image:
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=85',
      ctaText: 'Step Inside Sanctuary',
      icon: Sparkles,
    },
  ];

  return (
    <section id="stories" className="relative bg-[#0A0A0C] py-24 sm:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-0 w-96 h-96 bg-[#FF6A2B]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-0 w-96 h-96 bg-white/[0.03] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <Compass className="w-3.5 h-3.5 text-[#FF6A2B]" />
            <span className="text-[11px] font-mono tracking-eyebrow uppercase text-[#E0E0E6]">
              THE HUMAN COMPASS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-white max-w-2xl">
            WHERE INTELLECT MEETS{' '}
            <span className="text-[#FF6A2B]">INTUITION.</span>
          </h2>

          <p className="max-w-xl text-sm sm:text-base text-[#9B9BA8] font-body">
            We reject technology for its own sake. In a HOTSON cockpit, engineering serves intimacy, quietude, and visceral human connection.
          </p>
        </div>

        {/* Two Side-By-Side Editorial Image Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {stories.map((story) => {
            const IconComponent = story.icon;
            return (
              <div
                key={story.id}
                data-cursor="hover"
                className="group relative h-[480px] sm:h-[560px] rounded-3xl overflow-hidden border border-white/[0.1] bg-[#15151A] flex flex-col justify-end p-8 sm:p-10 transition-all duration-500 hover:border-[#FF6A2B]/50 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              >
                {/* Background Image with Zoom on Hover */}
                <img
                  src={story.image}
                  alt={story.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-108"
                  loading="lazy"
                />

                {/* Dark Vignette and Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/75 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6A2B]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col items-start space-y-4">
                  {/* Eyebrow */}
                  <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#FF6A2B] uppercase">
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{story.eyebrow}</span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-2xl sm:text-4xl font-heading font-black uppercase text-white tracking-tight group-hover:text-white transition-colors">
                    {story.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm font-semibold text-[#E0E0E6]">
                    {story.subtitle}
                  </p>

                  {/* Body description */}
                  <p className="text-xs sm:text-sm text-[#9B9BA8] font-body leading-relaxed max-w-lg">
                    {story.description}
                  </p>

                  {/* CTA button */}
                  <div className="pt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={onBookDriveClick}
                      aria-label={`${story.ctaText} - ${story.title}`}
                    >
                      {story.ctaText}
                    </Button>
                  </div>
                </div>

                {/* Corner Rim Line */}
                <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-white/20 group-hover:border-[#FF6A2B] transition-colors duration-500 rounded-tr-xl pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StoryInterior;

