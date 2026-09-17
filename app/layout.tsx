import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "sonner";
import Link from "next/link"; // මෙය අලුතින් එකතු කරන ලදි

import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.resumeclimbai.com"),

  verification: {
    google: "FYbX8VFA_hCVhcmpT342Rcv2yfGHl8Oc-SeGi-akSbY",
  },

  title: {
    default: "Free AI Resume Bullet Generator | ResumeClimb AI",
    template: "%s | ResumeClimb AI",
  },

  description:
    "Create ATS-friendly resume bullet points with AI. Generate achievement-focused bullets, improve your resume, analyze ATS score, and export to PDF, DOCX or TXT.",

  keywords: [
    "AI resume bullet generator",
    "resume bullet generator",
    "resume bullet point generator",
    "ATS resume generator",
    "resume achievement generator",
    "resume bullet rewriter",
    "AI resume writer",
  ],

  authors: [
    {
      name: "UDA Apps",
    },
  ],

  creator: "UDA Apps",
  publisher: "UDA Apps",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "ResumeClimb AI",
    title: "Free AI Resume Bullet Generator | ResumeClimb AI",
    description:
      "Create ATS-friendly resume bullet points with AI. Generate achievement-focused bullets, improve your resume, analyze ATS score, and export to PDF, DOCX or TXT.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ResumeClimb AI",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free AI Resume Bullet Generator | ResumeClimb AI",
    description:
      "Create ATS-friendly resume bullet points with AI. Generate achievement-focused bullets, improve your resume, analyze ATS score, and export to PDF, DOCX or TXT.",
    images: ["/opengraph-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "career",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider>
          {/* Main Content */}
          <div className="flex-grow">
            {children}
          </div>

          {/* --- ADDED FOOTER SECTION --- */}
          <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-sm text-slate-500">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-4">
              <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-slate-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-slate-300 transition-colors">
                Contact Us
              </Link>
            </div>
            <div>
              © {new Date().getFullYear()} ResumeClimb AI. Built by UDA Apps.
            </div>
          </footer>
          {/* --- END FOOTER SECTION --- */}

          <Toaster
            richColors
            closeButton
            position="top-center"
            duration={3500}
            visibleToasts={4}
          />
        </ThemeProvider>

        <GoogleAnalytics gaId="G-5C8WQHHY15" />
      </body>
    </html>
  );
}