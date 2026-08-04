import type { Metadata } from "next";
import type { ReactNode } from "react";

import AtsSeoContent from "@/components/ats/ats-seo-content";

const PAGE_URL =
  "https://https://www.resumeclimbai.com/ats-resume-checker";

const PAGE_DESCRIPTION =
  "Check your resume against a job description for free. Get an estimated ATS score, matched and missing keywords, resume section analysis, achievement checks, formatting issues, readability insights, and actionable recommendations.";

export const metadata: Metadata = {
  title:
    "Free ATS Resume Checker & Job Match Scanner | ResumeClimb AI",

  description: PAGE_DESCRIPTION,

  keywords: [
    "ATS resume checker",
    "free ATS resume checker",
    "resume ATS checker",
    "ATS score checker",
    "resume checker",
    "resume scanner",
    "resume job match",
    "job description resume matcher",
    "resume keyword checker",
    "ATS friendly resume checker",
    "resume optimization tool",
    "AI resume checker",
  ],

  alternates: {
    canonical: PAGE_URL,
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

  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: "ResumeClimb AI",
    title:
      "Free ATS Resume Checker & Job Match Scanner",
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt:
          "ResumeClimb AI free ATS resume checker",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Free ATS Resume Checker & Job Match Scanner",
    description: PAGE_DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
};

export default function AtsResumeCheckerLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      {children}
      <AtsSeoContent />
    </>
  );
}