import { useState, useEffect } from 'react';

/**
 * Hook to detect if user has requested reduced motion in their OS settings.
 * @returns {boolean} true if reduced motion is preferred
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', onChange);
    } else {
      mediaQueryList.addListener(onChange);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', onChange);
      } else {
        mediaQueryList.removeListener(onChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}

export default useReducedMotion;

