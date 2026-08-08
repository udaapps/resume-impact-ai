import { NextResponse } from "next/server";

import { analyzeAchievements } from "@/lib/ats/achievementAnalyzer";
import { analyzeKeywordMatch } from "@/lib/ats/keywordMatcher";
import { analyzeResumeSections } from "@/lib/ats/sectionAnalyzer";

type AtsAnalyzeRequest = {
  resumeText?: unknown;
  jobDescription?: unknown;
};

type FormattingIssue = {
  id: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
};

type FormattingAnalysis = {
  formattingScore: number;
  readabilityScore: number;

  wordCount: number;
  bulletCount: number;
  longParagraphCount: number;
  longSentenceCount: number;

  hasEmail: boolean;
  hasPhone: boolean;
  hasLinkedIn: boolean;

  firstPersonPronounCount: number;
  weakPhraseCount: number;
  repeatedKeywordCount: number;

  formattingIssues: FormattingIssue[];
  recommendations: string[];
};

type KeywordItem = {
  keyword: string;
  category: string;
  weight: number;
};

type TruthMatchStatus =
  | "confirmed"
  | "related"
  | "missing";

type TruthMatchItem = KeywordItem & {
  status: TruthMatchStatus;
  explanation: string;
  relatedResumeTerms: string[];
};

type TruthMatchAnalysis = {
  confirmed: TruthMatchItem[];
  related: TruthMatchItem[];
  missing: TruthMatchItem[];
  notice: string;
};

const MAX_RESUME_LENGTH = 30_000;
const MAX_JOB_DESCRIPTION_LENGTH = 20_000;

const TRUTH_MATCH_NOTICE =
  "Truth Match compares wording in the supplied resume with the target job description. Related wording is not proof that the exact skill or requirement is owned. Add or rewrite a term only when it accurately reflects real experience.";

/*
 * These controlled groups identify adjacent concepts without
 * claiming that one skill is equivalent to another. For example,
 * Azure can be related to an AWS requirement, but it does not
 * confirm AWS experience. This list is deliberately conservative.
 */
const RELATED_TERM_GROUPS: string[][] = [
  [
    "customer service",
    "customer support",
    "customer care",
    "client service",
    "client support",
    "client relations",
  ],
  [
    "complaint resolution",
    "issue resolution",
    "conflict resolution",
    "case resolution",
    "de-escalation",
  ],
  [
    "project management",
    "project coordination",
    "program management",
    "project delivery",
    "project planning",
  ],
  [
    "team leadership",
    "team lead",
    "people management",
    "staff supervision",
    "team supervision",
  ],
  [
    "data analysis",
    "data analytics",
    "business analysis",
    "business intelligence",
    "reporting",
  ],
  [
    "dashboard",
    "dashboards",
    "power bi",
    "tableau",
    "looker",
    "data visualization",
  ],
  [
    "spreadsheet",
    "spreadsheets",
    "excel",
    "google sheets",
  ],
  [
    "database",
    "databases",
    "sql",
    "postgresql",
    "mysql",
    "sql server",
    "oracle",
  ],
  [
    "cloud",
    "aws",
    "amazon web services",
    "azure",
    "google cloud",
    "gcp",
  ],
  [
    "devops",
    "ci cd",
    "continuous integration",
    "continuous delivery",
    "deployment automation",
    "automated deployment",
    "deployment workflows",
    "release automation",
  ],
  [
    "crm",
    "crm system",
    "crm systems",
    "customer relationship management",
    "salesforce",
    "hubspot",
    "zoho crm",
    "dynamics 365",
  ],
  [
    "agile",
    "scrum",
    "kanban",
    "sprint planning",
  ],
  [
    "sales",
    "business development",
    "account management",
    "lead generation",
  ],
  [
    "written communication",
    "verbal communication",
    "presentation",
    "stakeholder communication",
    "client communication",
  ],
  [
    "process improvement",
    "continuous improvement",
    "workflow improvement",
    "operational improvement",
  ],
  [
    "automation",
    "automated workflow",
    "automated workflows",
    "scripting",
    "workflow automation",
    "process automation",
  ],
  [
    "budget management",
    "financial planning",
    "cost control",
    "budget tracking",
  ],
  [
    "quality assurance",
    "quality control",
    "testing",
    "quality review",
  ],
];

function cleanText(
  value: unknown,
  maximumLength: number
): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, maximumLength);
}

function clampScore(score: number): number {
  return Math.max(
    0,
    Math.min(100, Math.round(score))
  );
}

function countWords(text: string): number {
  return (
    text
      .trim()
      .match(/\b[\p{L}\p{N}][\p{L}\p{N}'’./+#-]*\b/gu)
      ?.length ?? 0
  );
}

function countOccurrences(
  text: string,
  pattern: RegExp
): number {
  return text.match(pattern)?.length ?? 0;
}

function normalizeMatchText(
  value: string
): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9+#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsNormalizedTerm(
  normalizedText: string,
  term: string
): boolean {
  const normalizedTerm =
    normalizeMatchText(term);

  if (!normalizedTerm) {
    return false;
  }

  return ` ${normalizedText} `.includes(
    ` ${normalizedTerm} `
  );
}

function keywordReferencesTerm(
  keyword: string,
  term: string
): boolean {
  const normalizedKeyword =
    normalizeMatchText(keyword);

  const normalizedTerm =
    normalizeMatchText(term);

  if (
    !normalizedKeyword ||
    !normalizedTerm
  ) {
    return false;
  }

  return (
    normalizedKeyword === normalizedTerm ||
    ` ${normalizedKeyword} `.includes(
      ` ${normalizedTerm} `
    ) ||
    ` ${normalizedTerm} `.includes(
      ` ${normalizedKeyword} `
    )
  );
}

function findRelatedResumeTerms(
  keyword: string,
  normalizedResume: string
): string[] {
  const normalizedKeyword =
    normalizeMatchText(keyword);

  const relatedTerms =
    RELATED_TERM_GROUPS.flatMap(
      (group) => {
        const belongsToGroup =
          group.some((term) =>
            keywordReferencesTerm(
              keyword,
              term
            )
          );

        if (!belongsToGroup) {
          return [];
        }

        return group.filter((term) => {
          const normalizedTerm =
            normalizeMatchText(term);

          return (
            normalizedTerm !==
              normalizedKeyword &&
            containsNormalizedTerm(
              normalizedResume,
              term
            )
          );
        });
      }
    );

  return relatedTerms
    .filter(
      (term, index, items) =>
        items.indexOf(term) === index
    )
    .slice(0, 3);
}

function buildTruthMatchAnalysis(params: {
  resumeText: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  matchedItems: KeywordItem[];
  missingItems: KeywordItem[];
}): TruthMatchAnalysis {
  const {
    resumeText,
    matchedKeywords,
    missingKeywords,
    matchedItems,
    missingItems,
  } = params;

  const normalizedResume =
    normalizeMatchText(resumeText);

  const itemByKeyword = new Map<
    string,
    KeywordItem
  >();

  for (const item of [
    ...matchedItems,
    ...missingItems,
  ]) {
    itemByKeyword.set(
      normalizeMatchText(item.keyword),
      item
    );
  }

  function getKeywordItem(
    keyword: string
  ): KeywordItem {
    return (
      itemByKeyword.get(
        normalizeMatchText(keyword)
      ) ?? {
        keyword,
        category: "general",
        weight: 1,
      }
    );
  }

  const confirmed = matchedKeywords
    .map((keyword) => keyword.trim())
    .filter(Boolean)
    .filter(
      (keyword, index, items) =>
        items.indexOf(keyword) === index
    )
    .slice(0, 20)
    .map((keyword): TruthMatchItem => {
      const item = getKeywordItem(keyword);

      return {
        ...item,
        keyword,
        status: "confirmed",
        explanation:
          "This job-description term has a direct match in the supplied resume.",
        relatedResumeTerms: [],
      };
    });

  const related: TruthMatchItem[] = [];
  const missing: TruthMatchItem[] = [];

  for (const keyword of missingKeywords
    .map((item) => item.trim())
    .filter(Boolean)
    .filter(
      (item, index, items) =>
        items.indexOf(item) === index
    )
    .slice(0, 20)) {
    const item = getKeywordItem(keyword);

    const relatedResumeTerms =
      findRelatedResumeTerms(
        keyword,
        normalizedResume
      );

    if (relatedResumeTerms.length > 0) {
      related.push({
        ...item,
        keyword,
        status: "related",
        explanation: `Related resume wording was detected (${relatedResumeTerms.join(
          ", "
        )}), but it does not confirm the exact requirement.`,
        relatedResumeTerms,
      });

      continue;
    }

    missing.push({
      ...item,
      keyword,
      status: "missing",
      explanation:
        "No direct or controlled related wording was detected in the supplied resume.",
      relatedResumeTerms: [],
    });
  }

  return {
    confirmed,
    related,
    missing,
    notice: TRUTH_MATCH_NOTICE,
  };
}

function calculateExperienceScore(
  resumeText: string,
  jobDescription: string
): number {
  const resume = resumeText.toLowerCase();
  const job = jobDescription.toLowerCase();

  let score = 50;

  const seniorTerms = [
    "senior",
    "lead",
    "manager",
    "director",
    "architect",
    "head of",
  ];

  const entryTerms = [
    "entry level",
    "entry-level",
    "junior",
    "graduate",
    "intern",
    "trainee",
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

  if (
    jobRequiresSenior &&
    resumeShowsSenior
  ) {
    score += 30;
  } else if (
    jobRequiresSenior &&
    !resumeShowsSenior
  ) {
    score -= 20;
  }

  if (
    jobRequiresEntry &&
    resumeShowsEntry
  ) {
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
    highestResumeYears >=
      highestJobYears
  ) {
    score += 20;
  } else if (
    highestJobYears > 0 &&
    highestResumeYears <
      highestJobYears
  ) {
    score -= 15;
  }

  return clampScore(score);
}

function calculateBulletScore(
  resumeText: string
): number {
  const lines = resumeText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const bulletLines = lines.filter(
    (line) =>
      /^[-•▪◦‣]\s+/.test(line) ||
      /^\d+[.)]\s+/.test(line)
  );

  const actionVerbs = [
    "achieved",
    "administered",
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
    "resolved",
    "streamlined",
    "supervised",
  ];

  const normalizedResume =
    resumeText.toLowerCase();

  const actionVerbMatches =
    actionVerbs.filter((verb) =>
      normalizedResume.includes(verb)
    ).length;

  const metricMatches =
    resumeText.match(
      /\b\d+(?:\.\d+)?%|\$\s?\d+(?:,\d{3})*(?:\.\d+)?|\b\d+\+?\b/g
    )?.length ?? 0;

  let score = 30;

  if (bulletLines.length >= 5) {
    score += 30;
  } else if (bulletLines.length >= 3) {
    score += 25;
  } else if (bulletLines.length >= 1) {
    score += 12;
  }

  score += Math.min(
    actionVerbMatches * 5,
    25
  );

  score += Math.min(
    metricMatches * 4,
    15
  );

  return clampScore(score);
}

function analyzeFormattingAndReadability(
  resumeText: string
): FormattingAnalysis {
  const normalizedText = resumeText
    .replace(/\r\n/g, "\n")
    .trim();

  const lines = normalizedText
    .split("\n")
    .map((line) => line.trim());

  const nonEmptyLines = lines.filter(
    Boolean
  );

  const wordCount =
    countWords(normalizedText);

  const bulletLines =
    nonEmptyLines.filter(
      (line) =>
        /^[-•▪◦‣]\s+/.test(line) ||
        /^\d+[.)]\s+/.test(line)
    );

  const bulletCount =
    bulletLines.length;

  const paragraphs = normalizedText
    .split(/\n\s*\n/)
    .map((paragraph) =>
      paragraph
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter(Boolean);

  const longParagraphCount =
    paragraphs.filter(
      (paragraph) =>
        countWords(paragraph) > 80
    ).length;

  const sentences =
    normalizedText
      .replace(/\n+/g, " ")
      .split(/(?<=[.!?])\s+/)
      .map((sentence) =>
        sentence.trim()
      )
      .filter(Boolean);

  const longSentenceCount =
    sentences.filter(
      (sentence) =>
        countWords(sentence) > 32
    ).length;

  const hasEmail =
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(
      normalizedText
    );

  const hasPhone =
    /(?:\+?\d[\d\s().-]{7,}\d)/.test(
      normalizedText
    );

  const hasLinkedIn =
    /(?:linkedin\.com\/in\/|linkedin\s*:)/i.test(
      normalizedText
    );

  const firstPersonPronounCount =
    countOccurrences(
      normalizedText,
      /\b(?:i|me|my|mine|we|our|ours|us)\b/gi
    );

  const weakPhrasePatterns = [
    /\bresponsible for\b/gi,
    /\bworked on\b/gi,
    /\bhelped with\b/gi,
    /\bduties included\b/gi,
    /\btasked with\b/gi,
    /\bparticipated in\b/gi,
    /\binvolved in\b/gi,
    /\bassisted with\b/gi,
  ];

  const weakPhraseCount =
    weakPhrasePatterns.reduce(
      (total, pattern) =>
        total +
        countOccurrences(
          normalizedText,
          pattern
        ),
      0
    );

  const lowerWords =
    normalizedText
      .toLowerCase()
      .match(/\b[a-z][a-z0-9.+#/-]{2,}\b/g) ??
    [];

  const stopWords = new Set([
    "and",
    "the",
    "with",
    "for",
    "from",
    "that",
    "this",
    "were",
    "was",
    "have",
    "has",
    "had",
    "using",
    "into",
    "your",
    "their",
    "our",
    "you",
    "are",
    "but",
    "not",
    "all",
    "can",
    "will",
    "work",
    "experience",
    "skills",
    "professional",
    "education",
    "summary",
  ]);

  const frequency = new Map<
    string,
    number
  >();

  for (const word of lowerWords) {
    if (
      word.length < 4 ||
      stopWords.has(word)
    ) {
      continue;
    }

    frequency.set(
      word,
      (frequency.get(word) ?? 0) + 1
    );
  }

  const repeatedKeywordCount = [
    ...frequency.values(),
  ].filter(
    (count) => count >= 5
  ).length;

  const formattingIssues: FormattingIssue[] =
    [];

  if (!hasEmail) {
    formattingIssues.push({
      id: "missing-email",
      title:
        "Professional email not detected",
      description:
        "Add a professional email address near the top of your resume.",
      severity: "high",
    });
  }

  if (!hasPhone) {
    formattingIssues.push({
      id: "missing-phone",
      title:
        "Phone number not detected",
      description:
        "Add a phone number with the correct country or area code.",
      severity: "high",
    });
  }

  if (!hasLinkedIn) {
    formattingIssues.push({
      id: "missing-linkedin",
      title:
        "LinkedIn profile not detected",
      description:
        "Consider adding a complete LinkedIn profile URL when it supports your application.",
      severity: "low",
    });
  }

  if (wordCount < 150) {
    formattingIssues.push({
      id: "resume-too-short",
      title:
        "Resume content may be too short",
      description:
        "Add enough relevant experience, skills, education, and achievements to demonstrate your suitability.",
      severity: "medium",
    });
  }

  if (wordCount > 1_200) {
    formattingIssues.push({
      id: "resume-too-long",
      title:
        "Resume content may be too long",
      description:
        "Remove outdated or low-value details and focus on the most relevant experience.",
      severity: "medium",
    });
  }

  if (bulletCount === 0) {
    formattingIssues.push({
      id: "no-bullets",
      title:
        "No resume bullet points detected",
      description:
        "Use concise bullet points to make work experience easier for recruiters and ATS systems to scan.",
      severity: "high",
    });
  }

  if (longParagraphCount > 0) {
    formattingIssues.push({
      id: "long-paragraphs",
      title:
        "Long paragraphs detected",
      description:
        `${longParagraphCount} paragraph${
          longParagraphCount === 1
            ? ""
            : "s"
        } may be difficult to scan. Convert dense text into concise bullets.`,
      severity: "medium",
    });
  }

  if (longSentenceCount > 0) {
    formattingIssues.push({
      id: "long-sentences",
      title:
        "Long sentences detected",
      description:
        `${longSentenceCount} sentence${
          longSentenceCount === 1
            ? ""
            : "s"
        } exceed 32 words. Shorten them to improve readability.`,
      severity: "medium",
    });
  }

  if (firstPersonPronounCount > 0) {
    formattingIssues.push({
      id: "first-person-language",
      title:
        "First-person language detected",
      description:
        "Resume bullets usually work better without I, me, my, we, or our.",
      severity: "low",
    });
  }

  if (weakPhraseCount > 0) {
    formattingIssues.push({
      id: "weak-phrases",
      title:
        "Weak resume phrases detected",
      description:
        "Replace phrases such as “responsible for” or “worked on” with direct action verbs.",
      severity: "medium",
    });
  }

  if (repeatedKeywordCount > 0) {
    formattingIssues.push({
      id: "keyword-repetition",
      title:
        "Possible keyword repetition",
      description:
        "Some words appear very frequently. Avoid unnatural keyword stuffing.",
      severity: "low",
    });
  }

  let formattingScore = 100;

  for (const issue of formattingIssues) {
    if (issue.severity === "high") {
      formattingScore -= 15;
    } else if (
      issue.severity === "medium"
    ) {
      formattingScore -= 9;
    } else {
      formattingScore -= 4;
    }
  }

  if (
    bulletCount >= 3 &&
    bulletCount <= 20
  ) {
    formattingScore += 5;
  }

  let readabilityScore = 100;

  readabilityScore -=
    longSentenceCount * 8;

  readabilityScore -=
    longParagraphCount * 10;

  readabilityScore -=
    firstPersonPronounCount * 2;

  readabilityScore -=
    weakPhraseCount * 5;

  if (wordCount < 100) {
    readabilityScore -= 15;
  }

  if (wordCount > 1_200) {
    readabilityScore -= 10;
  }

  if (bulletCount === 0) {
    readabilityScore -= 15;
  }

  const recommendations =
    formattingIssues.map(
      (issue) => issue.description
    );

  return {
    formattingScore:
      clampScore(formattingScore),

    readabilityScore:
      clampScore(readabilityScore),

    wordCount,
    bulletCount,
    longParagraphCount,
    longSentenceCount,

    hasEmail,
    hasPhone,
    hasLinkedIn,

    firstPersonPronounCount,
    weakPhraseCount,
    repeatedKeywordCount,

    formattingIssues,
    recommendations,
  };
}

function buildRecommendations(params: {
  keywordScore: number;
  structureScore: number;
  experienceScore: number;
  bulletScore: number;
  achievementScore: number;
  formattingScore: number;
  readabilityScore: number;
  missingKeywords: string[];
  requiredMissingSections: string[];
}) {
  const {
    keywordScore,
    structureScore,
    experienceScore,
    bulletScore,
    achievementScore,
    formattingScore,
    readabilityScore,
    missingKeywords,
    requiredMissingSections,
  } = params;

  const recommendations: string[] =
    [];

  if (keywordScore < 70) {
    const priorityKeywords =
      missingKeywords
        .slice(0, 5)
        .join(", ");

    recommendations.push(
      priorityKeywords
        ? `Review these unconfirmed job terms and add them only when they accurately reflect your experience: ${priorityKeywords}.`
        : "Review the job-specific requirements and describe only the skills you genuinely have."
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

  if (achievementScore < 70) {
    recommendations.push(
      "Add truthful outcomes, numbers, percentages, time savings, revenue, quality improvements, or customer impact where available."
    );
  }

  if (formattingScore < 75) {
    recommendations.push(
      "Fix the highest-priority formatting issues before submitting your resume."
    );
  }

  if (readabilityScore < 75) {
    recommendations.push(
      "Shorten dense paragraphs and long sentences to make the resume easier to scan."
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
    let body: AtsAnalyzeRequest;

    try {
      body =
        (await request.json()) as AtsAnalyzeRequest;
    } catch {
      return NextResponse.json(
        {
          error:
            "The request body must contain valid JSON.",
        },
        {
          status: 400,
        }
      );
    }

    const resumeText = cleanText(
      body.resumeText,
      MAX_RESUME_LENGTH
    );

    const jobDescription = cleanText(
      body.jobDescription,
      MAX_JOB_DESCRIPTION_LENGTH
    );

    if (
      !resumeText ||
      !jobDescription
    ) {
      return NextResponse.json(
        {
          error:
            "Resume content and job description are required.",
        },
        {
          status: 400,
        }
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
        {
          status: 400,
        }
      );
    }

    const keywordAnalysis =
      analyzeKeywordMatch(
        resumeText,
        jobDescription
      );

    const sectionAnalysis =
      analyzeResumeSections(
        resumeText
      );

    const achievementAnalysis =
      analyzeAchievements(
        resumeText
      );

    const formattingAnalysis =
      analyzeFormattingAndReadability(
        resumeText
      );

    const truthMatch =
      buildTruthMatchAnalysis({
        resumeText,

        matchedKeywords:
          keywordAnalysis.matchedKeywords,

        missingKeywords:
          keywordAnalysis.missingKeywords,

        matchedItems:
          keywordAnalysis.matchedItems,

        missingItems:
          keywordAnalysis.missingItems,
      });

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
      calculateBulletScore(
        resumeText
      );

    const achievementScore =
      achievementAnalysis.score;

    const formattingScore =
      formattingAnalysis.formattingScore;

    const readabilityScore =
      formattingAnalysis.readabilityScore;

    const overallScore = clampScore(
      keywordScore * 0.24 +
        skillsScore * 0.14 +
        experienceScore * 0.12 +
        structureScore * 0.12 +
        bulletScore * 0.1 +
        achievementScore * 0.1 +
        formattingScore * 0.09 +
        readabilityScore * 0.09
    );

    const baseRecommendations =
      buildRecommendations({
        keywordScore,
        structureScore,
        experienceScore,
        bulletScore,
        achievementScore,
        formattingScore,
        readabilityScore,

        missingKeywords:
          truthMatch.missing.map(
            (item) => item.keyword
          ),

        requiredMissingSections:
          sectionAnalysis.requiredMissingSections,
      });

    const recommendations = [
      ...baseRecommendations,
      ...achievementAnalysis.recommendations,
      ...formattingAnalysis.recommendations,
    ]
      .map((item) => item.trim())
      .filter(Boolean)
      .filter(
        (
          recommendation,
          index,
          items
        ) =>
          items.indexOf(
            recommendation
          ) === index
      )
      .slice(0, 10);

    return NextResponse.json(
      {
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
          formattingAnalysis.formattingIssues,

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

        truthMatch,

        sections:
          sectionAnalysis.sections,

        foundSections:
          sectionAnalysis.foundSections,

        missingSections:
          sectionAnalysis.missingSections,

        requiredMissingSections:
          sectionAnalysis.requiredMissingSections,

        recommendations,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error(
      "ATS analysis error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unable to analyze the resume right now.";

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV ===
          "development"
            ? message
            : "Unable to analyze the resume right now. Please try again.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      }
    );
  }
}
