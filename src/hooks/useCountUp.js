import { useState, useEffect, useRef } from 'react';

/**
 * Counts up a number from start to end when triggered or on viewport entry.
 * @param {number} end - Target value to count up to
 * @param {number} duration - Animation duration in ms (default 2000)
 * @param {number} decimals - Number of decimal places
 * @param {boolean} trigger - Whether counting should run
 */
export function useCountUp(end, duration = 2000, decimals = 0, trigger = true) {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!trigger) {
      setCount(0);
      return;
    }

    let isMounted = true;
    startTimeRef.current = null;

    const animate = (currentTime) => {
      if (!startTimeRef.current) startTimeRef.current = currentTime;
      const progress = Math.min((currentTime - startTimeRef.current) / duration, 1);

      // Ease out expo for natural deceleration: 1 - Math.pow(2, -10 * progress)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = easeProgress * end;

      if (isMounted) {
        setCount(parseFloat(currentVal.toFixed(decimals)));
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else if (isMounted) {
        setCount(end);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      isMounted = false;
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration, decimals, trigger]);

  return count;
}

export default useCountUp;

