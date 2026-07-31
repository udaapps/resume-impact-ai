export type FormattingIssueSeverity =
  | "high"
  | "medium"
  | "low";

export type FormattingIssue = {
  id: string;
  title: string;
  description: string;
  severity: FormattingIssueSeverity;
};

export type FormattingAnalysisResult = {
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

  issues: FormattingIssue[];
  recommendations: string[];
};

const WEAK_PHRASES = [
  "responsible for",
  "worked on",
  "helped with",
  "assisted with",
  "duties included",
  "tasked with",
  "participated in",
  "involved in",
  "handled various",
  "worked as",
];

const FIRST_PERSON_PRONOUNS = [
  "i",
  "me",
  "my",
  "mine",
  "myself",
  "we",
  "our",
  "ours",
  "ourselves",
];

const COMMON_WORDS = new Set([
  "about",
  "after",
  "again",
  "also",
  "among",
  "and",
  "are",
  "because",
  "been",
  "before",
  "being",
  "between",
  "both",
  "but",
  "can",
  "could",
  "did",
  "does",
  "doing",
  "each",
  "for",
  "from",
  "had",
  "has",
  "have",
  "having",
  "into",
  "its",
  "more",
  "most",
  "not",
  "over",
  "such",
  "than",
  "that",
  "the",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "this",
  "those",
  "through",
  "under",
  "using",
  "very",
  "was",
  "were",
  "what",
  "when",
  "where",
  "which",
  "while",
  "will",
  "with",
  "within",
  "would",
  "your",
]);

function clampScore(score: number) {
  return Math.max(
    0,
    Math.min(100, Math.round(score))
  );
}

function normalizeWhitespace(text: string) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\t/g, " ")
    .replace(/[ ]{2,}/g, " ")
    .trim();
}

function getWords(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#./%-]/g, " ")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);
}

function getSentences(text: string) {
  return text
    .split(/[.!?]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function getParagraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function getBulletLines(text: string) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(
      (line) =>
        /^[-•*]\s+/.test(line) ||
        /^\d+[.)]\s+/.test(line)
    );
}

function countWeakPhrases(text: string) {
  const normalizedText = text.toLowerCase();

  return WEAK_PHRASES.reduce(
    (total, phrase) => {
      const matches =
        normalizedText.match(
          new RegExp(
            phrase.replace(
              /[.*+?^${}()|[\]\\]/g,
              "\\$&"
            ),
            "g"
          )
        ) ?? [];

      return total + matches.length;
    },
    0
  );
}

function countFirstPersonPronouns(
  words: string[]
) {
  return words.filter((word) =>
    FIRST_PERSON_PRONOUNS.includes(word)
  ).length;
}

function countRepeatedKeywords(
  words: string[]
) {
  const frequency = new Map<string, number>();

  for (const word of words) {
    if (
      word.length < 5 ||
      COMMON_WORDS.has(word) ||
      /^\d+$/.test(word)
    ) {
      continue;
    }

    frequency.set(
      word,
      (frequency.get(word) ?? 0) + 1
    );
  }

  return [...frequency.values()].filter(
    (count) => count >= 6
  ).length;
}

function calculateReadabilityScore(params: {
  sentences: string[];
  words: string[];
  longSentenceCount: number;
  longParagraphCount: number;
}) {
  const {
    sentences,
    words,
    longSentenceCount,
    longParagraphCount,
  } = params;

  if (
    words.length === 0 ||
    sentences.length === 0
  ) {
    return 0;
  }

  const averageSentenceLength =
    words.length / sentences.length;

  let score = 100;

  if (averageSentenceLength > 28) {
    score -= 30;
  } else if (averageSentenceLength > 22) {
    score -= 18;
  } else if (averageSentenceLength > 18) {
    score -= 8;
  }

  score -= Math.min(
    longSentenceCount * 5,
    25
  );

  score -= Math.min(
    longParagraphCount * 8,
    24
  );

  return clampScore(score);
}

export function analyzeFormatting(
  resumeText: string
): FormattingAnalysisResult {
  const normalizedText =
    normalizeWhitespace(resumeText);

  const words = getWords(normalizedText);
  const sentences = getSentences(
    normalizedText
  );

  const paragraphs = getParagraphs(
    normalizedText
  );

  const bulletLines = getBulletLines(
    normalizedText
  );

  const wordCount = words.length;
  const bulletCount = bulletLines.length;

  const longSentenceCount =
    sentences.filter((sentence) => {
      return getWords(sentence).length > 30;
    }).length;

  const longParagraphCount =
    paragraphs.filter((paragraph) => {
      return getWords(paragraph).length > 80;
    }).length;

  const hasEmail =
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(
      normalizedText
    );

  const hasPhone =
    /(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{2,4}\)?[\s.-]?)?\d{3,4}[\s.-]?\d{3,4}/.test(
      normalizedText
    );

  const hasLinkedIn =
    /linkedin\.com\/in\/|linkedin:/i.test(
      normalizedText
    );

  const firstPersonPronounCount =
    countFirstPersonPronouns(words);

  const weakPhraseCount =
    countWeakPhrases(normalizedText);

  const repeatedKeywordCount =
    countRepeatedKeywords(words);

  const readabilityScore =
    calculateReadabilityScore({
      sentences,
      words,
      longSentenceCount,
      longParagraphCount,
    });

  const issues: FormattingIssue[] = [];
  const recommendations: string[] = [];

  let formattingScore = 100;

  if (!hasEmail) {
    formattingScore -= 12;

    issues.push({
      id: "missing-email",
      title: "Email address not detected",
      description:
        "An ATS-friendly resume should include a professional email address.",
      severity: "high",
    });

    recommendations.push(
      "Add a professional email address near the top of your resume."
    );
  }

  if (!hasPhone) {
    formattingScore -= 10;

    issues.push({
      id: "missing-phone",
      title: "Phone number not detected",
      description:
        "Recruiters need a clear way to contact you.",
      severity: "high",
    });

    recommendations.push(
      "Add a current phone number in the contact section."
    );
  }

  if (!hasLinkedIn) {
    formattingScore -= 4;

    issues.push({
      id: "missing-linkedin",
      title: "LinkedIn profile not detected",
      description:
        "A LinkedIn profile is optional but may improve recruiter trust.",
      severity: "low",
    });
  }

  if (wordCount < 180) {
    formattingScore -= 10;

    issues.push({
      id: "resume-too-short",
      title: "Resume content may be too short",
      description:
        "The resume may not contain enough detail to show relevant experience and achievements.",
      severity: "medium",
    });

    recommendations.push(
      "Add relevant experience, skills, projects, and measurable achievements."
    );
  }

  if (wordCount > 1200) {
    formattingScore -= 12;

    issues.push({
      id: "resume-too-long",
      title: "Resume may be too long",
      description:
        "Very long resumes can reduce readability and make important information harder to find.",
      severity: "medium",
    });

    recommendations.push(
      "Remove outdated or irrelevant content and keep the resume focused on the target role."
    );
  }

  if (bulletCount === 0) {
    formattingScore -= 15;

    issues.push({
      id: "no-bullets",
      title: "No experience bullet points detected",
      description:
        "Bullet points make achievements easier for recruiters and ATS systems to scan.",
      severity: "high",
    });

    recommendations.push(
      "Use concise bullet points for responsibilities and achievements."
    );
  } else if (bulletCount < 3) {
    formattingScore -= 6;

    issues.push({
      id: "few-bullets",
      title: "Only a few bullet points detected",
      description:
        "Your experience section may need more evidence of responsibilities and results.",
      severity: "medium",
    });
  }

  if (longParagraphCount > 0) {
    formattingScore -= Math.min(
      longParagraphCount * 6,
      18
    );

    issues.push({
      id: "long-paragraphs",
      title: "Long resume paragraphs detected",
      description:
        "Large paragraphs are difficult for recruiters to scan quickly.",
      severity: "medium",
    });

    recommendations.push(
      "Break long paragraphs into short achievement-focused bullet points."
    );
  }

  if (longSentenceCount > 0) {
    formattingScore -= Math.min(
      longSentenceCount * 3,
      12
    );

    issues.push({
      id: "long-sentences",
      title: "Long sentences detected",
      description:
        "Shorter sentences generally improve resume readability.",
      severity: "medium",
    });

    recommendations.push(
      "Shorten long sentences and keep each bullet focused on one clear achievement."
    );
  }

  if (firstPersonPronounCount > 0) {
    formattingScore -= Math.min(
      firstPersonPronounCount * 2,
      10
    );

    issues.push({
      id: "first-person-pronouns",
      title: "First-person pronouns detected",
      description:
        "Resume bullets normally omit words such as I, me, my, we, and our.",
      severity: "medium",
    });

    recommendations.push(
      "Remove first-person pronouns and begin bullets directly with strong action verbs."
    );
  }

  if (weakPhraseCount > 0) {
    formattingScore -= Math.min(
      weakPhraseCount * 4,
      16
    );

    issues.push({
      id: "weak-phrases",
      title: "Weak responsibility phrases detected",
      description:
        "Phrases such as “responsible for” and “worked on” reduce the impact of resume bullets.",
      severity: "medium",
    });

    recommendations.push(
      "Replace weak phrases with action verbs such as Developed, Led, Improved, Delivered, or Optimized."
    );
  }

  if (repeatedKeywordCount > 0) {
    formattingScore -= Math.min(
      repeatedKeywordCount * 5,
      15
    );

    issues.push({
      id: "keyword-repetition",
      title: "Possible keyword repetition detected",
      description:
        "Repeating the same terms too often can make a resume sound unnatural.",
      severity: "medium",
    });

    recommendations.push(
      "Use important keywords naturally and avoid excessive keyword repetition."
    );
  }

  if (readabilityScore < 65) {
    recommendations.push(
      "Improve readability by using shorter sentences, concise bullets, and clear section headings."
    );
  }

  recommendations.push(
    "Avoid tables, text boxes, graphics, icons, and multi-column layouts when submitting to strict ATS systems."
  );

  return {
    formattingScore:
      clampScore(formattingScore),

    readabilityScore,

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

    issues,

    recommendations: [
      ...new Set(recommendations),
    ].slice(0, 8),
  };
}