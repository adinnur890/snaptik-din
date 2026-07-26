"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Image from "next/image";
import {
  Download, Music, Image as ImageIcon,
  Eye, Clock, Heart, Share2, BadgeCheck, Droplets, Play,
} from "lucide-react";

const DOWNLOAD_ICONS = {
  no_watermark: <Droplets size={14} />,
  watermark:    <Download size={14} />,
  mp3:          <Music size={14} />,
  cover:        <ImageIcon size={14} />,
};

function showShareOptions(videoTitle, videoUrl) {
  const text = `Download video TikTok gratis tanpa watermark di SnapDin! 🎵\n${videoUrl || ""}`;
  const encoded = encodeURIComponent(text);
  toast(
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-white">Share video ini</p>
      <div className="flex gap-2">
        <a
          href={`https://wa.me/?text=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366] text-white text-xs font-medium hover:opacity-90 transition-opacity"
        >
          WhatsApp
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#1DA1F2] text-white text-xs font-medium hover:opacity-90 transition-opacity"
        >
          Twitter/X
        </a>
        <button
          onClick={() => { navigator.clipboard.writeText(videoUrl || window.location.href); toast.success("Link disalin!"); }}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#27272A] text-white text-xs font-medium hover:bg-[#3F3F46] transition-colors"
        >
          Copy Link
        </button>
      </div>
    </div>,
    { duration: 10000 }
  );
}

function DownloadButton({ item, videoTitle, videoUrl }) {
  const isPrimary = item.type === "no_watermark";
  const [progress, setProgress] = useState(null); // null = idle, 0-100 = downloading

  const handleClick = () => {
    if (!item.url || item.url === "#" || progress !== null) return;

    const extMap = { no_watermark: 'mp4', watermark: 'mp4', mp3: 'mp3', cover: 'jpg' };
    const ext = extMap[item.type] || 'mp4';
    const filename = `snapdin_${item.type}_${videoTitle || "video"}.${ext}`.slice(0, 64);

    const backendUrl = 'https://snapdin-backend-production.up.railway.app';
    const params = new URLSearchParams({ url: item.url, filename: filename.replace(`.${ext}`, ''), hd: '1' });

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${backendUrl}/api/download-file?${params}`);
    xhr.responseType = "blob";

    setProgress(0);

    xhr.onprogress = (e) => {
      if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
      else setProgress(-1);
    };

    xhr.onload = () => {
      const mimeMap = { no_watermark: 'video/mp4', watermark: 'video/mp4', mp3: 'audio/mpeg', cover: 'image/jpeg' };
      const blob = new Blob([xhr.response], { type: mimeMap[item.type] || 'video/mp4' });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
      setProgress(null);
      toast.success("Download selesai!", {
        description: item.label,
        duration: 8000,
        action: {
          label: "Share",
          onClick: () => showShareOptions(videoTitle, videoUrl),
        },
      });
    };

    xhr.onerror = () => {
      setProgress(null);
      toast.error("Download gagal. Coba lagi.");
    };
    xhr.send();
  };

  const isDownloading = progress !== null;
  const isIndeterminate = progress === -1;
  const displayProgress = isIndeterminate ? 60 : progress; // animate at 60% if indeterminate

  return (
    <motion.button
      whileHover={!isDownloading ? { scale: 1.015, y: -1, transition: { duration: 0.15 } } : {}}
      whileTap={!isDownloading ? { scale: 0.985, y: 1 } : {}}
      onClick={handleClick}
      disabled={isDownloading}
      className={`flex items-center justify-between gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 focus-ring relative overflow-hidden ${
        isPrimary
          ? "btn-gradient shimmer-wrap"
          : "border border-[#27272A] hover:border-[#3F3F46] bg-[#111111] hover:bg-[#161618] text-white"
      }`}
      style={
        isPrimary
          ? { boxShadow: "0 1px 0 rgba(255,255,255,0.12) inset, 0 -1px 0 rgba(0,0,0,0.25) inset, 0 4px 16px rgba(254,44,85,0.25)" }
          : { boxShadow: "0 1px 0 rgba(255,255,255,0.03) inset, 0 2px 8px rgba(0,0,0,0.2)" }
      }
      aria-label={`Download ${item.label}`}
    >
      {/* Progress fill */}
      {isDownloading && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 origin-left"
          style={{ background: isPrimary ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: displayProgress / 100 }}
          transition={isIndeterminate
            ? { duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
            : { duration: 0.3, ease: "easeOut" }
          }
        />
      )}

      <span className="flex items-center gap-2 relative z-10">
        {isDownloading ? (
          <motion.span
            className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
          />
        ) : DOWNLOAD_ICONS[item.type]}
        {isDownloading ? (isIndeterminate ? "Downloading..." : `Downloading ${progress}%`) : item.label}
      </span>
      <span className="text-xs text-[#71717A] font-normal relative z-10">
        {isDownloading ? "" : item.quality}
      </span>
    </motion.button>
  );
}

export default function ResultCard({ data }) {
  if (!data) return null;
  const { title, author, thumbnail, duration, views, likes, shares, downloads, videoUrl } = data;
  const previewUrl = downloads.find(d => d.type === 'no_watermark')?.url || null;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full mt-5"
    >
      <div
        className="glass-strong rounded-2xl overflow-hidden relative"
        style={{
          boxShadow: "0 1px 0 rgba(255,255,255,0.05) inset, 0 4px 12px rgba(0,0,0,0.35), 0 16px 40px rgba(0,0,0,0.3)",
        }}
      >
        {/* Bevel */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
          style={{ background: "linear-gradient(155deg, rgba(255,255,255,0.04) 0%, transparent 45%)" }}
        />

        {/* Top: thumbnail + meta */}
        <div className="flex gap-4 p-5">
          <div
            className="relative flex-shrink-0 w-24 h-40 sm:w-28 sm:h-48 rounded-xl overflow-hidden bg-[#1A1A1A] cursor-pointer"
            style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}
            onClick={() => previewUrl && setIsPlaying(p => !p)}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.video
                  key="video"
                  src={previewUrl}
                  autoPlay
                  controls
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={e => e.stopPropagation()}
                />
              ) : (
                <motion.div key="thumb" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  {thumbnail ? (
                    <img src={thumbnail} alt={title} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-[#1A1A1A]" />
                  )}
                  {previewUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                        <Play size={16} className="text-white ml-0.5" fill="white" />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            {!isPlaying && (
              <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-md backdrop-blur-sm flex items-center gap-1 z-10">
                <Clock size={9} />{duration}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
            <div className="flex items-center gap-2.5 mb-3">
              {author.avatar && (
                <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0"
                  style={{ boxShadow: "0 0 0 2px rgba(39,39,42,0.8), 0 2px 8px rgba(0,0,0,0.3)" }}
                >
                  <Image src={author.avatar} alt={author.nickname} fill sizes="36px" className="object-cover" unoptimized />
                </div>
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-white truncate">{author.nickname}</span>
                  {author.verified && <BadgeCheck size={14} className="text-[#25F4EE] flex-shrink-0" />}
                </div>
                <span className="text-xs text-[#71717A] truncate block">{author.username}</span>
              </div>
            </div>

            <p className="text-sm text-[#A1A1AA] leading-relaxed line-clamp-3 mb-3">{title}</p>

            {(views || likes || shares) && (
              <div className="flex items-center gap-4 text-xs text-[#52525B]">
                {views  && <span className="flex items-center gap-1"><Eye size={11} />{views}</span>}
                {likes  && <span className="flex items-center gap-1"><Heart size={11} />{likes}</span>}
                {shares && <span className="flex items-center gap-1"><Share2 size={11} />{shares}</span>}
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mx-5" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />

        {/* Download buttons */}
        <div className="p-5 flex flex-col gap-2.5">
          <p className="text-[10px] font-semibold text-[#3F3F46] uppercase tracking-widest mb-1">
            Download Options
          </p>
          {downloads.map((item) => (
            <DownloadButton key={item.type} item={item} videoTitle={title} videoUrl={videoUrl} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
