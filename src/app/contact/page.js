"use client";

import { motion } from "framer-motion";
import { ArrowLeft, GitFork, Mail, MessageCircle, Send, ExternalLink, Zap } from "lucide-react";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const CONTACTS = [
  {
    icon:    <GitFork size={22} />,
    label:   "GitHub",
    value:   "github.com/adinnur890",
    href:    "https://github.com/adinnur890",
    color:   "#ffffff",
    bg:      "rgba(255,255,255,0.06)",
    border:  "rgba(255,255,255,0.1)",
    external: true,
    cta:     "Open GitHub",
  },
  {
    icon:    <Mail size={22} />,
    label:   "Email",
    value:   "Coming Soon",
    href:    null,
    color:   "#25F4EE",
    bg:      "rgba(37,244,238,0.06)",
    border:  "rgba(37,244,238,0.15)",
    external: false,
    cta:     "Coming Soon",
    disabled: true,
  },
  {
    icon:    <MessageCircle size={22} />,
    label:   "Discord",
    value:   "Coming Soon",
    href:    null,
    color:   "#a78bfa",
    bg:      "rgba(167,139,250,0.06)",
    border:  "rgba(167,139,250,0.15)",
    external: false,
    cta:     "Coming Soon",
    disabled: true,
  },
  {
    icon:    <Send size={22} />,
    label:   "Telegram",
    value:   "Coming Soon",
    href:    null,
    color:   "#38bdf8",
    bg:      "rgba(56,189,248,0.06)",
    border:  "rgba(56,189,248,0.15)",
    external: false,
    cta:     "Coming Soon",
    disabled: true,
  },
];

function ContactCard({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={!card.disabled ? { y: -4, transition: { duration: 0.2 } } : {}}
      className="relative group p-6 rounded-2xl border bg-[#111111] overflow-hidden transition-colors duration-300"
      style={{ borderColor: card.border }}
    >
      {/* Hover glow */}
      {!card.disabled && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{ background: `radial-gradient(circle at 50% 0%, ${card.bg} 0%, transparent 70%)` }}
          aria-hidden="true"
        />
      )}

      <div className="relative flex flex-col h-full gap-4">
        {/* Icon + label */}
        <div className="flex items-center justify-between">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: card.bg, color: card.color }}
          >
            {card.icon}
          </div>
          {card.disabled && (
            <span className="text-[10px] px-2 py-1 rounded-full border border-[#27272A] text-[#52525B] font-medium">
              Coming Soon
            </span>
          )}
        </div>

        {/* Text */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#52525B] mb-1">
            {card.label}
          </p>
          <p className="text-sm font-medium text-white">{card.value}</p>
        </div>

        {/* CTA */}
        {card.href ? (
          <a
            href={card.href}
            target={card.external ? "_blank" : undefined}
            rel={card.external ? "noopener noreferrer" : undefined}
            className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
            style={{ color: card.color }}
          >
            {card.cta}
            <ExternalLink size={11} />
          </a>
        ) : (
          <span className="mt-auto text-xs text-[#3F3F46]">{card.cta}</span>
        )}
      </div>
    </motion.div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col">
      {/* Ambient orbs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#FE2C55]/6 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#25F4EE]/5 blur-[100px]" />
      </div>

      <main className="relative flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-20">
        {/* Back */}
        <motion.div {...fadeUp(0)}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to SnapDin
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div {...fadeUp(0.05)} className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border border-[#27272A] bg-[#111111]/80 text-[#A1A1AA] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25F4EE] animate-pulse" />
            Usually reply within 24h
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Get in <span className="gradient-text">touch</span>
          </h1>
          <p className="text-[#A1A1AA] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Have a question or found a bug? Reach out through any channel below.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {CONTACTS.map((card, i) => (
            <ContactCard key={card.label} card={card} index={i} />
          ))}
        </div>

        {/* Large GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-8 sm:p-10 text-center"
        >
          <div className="w-12 h-12 rounded-xl btn-gradient flex items-center justify-center mx-auto mb-5 shadow-lg">
            <GitFork size={22} className="text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Open source on GitHub
          </h2>
          <p className="text-[#A1A1AA] text-sm sm:text-base max-w-md mx-auto mb-7 leading-relaxed">
            Found a bug or want to contribute? Everything is open.
          </p>
          <a
            href="https://github.com/adinnur890"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white shadow-lg"
          >
            <GitFork size={16} />
            github.com/adinnur890
            <ExternalLink size={13} className="opacity-70" />
          </a>
        </motion.div>
      </main>

      {/* Mini footer */}
      <footer className="relative border-t border-[#27272A]/60 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded-md btn-gradient flex items-center justify-center group-hover:scale-105 transition-transform">
              <Zap size={11} className="text-white fill-white" />
            </div>
            <span className="text-sm font-bold">
              Snap<span className="gradient-text">Din</span>
            </span>
          </a>
          <p className="text-xs text-[#52525B]">
            © {new Date().getFullYear()} SnapDin. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
