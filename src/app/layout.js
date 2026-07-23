import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "SnapDin — Download TikTok Videos Without Watermark",
  description:
    "SnapDin is the fastest, free TikTok video downloader. Download TikTok videos without watermark in HD quality. No account needed. Works on all devices.",
  keywords: [
    "TikTok downloader",
    "download TikTok without watermark",
    "TikTok video download",
    "SnapDin",
    "free TikTok downloader",
    "HD TikTok download",
  ],
  authors: [{ name: "SnapDin" }],
  creator: "SnapDin",
  icons: {
    icon:    [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple:   "/icon.svg",
  },
  metadataBase: new URL("https://snapdin.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://snapdin.app",
    siteName: "SnapDin",
    title: "SnapDin — Download TikTok Videos Without Watermark",
    description:
      "Fast, free, unlimited TikTok video downloader. No watermark. No account required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SnapDin — TikTok Downloader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapDin — Download TikTok Videos Without Watermark",
    description:
      "Fast, free, unlimited TikTok video downloader. No watermark. No account required.",
    images: ["/og-image.png"],
    creator: "@snapdin",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#09090B] text-white overflow-x-hidden">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: { background: "#18181B", border: "1px solid #27272A", color: "#fff" },
          }}
        />
      </body>
    </html>
  );
}
