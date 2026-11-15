import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Custom cursor with a crisp orange focal point and an elastic trailing ring.
 * Expands dynamically over clickable/interactive elements with data-cursor="hover".
 * Automatically disables on touch or pointer: coarse devices.
 */
export const CustomCursor = () => {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Only enable if user prefers fine pointer and motion is allowed
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer || prefersReduced) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if current target or ancestor has hover trigger
      const target = e.target;
      const isInteractive = Boolean(
        target.closest('[data-cursor="hover"]') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('[role="button"]')
      );
      setIsHovered(isInteractive);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Animation loop with smooth lerp for the outer ring
    const render = () => {
      // Lerp ring towards mouse
      const lerpFactor = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [prefersReduced, isVisible]);

  if (!enabled) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Central crisp orange dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 -ml-[5px] -mt-[5px] bg-[#FF6A2B] rounded-full pointer-events-none shadow-[0_0_12px_#FF6A2B] will-change-transform"
      />

      {/* Trailing smoothing ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border pointer-events-none transition-all duration-200 ease-out will-change-transform ${
          isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 border-[#FF6A2B] bg-[#FF6A2B]/10 scale-110 shadow-[0_0_20px_rgba(255,106,43,0.3)]'
            : isClicking
            ? 'w-7 h-7 -ml-3.5 -mt-3.5 border-[#FF6A2B] scale-90'
            : 'w-9 h-9 -ml-4.5 -mt-4.5 border-white/35 scale-100'
        }`}
      />
    </div>
  );
};

export default CustomCursor;

