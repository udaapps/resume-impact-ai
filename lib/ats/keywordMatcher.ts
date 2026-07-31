type SkillCategory =
  | "programming"
  | "framework"
  | "database"
  | "cloud"
  | "devops"
  | "methodology"
  | "soft-skill"
  | "general";

type SkillDefinition = {
  keyword: string;
  aliases?: string[];
  category: SkillCategory;
  weight: number;
};

const SKILL_DICTIONARY: SkillDefinition[] = [
  {
    keyword: "javascript",
    category: "programming",
    weight: 10,
  },
  {
    keyword: "typescript",
    category: "programming",
    weight: 10,
  },
  {
    keyword: "python",
    category: "programming",
    weight: 10,
  },
  {
    keyword: "java",
    category: "programming",
    weight: 10,
  },
  {
    keyword: "kotlin",
    category: "programming",
    weight: 10,
  },
  {
    keyword: "c#",
    category: "programming",
    weight: 10,
  },
  {
    keyword: "c++",
    category: "programming",
    weight: 10,
  },

  {
    keyword: "react",
    aliases: ["react.js", "reactjs"],
    category: "framework",
    weight: 10,
  },
  {
    keyword: "next.js",
    aliases: ["nextjs"],
    category: "framework",
    weight: 10,
  },
  {
    keyword: "node.js",
    aliases: ["nodejs"],
    category: "framework",
    weight: 10,
  },
  {
    keyword: "angular",
    category: "framework",
    weight: 10,
  },
  {
    keyword: "vue.js",
    aliases: ["vue", "vuejs"],
    category: "framework",
    weight: 9,
  },
  {
    keyword: "spring boot",
    category: "framework",
    weight: 10,
  },

  {
    keyword: "postgresql",
    aliases: ["postgres"],
    category: "database",
    weight: 9,
  },
  {
    keyword: "mysql",
    category: "database",
    weight: 9,
  },
  {
    keyword: "mongodb",
    category: "database",
    weight: 9,
  },
  {
    keyword: "sql",
    category: "database",
    weight: 8,
  },
  {
    keyword: "redis",
    category: "database",
    weight: 8,
  },

  {
    keyword: "aws",
    aliases: ["amazon web services"],
    category: "cloud",
    weight: 10,
  },
  {
    keyword: "azure",
    aliases: ["microsoft azure"],
    category: "cloud",
    weight: 10,
  },
  {
    keyword: "google cloud",
    aliases: ["gcp"],
    category: "cloud",
    weight: 10,
  },
  {
    keyword: "cloud deployment",
    category: "cloud",
    weight: 8,
  },

  {
    keyword: "docker",
    category: "devops",
    weight: 10,
  },
  {
    keyword: "kubernetes",
    aliases: ["k8s"],
    category: "devops",
    weight: 10,
  },
  {
    keyword: "ci/cd",
    aliases: [
      "continuous integration",
      "continuous deployment",
    ],
    category: "devops",
    weight: 10,
  },
  {
    keyword: "git",
    category: "devops",
    weight: 8,
  },
  {
    keyword: "github",
    category: "devops",
    weight: 7,
  },
  {
    keyword: "gitlab",
    category: "devops",
    weight: 7,
  },
  {
    keyword: "terraform",
    category: "devops",
    weight: 9,
  },
  {
    keyword: "jenkins",
    category: "devops",
    weight: 8,
  },

  {
    keyword: "rest api",
    aliases: ["restful api", "rest apis"],
    category: "framework",
    weight: 9,
  },
  {
    keyword: "graphql",
    category: "framework",
    weight: 9,
  },
  {
    keyword: "microservices",
    category: "framework",
    weight: 9,
  },
  {
    keyword: "system design",
    category: "framework",
    weight: 8,
  },

  {
    keyword: "agile",
    category: "methodology",
    weight: 6,
  },
  {
    keyword: "scrum",
    category: "methodology",
    weight: 6,
  },
  {
    keyword: "project management",
    category: "methodology",
    weight: 7,
  },

  {
    keyword: "leadership",
    category: "soft-skill",
    weight: 5,
  },
  {
    keyword: "communication",
    category: "soft-skill",
    weight: 4,
  },
  {
    keyword: "problem solving",
    category: "soft-skill",
    weight: 5,
  },
  {
    keyword: "collaboration",
    category: "soft-skill",
    weight: 4,
  },
  {
    keyword: "customer service",
    category: "soft-skill",
    weight: 5,
  },
];

const STOP_WORDS = new Set([
  "about",
  "above",
  "after",
  "again",
  "against",
  "also",
  "and",
  "are",
  "because",
  "been",
  "before",
  "being",
  "between",
  "build",
  "candidate",
  "company",
  "develop",
  "development",
  "engineer",
  "engineering",
  "experience",
  "experienced",
  "for",
  "from",
  "have",
  "include",
  "including",
  "job",
  "looking",
  "must",
  "need",
  "position",
  "preferred",
  "required",
  "responsibilities",
  "responsibility",
  "role",
  "should",
  "skills",
  "software",
  "strong",
  "team",
  "that",
  "the",
  "their",
  "they",
  "this",
  "using",
  "will",
  "with",
  "work",
  "working",
  "your",
]);

export type KeywordItem = {
  keyword: string;
  category: SkillCategory;
  weight: number;
};

export type KeywordMatchResult = {
  extractedKeywords: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
  keywordScore: number;
  weightedMatchedScore: number;
  weightedTotalScore: number;
  matchedItems: KeywordItem[];
  missingItems: KeywordItem[];
};

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[^\w\s.+#/()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsKeyword(
  normalizedText: string,
  definition: SkillDefinition
) {
  const terms = [
    definition.keyword,
    ...(definition.aliases ?? []),
  ];

  return terms.some((term) =>
    normalizedText.includes(normalizeText(term))
  );
}

function extractDictionarySkills(
  jobDescription: string
): KeywordItem[] {
  const normalizedJob =
    normalizeText(jobDescription);

  return SKILL_DICTIONARY.filter((definition) =>
    containsKeyword(normalizedJob, definition)
  ).map((definition) => ({
    keyword: definition.keyword,
    category: definition.category,
    weight: definition.weight,
  }));
}

function extractRelevantFallbackWords(
  jobDescription: string
): KeywordItem[] {
  const words = normalizeText(jobDescription)
    .split(" ")
    .map((word) => word.trim())
    .filter(
      (word) =>
        word.length >= 5 &&
        !STOP_WORDS.has(word) &&
        !/^\d+$/.test(word)
    );

  const frequency = new Map<string, number>();

  for (const word of words) {
    frequency.set(
      word,
      (frequency.get(word) ?? 0) + 1
    );
  }

  return [...frequency.entries()]
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([keyword]) => ({
      keyword,
      category: "general" as const,
      weight: 2,
    }));
}

function removeDuplicates(items: KeywordItem[]) {
  const unique = new Map<string, KeywordItem>();

  for (const item of items) {
    const key = item.keyword.toLowerCase();

    const existing = unique.get(key);

    if (!existing || item.weight > existing.weight) {
      unique.set(key, item);
    }
  }

  return [...unique.values()];
}

export function extractJobKeywordItems(
  jobDescription: string
): KeywordItem[] {
  const dictionarySkills =
    extractDictionarySkills(jobDescription);

  const fallbackWords =
    extractRelevantFallbackWords(jobDescription);

  return removeDuplicates([
    ...dictionarySkills,
    ...fallbackWords,
  ]).slice(0, 30);
}

export function extractJobKeywords(
  jobDescription: string
) {
  return extractJobKeywordItems(jobDescription).map(
    (item) => item.keyword
  );
}

export function analyzeKeywordMatch(
  resumeText: string,
  jobDescription: string
): KeywordMatchResult {
  const normalizedResume =
    normalizeText(resumeText);

  const extractedItems =
    extractJobKeywordItems(jobDescription);

  const matchedItems = extractedItems.filter(
    (item) => {
      const definition = SKILL_DICTIONARY.find(
        (skill) =>
          skill.keyword.toLowerCase() ===
          item.keyword.toLowerCase()
      );

      if (definition) {
        return containsKeyword(
          normalizedResume,
          definition
        );
      }

      return normalizedResume.includes(
        normalizeText(item.keyword)
      );
    }
  );

  const missingItems = extractedItems.filter(
    (item) =>
      !matchedItems.some(
        (matched) =>
          matched.keyword === item.keyword
      )
  );

  const weightedTotalScore =
    extractedItems.reduce(
      (total, item) => total + item.weight,
      0
    );

  const weightedMatchedScore =
    matchedItems.reduce(
      (total, item) => total + item.weight,
      0
    );

  const keywordScore =
    weightedTotalScore === 0
      ? 0
      : Math.round(
          (weightedMatchedScore /
            weightedTotalScore) *
            100
        );

  return {
    extractedKeywords: extractedItems.map(
      (item) => item.keyword
    ),

    matchedKeywords: matchedItems.map(
      (item) => item.keyword
    ),

    missingKeywords: missingItems.map(
      (item) => item.keyword
    ),

    keywordScore,
    weightedMatchedScore,
    weightedTotalScore,
    matchedItems,
    missingItems,
  };
}