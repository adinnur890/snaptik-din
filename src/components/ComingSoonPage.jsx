"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";

export default function ComingSoonPage({ title, description, children }) {
  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col">
      {/* Ambient orbs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#FE2C55]/6 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#25F4EE]/5 blur-[100px]" />
      </div>

      <main className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-20 text-center">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-8 left-4 sm:left-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to SnapDin
          </Link>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-16 rounded-2xl btn-gradient flex items-center justify-center shadow-2xl mb-8 animate-glow"
        >
          {children}
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-5"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border border-[#27272A] bg-[#111111] text-[#A1A1AA]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FE2C55] animate-pulse" />
            Coming Soon
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#A1A1AA] text-base sm:text-lg max-w-md leading-relaxed mb-10"
        >
          {description}
        </motion.p>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-2xl px-8 py-6 max-w-sm w-full"
        >
          <p className="text-sm text-[#71717A] leading-relaxed">
            We&apos;re working on this page. Check back soon or{" "}
            <Link href="/contact" className="text-[#25F4EE] hover:text-white transition-colors">
              contact us
            </Link>{" "}
            if you have any questions.
          </p>
        </motion.div>
      </main>

      {/* Mini footer */}
      <footer className="relative border-t border-[#27272A]/60 py-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded-md btn-gradient flex items-center justify-center group-hover:scale-105 transition-transform">
              <Zap size={11} className="text-white fill-white" />
            </div>
            <span className="text-sm font-bold">
              Snap<span className="gradient-text">Din</span>
            </span>
          </Link>
          <p className="text-xs text-[#52525B]">
            © {new Date().getFullYear()} SnapDin. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
