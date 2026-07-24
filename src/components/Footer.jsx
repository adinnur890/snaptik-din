"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, GitFork, ArrowUp } from "lucide-react";

/* ── Nav data ──────────────────────────────────────────────── */
const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Features",     href: "#features", type: "anchor" },
      { label: "How It Works", href: "#features", type: "anchor" },
      { label: "FAQ",          href: "#faq",      type: "anchor" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy", type: "page" },
      { label: "Terms of Use",   href: "/terms",   type: "page" },
      { label: "DMCA",           href: "/dmca",    type: "page" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Contact", href: "/contact",                    type: "page" },
      { label: "GitHub",  href: "https://github.com/adinnur890", type: "external" },
    ],
  },
];

/* ── Animated link ─────────────────────────────────────────── */
function FooterLink({ link, onClick }) {
  const base =
    "relative inline-flex items-center gap-1.5 text-sm text-[#71717A] hover:text-white transition-colors duration-200 group focus-visible:outline-none focus-visible:text-white";

  const inner = (
    <>
      {link.label}
      <span className="absolute -bottom-px left-0 h-px w-0 bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] group-hover:w-full transition-all duration-300" />
    </>
  );

  if (link.type === "external") {
    return (
      <motion.a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -1 }}
        transition={{ duration: 0.15 }}
        className={base}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.a
      href={link.href}
      onClick={(e) => onClick?.(e, link)}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.15 }}
      className={base}
    >
      {inner}
    </motion.a>
  );
}

/* ── Back to Top button ────────────────────────────────────── */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () =>
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full glass border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] shadow-lg transition-colors duration-200"
        >
          <ArrowUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ── Footer ────────────────────────────────────────────────── */
export default function Footer() {
  const router   = useRouter();
  const pathname = usePathname();

  const handleLink = (e, link) => {
    if (link.type !== "anchor") return;
    e.preventDefault();
    const id = link.href.replace("#", "");
    if (pathname !== "/") {
      router.push(`/${link.href}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <BackToTop />

      <footer className="relative border-t border-[#27272A]/60 bg-[#09090B] overflow-hidden">
        {/* Subtle ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[#FE2C55]/4 blur-[80px]"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* ── Main grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16">

            {/* Column 1 — Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <motion.a
                href="/#home"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 mb-5 w-fit group"
                aria-label="SnapDin home"
              >
                <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center shadow-lg group-hover:shadow-[0_0_16px_rgba(254,44,85,0.4)] transition-shadow">
                  <Zap size={15} className="text-white fill-white" />
                </div>
                <span className="text-lg font-bold tracking-tight">
                  Snap<span className="gradient-text">Din</span>
                </span>
              </motion.a>

              <p className="text-sm text-[#71717A] leading-relaxed mb-6 max-w-[220px]">
                Download video TikTok tanpa watermark, gratis dan tanpa perlu login.
              </p>

              {/* GitHub social icon */}
              <motion.a
                href="https://github.com/adinnur890"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                whileHover={{ scale: 1.1, y: -1 }}
                transition={{ duration: 0.15 }}
                className="inline-flex w-9 h-9 rounded-lg border border-[#27272A] items-center justify-center text-[#71717A] hover:text-white hover:border-[#3F3F46] hover:bg-[#111111] transition-colors duration-200"
              >
                <GitFork size={15} />
              </motion.a>
            </div>

            {/* Columns 2-4 — Links */}
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#3F3F46] mb-5">
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-3.5" role="list">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink link={link} onClick={handleLink} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Bottom bar ── */}
          <div className="border-t border-[#27272A]/60 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[#3F3F46] text-center sm:text-left">
              © 2026 SnapDin. Built with Next.js by{" "}
              <a
                href="https://github.com/adinnur890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#52525B] hover:text-[#A1A1AA] transition-colors"
              >
                Din Developer
              </a>
              .
            </p>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#27272A] bg-[#111111] text-[10px] font-mono text-[#52525B]">
              v1.0.0
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
