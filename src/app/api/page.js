"use client";

import { motion } from "framer-motion";
import { Zap, Terminal, Code2, ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const ENDPOINTS = [
  {
    method: "GET",
    path:   "/api/tiktok",
    desc:   "Fetch video metadata and download links from a TikTok URL.",
    params: [
      { name: "url", type: "string", required: true, desc: "Full TikTok video URL" },
    ],
    response: `{
  "success": true,
  "title": "Video Title",
  "author": "Username",
  "thumbnail": "https://...",
  "duration": "0:32",
  "views": "4.2M",
  "download": {
    "no_watermark": "https://...",
    "watermark": "https://...",
    "mp3": "https://...",
    "cover": "https://..."
  }
}`,
  },
  {
    method: "POST",
    path:   "/api/download",
    desc:   "Trigger a direct download for a specific format.",
    params: [
      { name: "videoId", type: "string", required: true,  desc: "Video ID from /api/tiktok response" },
      { name: "type",    type: "string", required: true,  desc: "no_watermark | watermark | mp3 | cover" },
    ],
    response: `{
  "success": true,
  "downloadUrl": "https://...",
  "expiresAt": "2025-01-01T00:00:00Z"
}`,
  },
];

const METHOD_COLORS = {
  GET:  { bg: "rgba(37,244,238,0.08)",  text: "#25F4EE", border: "rgba(37,244,238,0.2)" },
  POST: { bg: "rgba(254,44,85,0.08)",   text: "#FE2C55", border: "rgba(254,44,85,0.2)" },
};

function MethodBadge({ method }) {
  const c = METHOD_COLORS[method];
  return (
    <span
      className="px-2.5 py-1 rounded-md text-xs font-bold font-mono tracking-wider"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
    >
      {method}
    </span>
  );
}

function EndpointCard({ endpoint, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-[#27272A] bg-[#111111] overflow-hidden"
    >
      <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-[#27272A]">
        <MethodBadge method={endpoint.method} />
        <code className="text-sm font-mono text-white">{endpoint.path}</code>
        <span className="ml-auto text-xs text-[#A1A1AA] hidden sm:block">{endpoint.desc}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#27272A]">
        {/* Parameters */}
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#52525B] mb-4">
            Parameters
          </p>
          <div className="flex flex-col gap-4">
            {endpoint.params.map((p) => (
              <div key={p.name} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <code className="text-sm font-mono text-[#25F4EE]">{p.name}</code>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1A1A1A] border border-[#27272A] text-[#71717A] font-mono">
                    {p.type}
                  </span>
                  {p.required && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FE2C55]/10 border border-[#FE2C55]/20 text-[#FE2C55]">
                      required
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#71717A]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Response */}
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#52525B] mb-4">
            Example Response
          </p>
          <pre className="text-xs font-mono text-[#A1A1AA] leading-relaxed overflow-x-auto bg-[#0D0D0F] rounded-xl p-4 border border-[#27272A]">
            <code>{endpoint.response}</code>
          </pre>
        </div>
      </div>
    </motion.div>
  );
}

export default function ApiPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* Ambient orbs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#FE2C55]/6 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[350px] h-[350px] rounded-full bg-[#25F4EE]/5 blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20">
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
        <motion.div {...fadeUp(0.05)} className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl btn-gradient flex items-center justify-center shadow-lg">
              <Terminal size={18} className="text-white" />
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-[#FE2C55]/30 bg-[#FE2C55]/10 text-[#FE2C55]">
              <Lock size={10} />
              Coming Soon — Backend not implemented yet
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            SnapDin <span className="gradient-text">API</span>
          </h1>
          <p className="text-[#A1A1AA] text-base sm:text-lg max-w-2xl leading-relaxed">
            Simple REST API for downloading TikTok videos. Integrate SnapDin into
            your own apps, bots, or workflows with a single HTTP request.
          </p>
        </motion.div>

        {/* Base URL */}
        <motion.div {...fadeUp(0.15)} className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#52525B] mb-3">
            Base URL
          </p>
          <div className="flex items-center gap-3 bg-[#111111] border border-[#27272A] rounded-xl px-5 py-3.5 w-fit">
            <Code2 size={14} className="text-[#25F4EE] flex-shrink-0" />
            <code className="text-sm font-mono text-white">https://api.snapdin.site/v1</code>
          </div>
        </motion.div>

        {/* Auth notice */}
        <motion.div
          {...fadeUp(0.2)}
          className="flex items-start gap-3 p-4 rounded-xl border border-[#27272A]/80 bg-[#111111] mb-12"
        >
          <Zap size={15} className="text-[#FE2C55] mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-white mb-1">Authentication</p>
            <p className="text-sm text-[#A1A1AA]">
              All API requests require an{" "}
              <code className="text-[#25F4EE] font-mono text-xs bg-[#0D0D0F] px-1.5 py-0.5 rounded">
                Authorization: Bearer &lt;token&gt;
              </code>{" "}
              header. API keys will be available once the backend launches.
            </p>
          </div>
        </motion.div>

        {/* Endpoints */}
        <motion.h2 {...fadeUp(0.25)} className="text-xl font-bold text-white mb-6">
          Endpoints
        </motion.h2>

        <div className="flex flex-col gap-6">
          {ENDPOINTS.map((ep, i) => (
            <EndpointCard key={ep.path} endpoint={ep} index={i} />
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { label: "Rate Limit",   value: "100 req / min", color: "#25F4EE" },
            { label: "Max URL Size", value: "2048 chars",    color: "#FE2C55" },
            { label: "Response",     value: "JSON only",     color: "#a78bfa" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="p-5 rounded-xl border border-[#27272A] bg-[#111111] text-center"
            >
              <p className="text-2xl font-bold mb-1" style={{ color }}>{value}</p>
              <p className="text-xs text-[#71717A] uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
