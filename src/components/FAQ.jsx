"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "Is SnapDin free to use?",
    a: "Yes, SnapDin is completely free. There are no hidden fees, no subscriptions, and no account required. Download as many TikTok videos as you want at no cost.",
  },
  {
    q: "Does it work on mobile devices?",
    a: "Absolutely. SnapDin is built mobile-first and works seamlessly on iOS, Android, and any modern browser. The interface adapts perfectly to any screen size.",
  },
  {
    q: "Can I download TikTok slideshows?",
    a: "Yes! SnapDin supports TikTok photo slideshows in addition to regular videos. You can download individual images or the full slideshow as a video.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account, no sign-up, no email required. Just paste the TikTok URL and download. We believe in zero-friction tools.",
  },
  {
    q: "What formats can I download?",
    a: "SnapDin supports HD video without watermark, video with watermark, MP3 audio extraction, and cover image (thumbnail) download.",
  },
  {
    q: "Is my data safe?",
    a: "We never store your videos, URLs, or any personal data. All processing happens in real-time and is discarded immediately after your download completes.",
  },
];

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="border-b border-[#27272A] last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group focus-ring rounded-sm"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base font-medium text-white group-hover:text-white/90 transition-colors">
          {q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex-shrink-0 w-6 h-6 rounded-full border border-[#27272A] flex items-center justify-center text-[#A1A1AA] group-hover:border-[#3F3F46] transition-colors"
        >
          <Plus size={13} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-[#A1A1AA] leading-relaxed pr-10">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i));

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 border-t border-[#27272A]/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#FE2C55] mb-3">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently asked{" "}
              <span className="gradient-text">questions</span>
            </h2>
            <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed mb-6">
              Can't find what you're looking for? Reach out to our support team.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-[#27272A] hover:border-[#3F3F46] hover:bg-[#111111] rounded-lg text-white transition-all duration-200 focus-ring"
            >
              Contact Support
            </a>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#111111] border border-[#27272A] rounded-2xl px-6"
          >
            {FAQS.map((item, i) => (
              <FAQItem
                key={i}
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
