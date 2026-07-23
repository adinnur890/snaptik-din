"use client";

import { motion } from "framer-motion";

/* ── Orbit ring ────────────────────────────────────────────── */
function Ring({ size, duration, reverse, color, delay = 0, tiltX = 0, tiltY = 0 }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 m-auto rounded-full"
      style={{
        width: size,
        height: size,
        transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${color}`,
          boxShadow: `0 0 8px ${color}, inset 0 0 8px ${color}`,
          animation: `${reverse ? "spin-reverse" : "spin-slow"} ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
        }}
      />
      {/* Dot on ring */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 6,
          height: 6,
          background: color,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
          animation: `${reverse ? "spin-reverse" : "spin-slow"} ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
}

/* ── Orbit particle ────────────────────────────────────────── */
function OrbitDot({ angle, radius, color, size = 4, duration, delay = 0 }) {
  const rad = (angle * Math.PI) / 180;
  const x   = Math.cos(rad) * radius;
  const y   = Math.sin(rad) * radius * 0.38; /* flatten for perspective */
  return (
    <motion.div
      aria-hidden="true"
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 3}px ${color}`,
        top:  "50%",
        left: "50%",
        marginTop:  -size / 2,
        marginLeft: -size / 2,
      }}
      animate={{
        x: [x, -x, x],
        y: [y, -y, y],
        opacity: [0.4, 1, 0.4],
        scale:   [0.8, 1.2, 0.8],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ── Main orb visual ───────────────────────────────────────── */
export default function FakeOrb() {
  const dots = [
    { angle: 0,   radius: 130, color: "#FE2C55", size: 5, duration: 6,   delay: 0 },
    { angle: 60,  radius: 120, color: "#25F4EE", size: 4, duration: 7,   delay: 0.8 },
    { angle: 120, radius: 140, color: "#FE2C55", size: 3, duration: 5.5, delay: 1.6 },
    { angle: 180, radius: 125, color: "#25F4EE", size: 5, duration: 6.5, delay: 0.4 },
    { angle: 240, radius: 135, color: "#a78bfa", size: 3, duration: 7.5, delay: 1.2 },
    { angle: 300, radius: 118, color: "#FE2C55", size: 4, duration: 5,   delay: 2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: "900px" }}
    >
      {/* Bloom glow behind everything */}
      <div
        aria-hidden="true"
        className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(254,44,85,0.18) 0%, rgba(37,244,238,0.08) 45%, transparent 70%)",
          filter: "blur(32px)",
          animation: "pulse-glow 4s ease-in-out infinite",
        }}
      />

      {/* Scene wrapper — floating */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
        style={{ width: 300, height: 300, transformStyle: "preserve-3d" }}
      >
        {/* Outer rings */}
        <Ring size={280} duration={10}  reverse={false} color="rgba(254,44,85,0.35)"  tiltX={72} tiltY={10} />
        <Ring size={240} duration={14}  reverse={true}  color="rgba(37,244,238,0.3)"  tiltX={60} tiltY={-15} delay={1} />
        <Ring size={200} duration={18}  reverse={false} color="rgba(167,139,250,0.2)" tiltX={80} tiltY={5}  delay={2} />

        {/* Core sphere */}
        <div
          className="absolute inset-0 m-auto orb animate-pulse-glow"
          style={{ width: 140, height: 140 }}
        />

        {/* Inner highlight */}
        <div
          aria-hidden="true"
          className="absolute inset-0 m-auto rounded-full pointer-events-none"
          style={{
            width: 140,
            height: 140,
            background: "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.18) 0%, transparent 55%)",
          }}
        />

        {/* Orbit dots */}
        {dots.map((d, i) => <OrbitDot key={i} {...d} />)}

        {/* Ground shadow */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 pointer-events-none"
          style={{
            width: 120,
            height: 20,
            background: "radial-gradient(ellipse, rgba(254,44,85,0.25) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>

      {/* Floating label */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <span className="glass-strong px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-widest uppercase text-[#52525B] border border-white/5">
          SnapDin Engine
        </span>
      </motion.div>
    </motion.div>
  );
}
