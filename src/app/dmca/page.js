import Link from "next/link";
import { FileWarning, ArrowLeft, Zap } from "lucide-react";

export const metadata = {
  title: "DMCA Policy — SnapDin",
  description: "SnapDin DMCA Policy. We respect intellectual property rights.",
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

export default function DmcaPage() {
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
            <FileWarning size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">DMCA Policy</h1>
            <p className="text-[#52525B] text-sm mt-1">Last updated: July 2026</p>
          </div>
        </div>

        <div className="glass rounded-2xl p-8 sm:p-10">
          <Section title="Our Commitment">
            <p>SnapDin respects the intellectual property rights of others and expects users of our service to do the same. We comply with the Digital Millennium Copyright Act (DMCA) and respond promptly to valid copyright infringement notices.</p>
          </Section>

          <Section title="How SnapDin Works">
            <p>SnapDin is a download tool that fetches publicly available TikTok videos via third-party APIs. We do not host, store, or cache any video content on our servers. All content is streamed directly from TikTok's CDN servers.</p>
            <p>Because we do not store any content, we cannot "remove" specific videos from our servers. However, we can block specific URLs from being processed through our service.</p>
          </Section>

          <Section title="Filing a DMCA Takedown Notice">
            <p>If you believe that content accessible through SnapDin infringes your copyright, you may submit a DMCA takedown notice. Your notice must include:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Your full legal name and contact information</li>
              <li>A description of the copyrighted work you claim has been infringed</li>
              <li>The specific TikTok URL(s) of the allegedly infringing content</li>
              <li>A statement that you have a good faith belief that the use is not authorized by the copyright owner</li>
              <li>A statement that the information in your notice is accurate and, under penalty of perjury, that you are the copyright owner or authorized to act on their behalf</li>
              <li>Your electronic or physical signature</li>
            </ul>
          </Section>

          <Section title="How to Submit">
            <p>Send your DMCA notice through our <Link href="/contact" className="text-[#25F4EE] hover:underline">Contact page</Link> with the subject "DMCA Takedown Request".</p>
            <p>We will review your request and respond within 5-10 business days.</p>
          </Section>

          <Section title="Counter-Notice">
            <p>If you believe your content was wrongly removed, you may submit a counter-notice including:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Your full legal name and contact information</li>
              <li>Identification of the content that was removed</li>
              <li>A statement under penalty of perjury that you have a good faith belief the content was removed by mistake</li>
              <li>Your consent to jurisdiction of the federal court in your district</li>
              <li>Your electronic or physical signature</li>
            </ul>
          </Section>

          <Section title="Repeat Infringers">
            <p>SnapDin reserves the right to block access to users who repeatedly submit content that infringes on others' intellectual property rights.</p>
          </Section>

          <Section title="Disclaimer">
            <p>SnapDin is not affiliated with TikTok or ByteDance. We are an independent tool that helps users download publicly available content. Users are solely responsible for how they use downloaded content and must comply with TikTok's Terms of Service and applicable copyright laws.</p>
          </Section>

          <Section title="Contact">
            <p>For DMCA notices or any copyright-related questions, please contact us through our <Link href="/contact" className="text-[#25F4EE] hover:underline">Contact page</Link>.</p>
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
