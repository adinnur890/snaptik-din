import Link from "next/link";
import { ShieldCheck, ArrowLeft, Zap } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — SnapDin",
  description: "SnapDin Privacy Policy. We respect your privacy and do not sell your data.",
};

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
      <span className="w-1 h-5 rounded-full bg-gradient-to-b from-[#FE2C55] to-[#25F4EE] inline-block" />
      {title}
    </h2>
    <div className="text-[#A1A1AA] text-sm leading-relaxed space-y-3">{children}</div>
  </div>
);

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#FE2C55]/6 blur-[120px]" />
      </div>

      <main className="relative flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to SnapDin
        </Link>

        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-xl btn-gradient flex items-center justify-center shadow-lg">
            <ShieldCheck size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
            <p className="text-[#52525B] text-sm mt-1">Last updated: July 2026</p>
          </div>
        </div>

        <div className="glass rounded-2xl p-8 sm:p-10">
          <Section title="Overview">
            <p>SnapDin ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our service at snaptik-din.vercel.app.</p>
            <p>We built SnapDin with privacy in mind — we do not sell, trade, or rent your personal data to third parties.</p>
          </Section>

          <Section title="Information We Collect">
            <p>SnapDin does not require account registration and does not collect personal information directly. However, the following data may be collected automatically:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>IP address (for rate limiting and abuse prevention)</li>
              <li>Browser type and device information (via server logs)</li>
              <li>TikTok URLs submitted for processing</li>
              <li>Usage data such as pages visited and time spent</li>
            </ul>
          </Section>

          <Section title="How We Use Your Information">
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>To provide and improve our download service</li>
              <li>To prevent abuse, spam, and rate limit violations</li>
              <li>To monitor service performance and uptime</li>
              <li>To respond to feedback and bug reports submitted via our contact form</li>
            </ul>
          </Section>

          <Section title="Third-Party Services">
            <p>SnapDin uses the following third-party services which may have their own privacy policies:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-white">TikWM API</strong> — used to fetch TikTok video data</li>
              <li><strong className="text-white">Vercel</strong> — frontend hosting and serverless functions</li>
              <li><strong className="text-white">Railway</strong> — backend server hosting</li>
              <li><strong className="text-white">Discord</strong> — receiving feedback via webhook</li>
            </ul>
          </Section>

          <Section title="Cookies">
            <p>SnapDin does not use tracking cookies or advertising cookies. We may use essential browser storage (localStorage) to improve user experience, such as remembering preferences.</p>
          </Section>

          <Section title="Data Retention">
            <p>We do not store downloaded videos or personal data on our servers. TikTok video URLs are processed in real-time and not saved to any database.</p>
          </Section>

          <Section title="Children's Privacy">
            <p>SnapDin is not intended for children under 13 years of age. We do not knowingly collect personal information from children.</p>
          </Section>

          <Section title="Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Know what data we collect about you</li>
              <li>Request deletion of any data associated with you</li>
              <li>Opt out of any future data collection</li>
            </ul>
          </Section>

          <Section title="Contact">
            <p>If you have any questions about this Privacy Policy, please contact us through our <Link href="/contact" className="text-[#25F4EE] hover:underline">Contact page</Link>.</p>
          </Section>
        </div>
      </main>

      <footer className="relative border-t border-[#27272A]/60 py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded-md btn-gradient flex items-center justify-center group-hover:scale-105 transition-transform">
              <Zap size={11} className="text-white fill-white" />
            </div>
            <span className="text-sm font-bold">Snap<span className="gradient-text">Din</span></span>
          </Link>
          <p className="text-xs text-[#52525B]">© {new Date().getFullYear()} SnapDin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
