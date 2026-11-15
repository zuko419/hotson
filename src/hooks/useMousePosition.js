import { useState, useEffect } from 'react';

/**
 * Tracks mouse position (pixel and normalized -1..1 coordinates)
 * with low-overhead direct ref updates and state.
 */
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    isTouch: false,
    isActive: false,
  });

  useEffect(() => {
    // Detect touch-only device
    const isTouchOnly = 'ontouchstart' in window && window.matchMedia('(pointer: coarse)').matches;
    if (isTouchOnly) {
      setMousePosition((prev) => ({ ...prev, isTouch: true }));
      return;
    }

    let frameId = null;
    let pendingX = 0;
    let pendingY = 0;

    const handleMouseMove = (event) => {
      pendingX = event.clientX;
      pendingY = event.clientY;

      if (!frameId) {
        frameId = requestAnimationFrame(() => {
          const width = window.innerWidth || 1;
          const height = window.innerHeight || 1;

          setMousePosition({
            x: pendingX,
            y: pendingY,
            normalizedX: (pendingX / width) * 2 - 1, // -1 to 1
            normalizedY: (pendingY / height) * 2 - 1, // -1 to 1
            isTouch: false,
            isActive: true,
          });
          frameId = null;
        });
      }
    };

    const handleMouseLeave = () => {
      setMousePosition((prev) => ({ ...prev, isActive: false }));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return mousePosition;
}

export default useMousePosition;

