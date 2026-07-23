"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Zap, Film, ShieldCheck, Globe } from "lucide-react";

/* ── Data ──────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon:  <Zap size={20} />,
    color: "#FE2C55",
    bg:    "rgba(254,44,85,0.08)",
    glow:  "rgba(254,44,85,0.12)",
    title: "Lightning Fast",
    desc:  "Download videos in seconds with our optimized pipeline. No waiting, no queues.",
  },
  {
    icon:  <Film size={20} />,
    color: "#25F4EE",
    bg:    "rgba(37,244,238,0.08)",
    glow:  "rgba(37,244,238,0.12)",
    title: "HD Quality",
    desc:  "Get the original video quality — up to 1080p HD — without any compression.",
  },
  {
    icon:  <ShieldCheck size={20} />,
    color: "#a78bfa",
    bg:    "rgba(167,139,250,0.08)",
    glow:  "rgba(167,139,250,0.12)",
    title: "100% Secure",
    desc:  "We never store your videos or personal data. Processed and discarded instantly.",
  },
  {
    icon:  <Globe size={20} />,
    color: "#34d399",
    bg:    "rgba(52,211,153,0.08)",
    glow:  "rgba(52,211,153,0.12)",
    title: "Unlimited",
    desc:  "No daily limits, no subscriptions, no sign-ups. Forever free.",
  },
];

const STEPS = [
  { step: "01", title: "Copy TikTok Link",  desc: "Open TikTok, find the video, tap Share → Copy Link." },
  { step: "02", title: "Paste the Link",    desc: "Paste the copied URL into the SnapDin input box." },
  { step: "03", title: "Download",          desc: "Choose your format and hit download. Done in seconds." },
];

/* ── 3D tilt feature card ──────────────────────────────────── */
function FeatureCard({ icon, color, bg, glow, title, desc, index }) {
  const ref  = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]),  { stiffness: 300, damping: 30 });
  const rotY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]),  { stiffness: 300, damping: 30 });
  const glowOpacity = useSpring(0, { stiffness: 200, damping: 25 });

  const onMove = useCallback((e) => {
    if (window.matchMedia("(max-width: 767px)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
    glowOpacity.set(1);
  }, [rawX, rawY, glowOpacity]);

  const onLeave = useCallback(() => {
    rawX.set(0); rawY.set(0); glowOpacity.set(0);
  }, [rawX, rawY, glowOpacity]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className="relative group rounded-2xl border border-[#27272A] bg-[#111111] p-6 overflow-hidden cursor-default"
    >
      {/* Bevel top-light */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: "linear-gradient(150deg, rgba(255,255,255,0.04) 0%, transparent 50%)" }}
      />

      {/* Hover radial glow */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${glow} 0%, transparent 65%)`,
          opacity: glowOpacity,
        }}
      />

      {/* Bottom edge depth */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${color}22, transparent)` }}
      />

      {/* Icon */}
      <div
        className="relative w-10 h-10 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
        style={{
          background: bg,
          color,
          boxShadow: `0 0 0 1px ${color}22, 0 4px 12px ${color}18`,
        }}
      >
        {icon}
      </div>

      <h3 className="relative text-[15px] font-semibold text-white mb-2">{title}</h3>
      <p className="relative text-sm text-[#71717A] leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ── Step item ─────────────────────────────────────────────── */
function StepItem({ step, title, desc, isLast, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-5"
    >
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Step number with fake 3D depth */}
        <div
          className="w-10 h-10 rounded-full btn-gradient flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{
            boxShadow: "0 1px 0 rgba(255,255,255,0.15) inset, 0 -1px 0 rgba(0,0,0,0.3) inset, 0 4px 16px rgba(254,44,85,0.3), 0 8px 24px rgba(0,0,0,0.3)",
          }}
        >
          {step}
        </div>
        {!isLast && (
          <div
            className="w-px flex-1 mt-3"
            style={{ background: "linear-gradient(to bottom, rgba(39,39,42,0.8), transparent)" }}
          />
        )}
      </div>
      <div className="pb-10">
        <h3 className="text-[15px] font-semibold text-white mb-1.5">{title}</h3>
        <p className="text-sm text-[#71717A] leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <>
      {/* ── Features ── */}
      <section id="features" className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#FE2C55] mb-3">
              Why SnapDin
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything you need,{" "}
              <span className="gradient-text">nothing you don't</span>
            </h2>
            <p className="text-[#71717A] max-w-xl mx-auto text-sm sm:text-base">
              Built for speed, privacy, and simplicity. No bloat, no ads, no nonsense.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ perspective: "1000px" }}>
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How To Use ── */}
      <section className="py-20 px-4 sm:px-6 border-t border-[#27272A]/40">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#25F4EE] mb-3">
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Three steps to{" "}
                <span className="gradient-text">your download</span>
              </h2>
              <p className="text-[#71717A] text-sm sm:text-base leading-relaxed">
                SnapDin makes downloading TikTok videos effortless. No technical
                knowledge required — just paste and download.
              </p>
            </motion.div>

            <div>
              {STEPS.map((s, i) => (
                <StepItem key={s.step} {...s} index={i} isLast={i === STEPS.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
