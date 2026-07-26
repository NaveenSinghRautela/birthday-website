import { useEffect, useRef } from 'react';

/**
 * Full-viewport animated backdrop:
 *  - a deep purple gradient base
 *  - two soft, slowly drifting blurred glow blobs (pure CSS, cheap)
 *  - a canvas starfield with gentle twinkle, redrawn on an
 *    animation frame loop rather than per-star DOM nodes so it
 *    stays smooth with a few hundred points.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const STAR_COUNT = Math.min(220, Math.floor((width * height) / 6000));
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.015 + 0.005,
    }));

    let rafId: number;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        const twinkle = prefersReducedMotion ? 0.8 : 0.55 + 0.45 * Math.sin(t * s.speed + s.phase);
        ctx.globalAlpha = twinkle;
        ctx.fillStyle = '#e9d8ff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!prefersReducedMotion) rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-void-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1b1333_0%,_#0a0714_60%)]" />

      <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-aura-600/30 blur-[110px] animate-drift" />
      <div
        className="absolute bottom-[-140px] right-[-80px] h-[480px] w-[480px] rounded-full bg-blush-500/20 blur-[120px] animate-drift"
        style={{ animationDirection: 'alternate-reverse', animationDuration: '22s' }}
      />
      <div className="absolute top-1/3 right-1/4 h-[280px] w-[280px] rounded-full bg-aura-500/20 blur-[100px] animate-pulseGlow" />

      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
    </div>
  );
}
