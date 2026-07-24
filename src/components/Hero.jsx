"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Zap, Shield, Globe, Film } from "lucide-react";
import DownloadBox from "./DownloadBox";
import ResultCard from "./ResultCard";
import FakeOrb from "./FakeOrb";

/* ── Feature badges ────────────────────────────────────────── */
const BADGES = [
  { icon: <Zap size={11} />,    label: "Cepat",         color: "#FE2C55" },
  { icon: <Shield size={11} />, label: "Tanpa Login",   color: "#25F4EE" },
  { icon: <Globe size={11} />,  label: "Gratis",        color: "#a78bfa" },
  { icon: <Film size={11} />,   label: "HD",            color: "#34d399" },
];

const STATS = [
  { value: "HD",   label: "Kualitas" },
  { value: "0",    label: "Watermark" },
  { value: "Free", label: "Selamanya" },
];

/* ── Tilt card — mouse parallax, desktop only ──────────────── */
function TiltCard({ children }) {
  const ref  = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  /* Spring smoothing */
  const rotX = useSpring(useTransform(rawY, [-0.5, 0.5], [5, -5]),  { stiffness: 280, damping: 28 });
  const rotY = useSpring(useTransform(rawX, [-0.5, 0.5], [-5, 5]),  { stiffness: 280, damping: 28 });
  const glowX = useTransform(rawX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(rawY, [-0.5, 0.5], ["0%", "100%"]);

  const onMove = useCallback((e) => {
    /* Skip on touch / mobile */
    if (window.matchMedia("(max-width: 767px)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
  }, [rawX, rawY]);

  const onLeave = useCallback(() => { rawX.set(0); rawY.set(0); }, [rawX, rawY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className="scene w-full"
    >
      {/* Dynamic specular highlight */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-0 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.06) 0%, transparent 60%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
}

/* ── Animated scan line ────────────────────────────────────── */
function ScanLine() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#25F4EE]/20 to-transparent"
        animate={{ y: ["-2%", "102%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatDelay: 6 }}
      />
    </div>
  );
}

/* ── Main ──────────────────────────────────────────────────── */
export default function Hero() {
  const [result, setResult] = useState(null);

  return (
    <section id="home" className="relative min-h-screen mesh-bg overflow-hidden">

      {/* ── Background layers ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-overlay" />
        {/* Radial vignette */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 35%, #09090B 100%)" }}
        />
        <ScanLine />
      </div>

      {/* ── Content ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-4 items-center min-h-[calc(100vh-6rem)]">

          {/* ══ LEFT ══ */}
          <div className="flex flex-col justify-center order-2 lg:order-1 py-8 lg:py-0">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mb-5"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium glass border border-white/8 text-[#A1A1AA] animate-badge">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25F4EE] animate-pulse flex-shrink-0" />
                Gratis · Tanpa akun · Tanpa watermark
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-[2.5rem] sm:text-5xl lg:text-[3.2rem] xl:text-[3.8rem] font-bold tracking-tight leading-[1.08] mb-5"
            >
              Download TikTok
              <br />
              <span className="relative inline-block">
                <span className="gradient-text animate-gradient bg-gradient-to-r from-[#FE2C55] via-[#ff6b8a] to-[#25F4EE]">
                  Tanpa Watermark
                </span>
                {/* Glow underline */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, rgba(254,44,85,0.5), rgba(37,244,238,0.35), transparent)" }}
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#71717A] text-base sm:text-lg leading-relaxed mb-8 max-w-md"
            >
              Simpel, cepat, dan gratis. Paste link TikTok kamu dan langsung download — tanpa ribet, tanpa iklan ganggu.
            </motion.p>

            {/* Download card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <TiltCard>
                <DownloadBox onResult={setResult} />
              </TiltCard>
            </motion.div>

            {/* Result card */}
            <AnimatePresence>
              {result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <ResultCard data={result} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Feature badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.48 }}
              className="flex flex-wrap gap-2 mt-6"
            >
              {BADGES.map(({ icon, label, color }, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.48 + i * 0.06, duration: 0.35 }}
                  whileHover={{ scale: 1.04, y: -1, transition: { duration: 0.15 } }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium glass border border-white/6 cursor-default select-none"
                  style={{ color }}
                >
                  {icon}
                  {label}
                </motion.span>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.62 }}
              className="flex items-center gap-7 mt-7 pt-6 border-t border-white/[0.05]"
            >
              {STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-xl font-bold gradient-text">{value}</span>
                  <span className="text-[11px] text-[#52525B] uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ══ RIGHT — Fake 3D Orb ══ */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center h-[340px] sm:h-[440px] lg:h-[580px]">
            {/* Ambient glow behind orb */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 65% 65% at 50% 50%, rgba(254,44,85,0.06) 0%, rgba(37,244,238,0.04) 45%, transparent 70%)",
              }}
            />
            <FakeOrb />
          </div>
        </div>

        {/* Scroll hint */}
        {!result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="flex flex-col items-center gap-1.5 text-[#3F3F46] pt-2 pb-4"
            aria-hidden="true"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={13} />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
