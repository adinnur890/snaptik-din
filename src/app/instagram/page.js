"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardPaste, Download, AlertCircle, X, Camera, ArrowLeft } from "lucide-react";
import { mapInstagramToUiShape } from "@/lib/api";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResultCard from "@/components/ResultCard";
import Loading from "@/components/Loading";

function isValidInstagramUrl(url) {
  return /^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)\//i.test(url.trim());
}

async function fetchInstagramInfo(url) {
  const res = await fetch("/api/instagram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Gagal mengambil video.");
  return data.data;
}

export default function InstagramPage() {
  const [url,     setUrl]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [result,  setResult]  = useState(null);
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text.trim());
      setError("");
    } catch {
      setError("Clipboard access denied. Please paste manually.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    const trimmed = url.trim();
    if (!trimmed) { setError("Masukkan URL Instagram."); return; }
    if (!isValidInstagramUrl(trimmed)) {
      setError("URL tidak valid. Contoh: https://www.instagram.com/reel/xxx");
      return;
    }
    setLoading(true);
    try {
      const data = await fetchInstagramInfo(trimmed);
      setResult(mapInstagramToUiShape(data));
    } catch (err) {
      const msg = err?.message || "Gagal mengambil video. Coba lagi.";
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !url.trim();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-xl mx-auto">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-1.5 text-xs text-[#52525B] hover:text-white transition-colors"
            >
              <ArrowLeft size={13} /> Back to TikTok Downloader
            </button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
              style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
            >
              <Camera size={26} className="text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Instagram <span className="gradient-text">Downloader</span>
            </h1>
            <p className="text-[#71717A] text-sm sm:text-base">
              Paste any Instagram link and download instantly — no account, no watermark, no nonsense.
            </p>
          </motion.div>

          {/* Input Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              className="relative rounded-2xl transition-all duration-400"
              style={{
                boxShadow: focused
                  ? "0 0 0 1px rgba(220,39,67,0.4), 0 0 0 4px rgba(220,39,67,0.08), 0 0 32px rgba(220,39,67,0.15), 0 20px 40px rgba(0,0,0,0.5)"
                  : "0 1px 2px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.35), 0 16px 32px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              <div className="glass-strong rounded-2xl overflow-hidden">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="flex items-center gap-2 px-4 py-1">
                    <Camera size={13} className="text-[#2A2A2E] flex-shrink-0" />
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => { setUrl(e.target.value); setError(""); setResult(null); }}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      placeholder="Paste URL Instagram Reels / Video..."
                      disabled={loading}
                      className="flex-1 bg-transparent py-4 text-sm sm:text-base text-white placeholder-[#2A2A2E] outline-none disabled:opacity-50 min-w-0"
                    />
                    <AnimatePresence>
                      {url && !loading && (
                        <motion.button
                          type="button"
                          onClick={() => { setUrl(""); setError(""); setResult(null); }}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{ duration: 0.12 }}
                          className="p-1.5 text-[#3F3F46] hover:text-[#A1A1AA] rounded-md transition-colors flex-shrink-0"
                        >
                          <X size={14} />
                        </motion.button>
                      )}
                    </AnimatePresence>
                    <button
                      type="button"
                      onClick={handlePaste}
                      disabled={loading}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#71717A] hover:text-white border border-white/8 hover:border-white/14 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200 flex-shrink-0 disabled:opacity-40 focus-ring"
                    >
                      <ClipboardPaste size={12} />
                      Paste
                    </button>
                  </div>

                  <div className="h-px mx-4" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />

                  <div className="p-2">
                    <motion.button
                      type="submit"
                      disabled={isDisabled}
                      whileHover={!isDisabled ? { scale: 1.008, y: -1 } : {}}
                      whileTap={!isDisabled ? { scale: 0.992, y: 1 } : {}}
                      className="w-full py-3.5 rounded-xl text-sm sm:text-base font-semibold text-white tracking-wide flex items-center justify-center gap-2 focus-ring relative overflow-hidden"
                      style={{
                        background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                        boxShadow: isDisabled ? "none" : "0 1px 0 rgba(255,255,255,0.12) inset, 0 -1px 0 rgba(0,0,0,0.3) inset, 0 4px 12px rgba(220,39,67,0.3)",
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
            </div>

            <AnimatePresence>
              {loading && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Loading />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {error && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-2 mt-3 px-1 text-sm text-red-400"
                >
                  <AlertCircle size={13} className="flex-shrink-0" />
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Result */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={result.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ResultCard data={result} />
                <button
                  onClick={() => { setResult(null); setUrl(""); setError(""); }}
                  className="w-full mt-3 py-2.5 rounded-xl text-sm text-[#71717A] hover:text-white border border-white/8 hover:border-white/14 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200"
                >
                  ← Download video lain
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 grid grid-cols-3 gap-3 text-center"
          >
            {[
              { label: "Reels", desc: "Download Reels HD" },
              { label: "Video", desc: "Video post biasa" },
              { label: "Gratis", desc: "Tanpa batas" },
            ].map((item) => (
              <div key={item.label} className="glass rounded-xl p-3">
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-xs text-[#52525B] mt-0.5">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
