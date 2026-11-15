import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * High-performance interactive particle & ambient glow background.
 * Uses requestAnimationFrame with direct Canvas 2D manipulation (no per-frame React state).
 * Particles react to mouse cursor with soft repulsive drift, and to scroll velocity.
 * Capped at 120 particles on desktop, 40 on mobile; respects visibilityState & prefers-reduced-motion.
 */
export const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let isTabVisible = true;

    // Detect screen size and cap particles
    const isMobile = window.innerWidth < 768;
    const maxParticles = isMobile ? 40 : 110;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);
    ctx.scale(dpr, dpr);

    // Mouse coordinates tracked via ref
    const mouse = {
      x: -1000,
      y: -1000,
      radius: isMobile ? 90 : 150,
      smoothX: -1000,
      smoothY: -1000,
    };

    // Scroll state tracking
    let scrollY = window.scrollY;
    let scrollVelocity = 0;
    let lastScrollY = scrollY;

    const handleScroll = () => {
      scrollY = window.scrollY;
      scrollVelocity = Math.min(Math.abs(scrollY - lastScrollY) * 0.05, 5);
      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle mouse move
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    // Visibility change (pause loop when tab inactive)
    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Particle entity structure
    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * (width / dpr);
        this.y = init ? Math.random() * (height / dpr) : (height / dpr) + 10;
        this.baseSize = Math.random() * 2 + 1;
        this.size = this.baseSize;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = -(Math.random() * 0.6 + 0.2); // upward drift
        this.alpha = Math.random() * 0.4 + 0.2;
        this.hue = Math.random() > 0.3 ? '#FF6A2B' : '#FFA25B'; // Orange variations
        this.driftAngle = Math.random() * Math.PI * 2;
      }

      update() {
        // Natural subtle organic drift
        this.driftAngle += 0.02;
        this.x += this.speedX + Math.sin(this.driftAngle) * 0.25;
        this.y += this.speedY - scrollVelocity * 0.4;

        // Repulsive force from mouse cursor
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          const forceDirectionX = dx / dist;
          const forceDirectionY = dy / dist;
          this.x += forceDirectionX * force * 3.5;
          this.y += forceDirectionY * force * 3.5;
          this.size = this.baseSize * (1 + force * 0.8);
        } else {
          this.size = this.baseSize;
        }

        // Wrap around screen boundaries
        if (this.y < -20) {
          this.y = (height / dpr) + 10;
          this.x = Math.random() * (width / dpr);
        }
        if (this.x < -20) this.x = (width / dpr) + 10;
        if (this.x > (width / dpr) + 20) this.x = -10;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.hue;
        ctx.globalAlpha = this.alpha;
        ctx.shadowColor = '#FF6A2B';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Initialize particle pool
    const particles = [];
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    // Main animation loop
    const render = () => {
      if (isTabVisible) {
        ctx.clearRect(0, 0, width / dpr, height / dpr);

        // Smooth mouse follower coordinates
        mouse.smoothX += (mouse.x - mouse.smoothX) * 0.1;
        mouse.smoothY += (mouse.y - mouse.smoothY) * 0.1;

        // Draw soft ambient orange glow around mouse cursor
        if (mouse.smoothX > -100 && mouse.smoothX < (width / dpr) + 100) {
          const glowRadius = isMobile ? 180 : 320;
          const gradient = ctx.createRadialGradient(
            mouse.smoothX,
            mouse.smoothY,
            0,
            mouse.smoothX,
            mouse.smoothY,
            glowRadius
          );
          gradient.addColorStop(0, 'rgba(255, 106, 43, 0.14)');
          gradient.addColorStop(0.5, 'rgba(255, 106, 43, 0.04)');
          gradient.addColorStop(1, 'rgba(255, 106, 43, 0)');

          ctx.globalAlpha = 1;
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(mouse.smoothX, mouse.smoothY, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Decay scroll velocity
        scrollVelocity *= 0.92;

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [prefersReduced]);

  if (prefersReduced) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-[#0A0A0C]"
        aria-hidden="true"
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full will-change-transform"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
};

export default InteractiveBackground;

