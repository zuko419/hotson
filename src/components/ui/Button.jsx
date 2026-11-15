import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Reusable Pill Button component adhering to HOTSON design tokens.
 * Features hover arrow translation, primary pulse glow, and keyboard accessibility.
 */
export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'white' | 'ghost' | 'outline'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon = true,
  iconComponent: IconComponent = ArrowRight,
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
  ...props
}) => {
  const baseClasses =
    'group relative inline-flex items-center justify-center font-medium uppercase tracking-wide transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0C] disabled:opacity-50 disabled:pointer-events-none select-none';

  const sizeClasses = {
    sm: 'text-xs px-5 py-2.5 gap-2',
    md: 'text-xs sm:text-sm px-6 py-3.5 gap-2.5',
    lg: 'text-sm sm:text-base px-8 py-4 gap-3',
  };

  const variantClasses = {
    primary:
      'bg-[#FF6A2B] text-white hover:bg-[#FF8045] shadow-[0_4px_24px_-4px_rgba(255,106,43,0.5)] hover:shadow-[0_6px_30px_0px_rgba(255,106,43,0.7)] active:scale-[0.98]',
    secondary:
      'bg-transparent border border-white/20 text-white hover:border-[#FF6A2B] hover:text-[#FF6A2B] hover:bg-white/[0.04] backdrop-blur-sm active:scale-[0.98]',
    outline:
      'border border-[#FF6A2B] text-[#FF6A2B] hover:bg-[#FF6A2B] hover:text-white transition-colors duration-300',
    white:
      'bg-[#F3EEE6] text-[#0A0A0C] hover:bg-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_30px_rgba(255,106,43,0.3)] active:scale-[0.98]',
    creamDark:
      'bg-[#0A0A0C] text-[#F3EEE6] hover:bg-[#1A1A22] border border-black/10 active:scale-[0.98]',
    ghost:
      'bg-transparent text-[#9B9BA8] hover:text-white hover:bg-white/5',
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}
      onClick={onClick}
      type={href ? undefined : type}
      disabled={disabled}
      aria-label={ariaLabel}
      data-cursor="hover"
      className={`${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${className}`}
      {...props}
    >
      <span className="relative z-10 font-semibold tracking-wider">{children}</span>

      {icon && (
        <span className="relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-1.5 flex items-center">
          <IconComponent className="w-4 h-4 stroke-[2.2]" />
        </span>
      )}

      {/* Subtle breathing rim glow on primary buttons */}
      {variant === 'primary' && (
        <span
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/15 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </Component>
  );
};

export default Button;

