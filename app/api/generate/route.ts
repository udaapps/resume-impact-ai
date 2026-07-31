import { NextResponse } from "next/server";

import { analyzeAchievements } from "@/lib/ats/achievementAnalyzer";
import { analyzeFormatting } from "@/lib/ats/formattingAnalyzer";
import { analyzeKeywordMatch } from "@/lib/ats/keywordMatcher";
import { analyzeResumeSections } from "@/lib/ats/sectionAnalyzer";

type AtsAnalyzeRequest = {
  resumeText?: string;
  jobDescription?: string;
};

function clampScore(score: number) {
  return Math.max(
    0,
    Math.min(100, Math.round(score))
  );
}

function calculateExperienceScore(
  resumeText: string,
  jobDescription: string
) {
  const resume = resumeText.toLowerCase();
  const job = jobDescription.toLowerCase();

  let score = 50;

  const seniorTerms = [
    "senior",
    "lead",
    "manager",
    "director",
    "architect",
  ];

  const entryTerms = [
    "entry level",
    "junior",
    "graduate",
    "intern",
  ];

  const jobRequiresSenior = seniorTerms.some(
    (term) => job.includes(term)
  );

  const resumeShowsSenior = seniorTerms.some(
    (term) => resume.includes(term)
  );

  const jobRequiresEntry = entryTerms.some(
    (term) => job.includes(term)
  );

  const resumeShowsEntry = entryTerms.some(
    (term) => resume.includes(term)
  );

  if (jobRequiresSenior && resumeShowsSenior) {
    score += 30;
  } else if (
    jobRequiresSenior &&
    !resumeShowsSenior
  ) {
    score -= 20;
  }

  if (jobRequiresEntry && resumeShowsEntry) {
    score += 25;
  }

  const yearsPattern =
    /\b(\d{1,2})\+?\s+(?:years?|yrs?)\b/gi;

  const resumeYears = [
    ...resume.matchAll(yearsPattern),
  ].map((match) => Number(match[1]));

  const jobYears = [
    ...job.matchAll(yearsPattern),
  ].map((match) => Number(match[1]));

  const highestResumeYears =
    resumeYears.length > 0
      ? Math.max(...resumeYears)
      : 0;

  const highestJobYears =
    jobYears.length > 0
      ? Math.max(...jobYears)
      : 0;

  if (
    highestJobYears > 0 &&
    highestResumeYears >= highestJobYears
  ) {
    score += 20;
  } else if (
    highestJobYears > 0 &&
    highestResumeYears < highestJobYears
  ) {
    score -= 15;
  }

  return clampScore(score);
}

function calculateBulletScore(
  resumeText: string
) {
  const lines = resumeText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const bulletLines = lines.filter(
    (line) =>
      line.startsWith("-") ||
      line.startsWith("•") ||
      line.startsWith("*") ||
      /^\d+[.)]\s+/.test(line)
  );

  const actionVerbs = [
    "achieved",
    "automated",
    "built",
    "coordinated",
    "created",
    "delivered",
    "designed",
    "developed",
    "engineered",
    "generated",
    "implemented",
    "improved",
    "increased",
    "launched",
    "led",
    "managed",
    "optimized",
    "reduced",
    "streamlined",
  ];

  const normalizedResume =
    resumeText.toLowerCase();

  const actionVerbMatches =
    actionVerbs.filter((verb) =>
      normalizedResume.includes(verb)
    ).length;

  const metricMatches =
    resumeText.match(
      /\b\d+(?:\.\d+)?%|\$\d+(?:,\d{3})*|\b\d+\+?\b/g
    )?.length ?? 0;

  let score = 30;

  if (bulletLines.length >= 4) {
    score += 30;
  } else if (bulletLines.length >= 2) {
    score += 20;
  } else if (bulletLines.length === 1) {
    score += 10;
  }

  score += Math.min(
    actionVerbMatches * 5,
    25
  );

  score += Math.min(
    metricMatches * 5,
    15
  );

  return clampScore(score);
}

function buildCoreRecommendations(params: {
  keywordScore: number;
  structureScore: number;
  experienceScore: number;
  bulletScore: number;
  missingKeywords: string[];
  requiredMissingSections: string[];
}) {
  const {
    keywordScore,
    structureScore,
    experienceScore,
    bulletScore,
    missingKeywords,
    requiredMissingSections,
  } = params;

  const recommendations: string[] = [];

  if (keywordScore < 70) {
    const priorityKeywords =
      missingKeywords.slice(0, 5).join(", ");

    recommendations.push(
      priorityKeywords
        ? `Add relevant missing keywords naturally, especially: ${priorityKeywords}.`
        : "Add the most important job-specific skills naturally throughout your resume."
    );
  }

  if (
    structureScore < 75 &&
    requiredMissingSections.length > 0
  ) {
    recommendations.push(
      `Add clear ATS-friendly sections for: ${requiredMissingSections.join(
        ", "
      )}.`
    );
  }

  if (experienceScore < 70) {
    recommendations.push(
      "Make your experience level and years of experience clearer and align them with the target role."
    );
  }

  if (bulletScore < 70) {
    recommendations.push(
      "Rewrite weak duties using strong action verbs and measurable achievements."
    );
  }

  recommendations.push(
    "Only include skills, tools, and achievements that accurately reflect your real experience."
  );

  return recommendations;
}

export async function POST(
  request: Request
) {
  try {
    const body =
      (await request.json()) as AtsAnalyzeRequest;

    const resumeText =
      body.resumeText?.trim();

    const jobDescription =
      body.jobDescription?.trim();

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        {
          error:
            "Resume content and job description are required.",
        },
        { status: 400 }
      );
    }

    if (
      resumeText.length < 100 ||
      jobDescription.length < 100
    ) {
      return NextResponse.json(
        {
          error:
            "Please provide at least 100 characters for both the resume and job description.",
        },
        { status: 400 }
      );
    }

    const keywordAnalysis =
      analyzeKeywordMatch(
        resumeText,
        jobDescription
      );

    const sectionAnalysis =
      analyzeResumeSections(resumeText);

    const achievementAnalysis =
      analyzeAchievements(resumeText);

    const formattingAnalysis =
      analyzeFormatting(resumeText);

    const keywordScore =
      keywordAnalysis.keywordScore;

    const skillsScore =
      keywordAnalysis.keywordScore;

    const experienceScore =
      calculateExperienceScore(
        resumeText,
        jobDescription
      );

    const structureScore =
      sectionAnalysis.sectionScore;

    const bulletScore =
      calculateBulletScore(resumeText);

    const achievementScore =
      achievementAnalysis.score;

    const formattingScore =
      formattingAnalysis.formattingScore;

    const readabilityScore =
      formattingAnalysis.readabilityScore;

    const overallScore = clampScore(
      keywordScore * 0.25 +
        skillsScore * 0.15 +
        experienceScore * 0.15 +
        structureScore * 0.12 +
        bulletScore * 0.08 +
        achievementScore * 0.1 +
        formattingScore * 0.1 +
        readabilityScore * 0.05
    );

    const coreRecommendations =
      buildCoreRecommendations({
        keywordScore,
        structureScore,
        experienceScore,
        bulletScore,
        missingKeywords:
          keywordAnalysis.missingKeywords,
        requiredMissingSections:
          sectionAnalysis.requiredMissingSections,
      });

    const recommendations = [
      ...coreRecommendations,
      ...achievementAnalysis.recommendations,
      ...formattingAnalysis.recommendations,
    ]
      .filter(
        (recommendation, index, items) =>
          items.indexOf(recommendation) ===
          index
      )
      .slice(0, 12);

    return NextResponse.json({
      overallScore,

      keywordScore,
      skillsScore,
      experienceScore,
      structureScore,
      bulletScore,
      achievementScore,
      formattingScore,
      readabilityScore,

      achievementMetrics:
        achievementAnalysis.metrics,

      achievementActionVerbs:
        achievementAnalysis.actionVerbs,

      achievementCount:
        achievementAnalysis.achievements,

      wordCount:
        formattingAnalysis.wordCount,

      bulletCount:
        formattingAnalysis.bulletCount,

      longParagraphCount:
        formattingAnalysis.longParagraphCount,

      longSentenceCount:
        formattingAnalysis.longSentenceCount,

      hasEmail:
        formattingAnalysis.hasEmail,

      hasPhone:
        formattingAnalysis.hasPhone,

      hasLinkedIn:
        formattingAnalysis.hasLinkedIn,

      firstPersonPronounCount:
        formattingAnalysis.firstPersonPronounCount,

      weakPhraseCount:
        formattingAnalysis.weakPhraseCount,

      repeatedKeywordCount:
        formattingAnalysis.repeatedKeywordCount,

      formattingIssues:
        formattingAnalysis.issues,

      matchedKeywords:
        keywordAnalysis.matchedKeywords.slice(
          0,
          20
        ),

      missingKeywords:
        keywordAnalysis.missingKeywords.slice(
          0,
          20
        ),

      matchedItems:
        keywordAnalysis.matchedItems.slice(
          0,
          20
        ),

      missingItems:
        keywordAnalysis.missingItems.slice(
          0,
          20
        ),

      sections:
        sectionAnalysis.sections,

      foundSections:
        sectionAnalysis.foundSections,

      missingSections:
        sectionAnalysis.missingSections,

      requiredMissingSections:
        sectionAnalysis.requiredMissingSections,

      recommendations,
    });
  } catch (error) {
    console.error(
      "ATS analysis error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to analyze the resume right now. Please try again.",
      },
      { status: 500 }
    );
  }
}