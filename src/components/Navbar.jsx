"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Menu, Zap } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features", type: "anchor" },
  { label: "FAQ",      href: "#faq",      type: "anchor" },
  { label: "Contact",  href: "/contact",  type: "page" },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /** Smooth-scroll to an anchor; if not on home page, navigate home first */
  const handleAnchor = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace("#", "");

    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLink = (e, link) => {
    if (link.type === "anchor") {
      handleAnchor(e, link.href);
    } else {
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#09090B]/80 backdrop-blur-xl border-b border-[#27272A]/60 shadow-[0_1px_0_rgba(255,255,255,0.04)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/#home"
            onClick={(e) => handleAnchor(e, "#home")}
            className="flex items-center gap-2 group focus-ring rounded-md"
            aria-label="SnapDin home"
          >
            <div className="w-7 h-7 rounded-lg btn-gradient flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Zap size={14} className="text-white fill-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Snap<span className="gradient-text">Din</span>
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleLink(e, link)}
                  className="px-3 py-1.5 text-sm text-[#A1A1AA] hover:text-white rounded-md transition-colors duration-200 focus-ring"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="https://saweria.co/snapdin"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium text-white border border-[#27272A] rounded-lg hover:border-[#3F3F46] hover:bg-[#111111] transition-all duration-200 focus-ring"
              aria-label="Dukung SnapDin"
            >
              <Coffee size={15} />
              Saweria
            </a>

            {/* Mobile menu toggle — Menu icon only, no X */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-[#111111] transition-colors focus-ring"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-16 inset-x-0 z-40 md:hidden bg-[#09090B]/95 backdrop-blur-xl border-b border-[#27272A]"
          >
            <ul className="flex flex-col px-4 py-4 gap-1" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLink(e, link)}
                    className="block px-4 py-3 text-sm font-medium text-[#A1A1AA] hover:text-white hover:bg-[#111111] rounded-lg transition-colors focus-ring"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-[#27272A] mt-2">
                <a
                  href="https://saweria.co/snapdin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-white hover:bg-[#111111] rounded-lg transition-colors focus-ring"
                >
                  <Coffee size={16} />
                  Dukung SnapDin ☕
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
