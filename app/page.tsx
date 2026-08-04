import type { Metadata } from "next";

import ResumeBulletGeneratorClient from "@/components/resume-bullet-generator-client";
import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const siteUrl = "https://https://www.resumeclimbai.com";

export const metadata: Metadata = {
  title: "AI Resume Bullet Generator | ResumeClimb AI",
  description:
    "Create ATS-friendly, achievement-focused resume bullet points with ResumeClimb AI.",
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
