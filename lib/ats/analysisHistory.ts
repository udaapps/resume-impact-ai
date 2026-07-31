export type AtsHistoryKeywordItem = {
  keyword: string;
  category: string;
  weight: number;
};

export type AtsHistoryFormattingIssue = {
  id: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
};

export type AtsHistorySection = {
  key: string;
  label: string;
  found: boolean;
  required: boolean;
};

export type AtsHistoryAnalysisResult = {
  overallScore: number;

  keywordScore: number;
  skillsScore: number;
  experienceScore: number;
  structureScore: number;
  bulletScore: number;
  achievementScore: number;
  formattingScore: number;
  readabilityScore: number;

  achievementMetrics: number;
  achievementActionVerbs: number;
  achievementCount: number;

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

  formattingIssues: AtsHistoryFormattingIssue[];

  matchedKeywords: string[];
  missingKeywords: string[];

  matchedItems: AtsHistoryKeywordItem[];
  missingItems: AtsHistoryKeywordItem[];

  sections: AtsHistorySection[];
  foundSections: string[];
  missingSections: string[];
  requiredMissingSections: string[];

  recommendations: string[];
};

export type AtsAnalysisHistoryItem = {
  id: string;
  createdAt: string;
  updatedAt: string;

  title: string;
  resumeText: string;
  jobDescription: string;

  result: AtsHistoryAnalysisResult;
};

const ATS_HISTORY_STORAGE_KEY =
  "resume-impact-ai-ats-history";

const ATS_HISTORY_LIMIT = 20;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function createHistoryId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `ats-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

function createHistoryTitle(
  jobDescription: string
): string {
  const lines = jobDescription
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const firstLine =
    lines[0] || "ATS Resume Analysis";

  const cleanTitle = firstLine
    .replace(/\s+/g, " ")
    .slice(0, 70);

  return cleanTitle.length > 0
    ? cleanTitle
    : "ATS Resume Analysis";
}

function safelyParseHistory(
  value: string | null
): AtsAnalysisHistoryItem[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (
        item
      ): item is AtsAnalysisHistoryItem =>
        Boolean(
          item &&
            typeof item === "object" &&
            typeof item.id === "string" &&
            typeof item.createdAt === "string" &&
            typeof item.resumeText === "string" &&
            typeof item.jobDescription === "string" &&
            item.result &&
            typeof item.result === "object"
        )
    );
  } catch (error) {
    console.error(
      "Unable to parse ATS history:",
      error
    );

    return [];
  }
}

export function getAtsAnalysisHistory(): AtsAnalysisHistoryItem[] {
  if (!isBrowser()) {
    return [];
  }

  const storedValue =
    window.localStorage.getItem(
      ATS_HISTORY_STORAGE_KEY
    );

  return safelyParseHistory(storedValue)
    .sort(
      (first, second) =>
        new Date(
          second.updatedAt ||
            second.createdAt
        ).getTime() -
        new Date(
          first.updatedAt ||
            first.createdAt
        ).getTime()
    )
    .slice(0, ATS_HISTORY_LIMIT);
}

export function saveAtsAnalysisHistory(params: {
  resumeText: string;
  jobDescription: string;
  result: AtsHistoryAnalysisResult;
  title?: string;
}): AtsAnalysisHistoryItem {
  if (!isBrowser()) {
    throw new Error(
      "ATS history is only available in the browser."
    );
  }

  const now = new Date().toISOString();

  const historyItem: AtsAnalysisHistoryItem = {
    id: createHistoryId(),
    createdAt: now,
    updatedAt: now,

    title:
      params.title?.trim() ||
      createHistoryTitle(
        params.jobDescription
      ),

    resumeText: params.resumeText.trim(),

    jobDescription:
      params.jobDescription.trim(),

    result: params.result,
  };

  const currentHistory =
    getAtsAnalysisHistory();

  const nextHistory = [
    historyItem,
    ...currentHistory,
  ].slice(0, ATS_HISTORY_LIMIT);

  window.localStorage.setItem(
    ATS_HISTORY_STORAGE_KEY,
    JSON.stringify(nextHistory)
  );

  return historyItem;
}

export function deleteAtsAnalysisHistory(
  historyId: string
): AtsAnalysisHistoryItem[] {
  if (!isBrowser()) {
    return [];
  }

  const nextHistory =
    getAtsAnalysisHistory().filter(
      (item) => item.id !== historyId
    );

  window.localStorage.setItem(
    ATS_HISTORY_STORAGE_KEY,
    JSON.stringify(nextHistory)
  );

  return nextHistory;
}

export function clearAtsAnalysisHistory(): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(
    ATS_HISTORY_STORAGE_KEY
  );
}

export function updateAtsHistoryTitle(
  historyId: string,
  title: string
): AtsAnalysisHistoryItem[] {
  if (!isBrowser()) {
    return [];
  }

  const cleanTitle =
    title.trim().slice(0, 80);

  const nextHistory =
    getAtsAnalysisHistory().map(
      (item) =>
        item.id === historyId
          ? {
              ...item,
              title:
                cleanTitle ||
                item.title,
              updatedAt:
                new Date().toISOString(),
            }
          : item
    );

  window.localStorage.setItem(
    ATS_HISTORY_STORAGE_KEY,
    JSON.stringify(nextHistory)
  );

  return nextHistory;
}

export function getAtsHistoryItem(
  historyId: string
): AtsAnalysisHistoryItem | null {
  return (
    getAtsAnalysisHistory().find(
      (item) => item.id === historyId
    ) ?? null
  );
}