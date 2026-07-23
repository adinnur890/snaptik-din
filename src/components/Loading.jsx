"use client";

import { motion } from "framer-motion";

/** Animated loading spinner with optional label */
export default function Loading({ label = "Fetching video info..." }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-4 py-8"
      role="status"
      aria-label={label}
    >
      {/* Spinner rings */}
      <div className="relative w-12 h-12">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#FE2C55]"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        />
        <motion.span
          className="absolute inset-1 rounded-full border-2 border-transparent border-t-[#25F4EE]"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />
        {/* Center dot */}
        <motion.span
          className="absolute inset-[14px] rounded-full bg-gradient-to-br from-[#FE2C55] to-[#25F4EE]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <p className="text-sm text-[#A1A1AA] tracking-wide">{label}</p>
    </motion.div>
  );
}
