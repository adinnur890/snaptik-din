"use client";

import { useEffect, useRef } from "react";

/* Canvas-based floating particles — zero dependencies beyond React */
export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = canvas.width  = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    let raf;

    const PINK = "rgba(254,44,85,";
    const CYAN = "rgba(37,244,238,";

    const particles = Array.from({ length: 55 }, () => ({
      x:    Math.random() * W,
      y:    Math.random() * H,
      r:    Math.random() * 1.6 + 0.4,
      vx:   (Math.random() - 0.5) * 0.25,
      vy:   -(Math.random() * 0.3 + 0.1),
      life: Math.random(),
      maxLife: Math.random() * 0.6 + 0.4,
      color: Math.random() > 0.5 ? PINK : CYAN,
    }));

    const reset = (p) => {
      p.x    = Math.random() * W;
      p.y    = H + 10;
      p.life = 0;
      p.maxLife = Math.random() * 0.6 + 0.4;
      p.vx   = (Math.random() - 0.5) * 0.25;
      p.vy   = -(Math.random() * 0.3 + 0.1);
      p.r    = Math.random() * 1.6 + 0.4;
      p.color = Math.random() > 0.5 ? PINK : CYAN;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.life += 0.003;
        p.x += p.vx;
        p.y += p.vy;
        if (p.life >= p.maxLife || p.y < -10) reset(p);

        const progress = p.life / p.maxLife;
        const alpha    = progress < 0.2
          ? progress / 0.2
          : progress > 0.8
            ? (1 - progress) / 0.2
            : 1;

        /* Glow */
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grd.addColorStop(0,   p.color + (alpha * 0.5) + ")");
        grd.addColorStop(1,   p.color + "0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        /* Core dot */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + alpha + ")";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
