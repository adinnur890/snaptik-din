import Link from "next/link";
import { ScrollText, ArrowLeft, Zap } from "lucide-react";

export const metadata = {
  title: "Terms of Use — SnapDin",
  description: "SnapDin Terms of Use. Please read before using our service.",
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

export default function TermsPage() {
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
            <ScrollText size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">Terms of Use</h1>
            <p className="text-[#52525B] text-sm mt-1">Last updated: July 2026</p>
          </div>
        </div>

        <div className="glass rounded-2xl p-8 sm:p-10">
          <Section title="Acceptance of Terms">
            <p>By accessing and using SnapDin (snaptik-din.vercel.app), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our service.</p>
          </Section>

          <Section title="Description of Service">
            <p>SnapDin is a free online tool that allows users to download TikTok videos without watermarks for personal use. We do not host any video content — all videos are fetched directly from TikTok's servers.</p>
          </Section>

          <Section title="Acceptable Use">
            <p>You agree to use SnapDin only for lawful purposes. You must not:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Download content that you do not have the right to download</li>
              <li>Use downloaded content for commercial purposes without permission from the original creator</li>
              <li>Redistribute, sell, or claim ownership of downloaded content</li>
              <li>Use automated tools or bots to abuse our service</li>
              <li>Attempt to bypass rate limits or security measures</li>
              <li>Use the service to download illegal, harmful, or offensive content</li>
            </ul>
          </Section>

          <Section title="Intellectual Property">
            <p>All TikTok videos downloaded through SnapDin remain the intellectual property of their respective creators. SnapDin does not claim ownership of any downloaded content.</p>
            <p>Users are solely responsible for ensuring they have the right to download and use any content obtained through our service.</p>
          </Section>

          <Section title="Disclaimer of Warranties">
            <p>SnapDin is provided "as is" without any warranties of any kind. We do not guarantee:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Uninterrupted or error-free service</li>
              <li>Availability of specific videos or content</li>
              <li>The quality or completeness of downloaded files</li>
            </ul>
          </Section>

          <Section title="Limitation of Liability">
            <p>SnapDin and its developers shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the service, including but not limited to:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Loss of data or files</li>
              <li>Copyright infringement claims from third parties</li>
              <li>Service interruptions or downtime</li>
            </ul>
          </Section>

          <Section title="Changes to Service">
            <p>We reserve the right to modify, suspend, or discontinue SnapDin at any time without prior notice. We may also update these Terms of Use at any time — continued use of the service constitutes acceptance of the updated terms.</p>
          </Section>

          <Section title="Governing Law">
            <p>These Terms of Use shall be governed by and construed in accordance with the laws of Indonesia, without regard to its conflict of law provisions.</p>
          </Section>

          <Section title="Contact">
            <p>If you have any questions about these Terms of Use, please contact us through our <Link href="/contact" className="text-[#25F4EE] hover:underline">Contact page</Link>.</p>
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
