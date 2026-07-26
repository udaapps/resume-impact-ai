import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    "Create professional, ATS-friendly resume bullet points with AI. Generate achievement-focused bullets, receive an ATS score, and download results as PDF, DOCX, or TXT.",

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
      "Generate professional ATS-friendly resume bullets, analyze their quality, and download your results as PDF or DOCX.",
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
      "Generate ATS-friendly resume bullets and receive an AI-powered ATS score.",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}