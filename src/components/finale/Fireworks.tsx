import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
};

const COLORS = ['#f472b6', '#fbbf24', '#b794f6', '#5eead4', '#ffffff', '#ec4899'];

/**
 * Full-viewport canvas fireworks: periodic bursts at random x positions,
 * each a ring of particles with gravity + fade. Runs on rAF, respects
 * prefers-reduced-motion by skipping entirely (the rest of the finale
 * still reads fine without it).
 */
export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles: Particle[] = [];

    const burst = (x: number, y: number) => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const count = 34;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 2 + Math.random() * 3;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          life: 0,
          maxLife: 55 + Math.random() * 20,
        });
      }
    };

    let rafId: number;
    let frame = 0;

    const loop = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      if (frame % 70 === 0) {
        burst(width * (0.2 + Math.random() * 0.6), height * (0.2 + Math.random() * 0.35));
      }

      particles = particles.filter((p) => p.life < p.maxLife);
      for (const p of particles) {
        p.vy += 0.045; // gravity
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const alpha = 1 - p.life / p.maxLife;
        ctx.globalAlpha = Math.max(alpha, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

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

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" aria-hidden="true" />;
}
