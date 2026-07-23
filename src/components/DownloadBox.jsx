"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardPaste, Download, AlertCircle, X, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { fetchVideoInfo, isValidTikTokUrl } from "@/lib/api";
import Loading from "./Loading";

export default function DownloadBox({ onResult }) {
  const [url,     setUrl]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [focused, setFocused] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text.trim());
      setError("");
    } catch {
      setError("Clipboard access denied. Please paste manually.");
    }
  };

  const handleClear  = () => { setUrl(""); setError(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const trimmed = url.trim();
    if (!trimmed) { setError("Please enter a TikTok URL."); return; }
    if (!isValidTikTokUrl(trimmed)) {
      setError("Invalid TikTok URL. Example: https://www.tiktok.com/@user/video/123");
      return;
    }
    setLoading(true);
    try {
      const result = await fetchVideoInfo(trimmed);
      onResult?.(result);
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Failed to fetch video. Please try again.";
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !url.trim();

  return (
    <div className="w-full">
      {/* ── Outer depth wrapper ── */}
      <div
        className="relative rounded-2xl transition-all duration-400"
        style={{
          /* Fake 3D layered shadow */
          boxShadow: focused
            ? "0 0 0 1px rgba(254,44,85,0.4), 0 0 0 4px rgba(254,44,85,0.08), 0 0 32px rgba(254,44,85,0.15), 0 0 64px rgba(37,244,238,0.06), 0 20px 40px rgba(0,0,0,0.5)"
            : "0 1px 2px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.35), 0 16px 32px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        {/* Bevel top-light */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          style={{
            background: "linear-gradient(160deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.01) 35%, transparent 55%)",
          }}
        />

        {/* Glass card */}
        <div className="glass-strong rounded-2xl overflow-hidden relative">
          <form onSubmit={handleSubmit} noValidate>

            {/* Input row */}
            <div className="flex items-center gap-2 px-4 py-1">
              <Sparkles size={13} className="text-[#2A2A2E] flex-shrink-0" aria-hidden="true" />

              <input
                type="url"
                value={url}
                onChange={(e) => { setUrl(e.target.value); setError(""); }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Paste TikTok URL here..."
                disabled={loading}
                aria-label="TikTok video URL"
                aria-describedby={error ? "url-error" : undefined}
                className="flex-1 bg-transparent py-4 text-sm sm:text-base text-white placeholder-[#2A2A2E] outline-none disabled:opacity-50 min-w-0"
              />

              <AnimatePresence>
                {url && !loading && (
                  <motion.button
                    key="clear"
                    type="button"
                    onClick={handleClear}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.12 }}
                    className="p-1.5 text-[#3F3F46] hover:text-[#A1A1AA] rounded-md transition-colors flex-shrink-0"
                    aria-label="Clear input"
                  >
                    <X size={14} />
                  </motion.button>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={handlePaste}
                disabled={loading}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#71717A] hover:text-white border border-white/8 hover:border-white/14 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200 flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed focus-ring"
                aria-label="Paste from clipboard"
              >
                <ClipboardPaste size={12} />
                Paste
              </button>
            </div>

            {/* Hairline divider */}
            <div
              aria-hidden="true"
              className="h-px mx-4"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
            />

            {/* Download button */}
            <div className="p-2">
              <motion.button
                type="submit"
                disabled={isDisabled}
                whileHover={!isDisabled ? { scale: 1.008, y: -1 } : {}}
                whileTap={!isDisabled  ? { scale: 0.992, y: 1  } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="btn-gradient w-full py-3.5 rounded-xl text-sm sm:text-base font-semibold text-white tracking-wide flex items-center justify-center gap-2 focus-ring relative overflow-hidden shimmer-wrap"
                aria-label="Download video"
                style={{
                  /* Extra depth on button */
                  boxShadow: isDisabled
                    ? "none"
                    : "0 1px 0 rgba(255,255,255,0.12) inset, 0 -1px 0 rgba(0,0,0,0.3) inset, 0 4px 12px rgba(254,44,85,0.3)",
                }}
              >
                {loading ? (
                  <>
                    <motion.span
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    <Download size={15} />
                    Download Free
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>

        {/* Bottom edge shadow */}
        <div
          aria-hidden="true"
          className="absolute -bottom-1 left-[8%] right-[8%] h-3 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)",
            filter: "blur(4px)",
          }}
        />
      </div>

      {/* Loading */}
      <AnimatePresence>
        {loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            key="error"
            id="url-error"
            role="alert"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2 mt-3 px-1 text-sm text-red-400"
          >
            <AlertCircle size={13} className="flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
