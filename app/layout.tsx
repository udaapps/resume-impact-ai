import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "sonner";

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
  metadataBase: new URL(
    "https://resume-impact-ai.vercel.app"
  ),

  title: {
    default:
      "Free AI Resume Bullet Generator | Resume Impact AI",
    template: "%s | Resume Impact AI",
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
    siteName: "Resume Impact AI",
    title:
      "Free AI Resume Bullet Generator | Resume Impact AI",
    description:
      "Create ATS-friendly resume bullet points with AI. Generate achievement-focused bullets, improve your resume, analyze ATS score, and export to PDF, DOCX or TXT.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Resume Impact AI",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Free AI Resume Bullet Generator | Resume Impact AI",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}

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
