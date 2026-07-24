"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Download, Music, Image as ImageIcon,
  Eye, Clock, Heart, Share2, BadgeCheck, Droplets,
} from "lucide-react";

const DOWNLOAD_ICONS = {
  no_watermark: <Droplets size={14} />,
  watermark:    <Download size={14} />,
  mp3:          <Music size={14} />,
  cover:        <ImageIcon size={14} />,
};

function DownloadButton({ item, videoTitle }) {
  const isPrimary = item.type === "no_watermark";

  const handleClick = () => {
    if (!item.url || item.url === "#") return;

    const params = new URLSearchParams({
      url:      item.url,
      filename: `snapdin_${item.type}_${videoTitle || "video"}`.slice(0, 60),
      hd:       '1',
    });

    window.open(`/api/download-file?${params}`, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.button
      whileHover={{ scale: 1.015, y: -1, transition: { duration: 0.15 } }}
      whileTap={{ scale: 0.985, y: 1 }}
      onClick={handleClick}
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
      <span className="flex items-center gap-2">
        {DOWNLOAD_ICONS[item.type]}
        {item.label}
      </span>
      <span className="text-xs text-[#71717A] font-normal">{item.quality}</span>
    </motion.button>
  );
}

export default function ResultCard({ data }) {
  if (!data) return null;
  const { title, author, thumbnail, duration, views, likes, shares, downloads } = data;

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
          <div className="relative flex-shrink-0 w-24 h-40 sm:w-28 sm:h-48 rounded-xl overflow-hidden bg-[#1A1A1A]"
            style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}
          >
            <Image src={thumbnail} alt={title} fill sizes="(max-width:640px) 96px, 112px" className="object-cover" unoptimized />
            <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-md backdrop-blur-sm flex items-center gap-1">
              <Clock size={9} />{duration}
            </span>
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
            <DownloadButton key={item.type} item={item} videoTitle={title} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
