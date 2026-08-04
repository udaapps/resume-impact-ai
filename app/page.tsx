import type { Metadata } from "next";

import ResumeBulletGeneratorClient from "@/components/resume-bullet-generator-client";
import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const siteUrl = "https://resume-impact-ai.vercel.app";

export const metadata: Metadata = {
  title: "AI Resume Bullet Generator | Resume Impact AI",
  description:
    "Create ATS-friendly, achievement-focused resume bullet points with Resume Impact AI.",
  alternates: {
    canonical: `${siteUrl}/resume-bullet-generator`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return (
    <ResumeBulletGeneratorClient>
      <HumanAtsReviewCta source="homepage" />
    </ResumeBulletGeneratorClient>
  );
}
