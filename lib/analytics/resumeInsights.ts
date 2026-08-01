import type {
  AtsAnalysisHistoryItem,
} from "@/lib/ats/analysisHistory";

export type ResumeInsightTone =
  | "positive"
  | "warning"
  | "info";

export type ResumeTrendDirection =
  | "improving"
  | "declining"
  | "stable"
  | "baseline";

export type ResumeMetricKey =
  | "overallScore"
  | "keywordScore"
  | "skillsScore"
  | "experienceScore"
  | "structureScore"
  | "bulletScore"
  | "achievementScore"
  | "formattingScore"
  | "readabilityScore";

export type ResumeInsightItem = {
  id: string;
  title: string;
  description: string;
  tone: ResumeInsightTone;
  priority: number;
};

export type ResumeMetricSummary = {
  key: ResumeMetricKey;
  label: string;
  average: number;
};

export type MissingKeywordTrend = {
  keyword: string;
  count: number;
};

export type ResumeInsightsSummary = {
  analysisCount: number;

  latestScore: number;
  previousScore: number;

  changeFromPrevious: number;
  changeFromFirst: number;

  trend: ResumeTrendDirection;

  strongestMetric:
    | ResumeMetricSummary
    | null;

  weakestMetric:
    | ResumeMetricSummary
    | null;

  scoreDeviation: number;

  consistency:
    | "high"
    | "moderate"
    | "low";

  recentActivityCount: number;

  topMissingKeywords:
    MissingKeywordTrend[];

  insights: ResumeInsightItem[];
};

const METRICS: Array<{
  key: ResumeMetricKey;
  label: string;
}> = [
  {
    key: "overallScore",
    label: "Overall ATS",
  },
  {
    key: "keywordScore",
    label: "Keyword Coverage",
  },
  {
    key: "skillsScore",
    label: "Skills Match",
  },
  {
    key: "experienceScore",
    label: "Experience Match",
  },
  {
    key: "structureScore",
    label: "Resume Structure",
  },
  {
    key: "bulletScore",
    label: "Resume Bullets",
  },
  {
    key: "achievementScore",
    label: "Achievements",
  },
  {
    key: "formattingScore",
    label: "ATS Formatting",
  },
  {
    key: "readabilityScore",
    label: "Readability",
  },
];

function clampScore(
  value: unknown
): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(
      100,
      Math.round(value)
    )
  );
}

function calculateAverage(
  values: number[]
): number {
  if (values.length === 0) {
    return 0;
  }

  const total = values.reduce(
    (sum, value) =>
      sum + value,
    0
  );

  return Math.round(
    total / values.length
  );
}

function calculateStandardDeviation(
  values: number[]
): number {
  if (values.length < 2) {
    return 0;
  }

  const average =
    values.reduce(
      (sum, value) =>
        sum + value,
      0
    ) / values.length;

  const variance =
    values.reduce(
      (sum, value) => {
        const difference =
          value - average;

        return (
          sum +
          difference * difference
        );
      },
      0
    ) / values.length;

  return Math.round(
    Math.sqrt(variance)
  );
}

function getItemDate(
  item: AtsAnalysisHistoryItem
): string {
  return (
    item.updatedAt ||
    item.createdAt
  );
}

function getTrendDirection(
  analysisCount: number,
  changeFromPrevious: number
): ResumeTrendDirection {
  if (analysisCount < 2) {
    return "baseline";
  }

  if (changeFromPrevious >= 3) {
    return "improving";
  }

  if (changeFromPrevious <= -3) {
    return "declining";
  }

  return "stable";
}

function getConsistency(
  deviation: number
): "high" | "moderate" | "low" {
  if (deviation <= 4) {
    return "high";
  }

  if (deviation <= 9) {
    return "moderate";
  }

  return "low";
}

function getMetricSummaries(
  history: AtsAnalysisHistoryItem[]
): ResumeMetricSummary[] {
  return METRICS.map(
    (metric) => ({
      key: metric.key,
      label: metric.label,

      average:
        calculateAverage(
          history.map(
            (item) =>
              clampScore(
                item.result[
                  metric.key
                ]
              )
          )
        ),
    })
  );
}

function getTopMissingKeywords(
  history: AtsAnalysisHistoryItem[]
): MissingKeywordTrend[] {
  const frequency =
    new Map<string, number>();

  for (const item of history) {
    const uniqueKeywords =
      new Set(
        item.result
          .missingKeywords
          .map((keyword) =>
            keyword
              .trim()
              .toLowerCase()
          )
          .filter(Boolean)
      );

    for (
      const keyword
      of uniqueKeywords
    ) {
      frequency.set(
        keyword,
        (
          frequency.get(keyword) ??
          0
        ) + 1
      );
    }
  }

  return [
    ...frequency.entries(),
  ]
    .sort(
      (first, second) =>
        second[1] - first[1]
    )
    .slice(0, 5)
    .map(
      ([keyword, count]) => ({
        keyword,
        count,
      })
    );
}

function getRecentActivityCount(
  history: AtsAnalysisHistoryItem[]
): number {
  const sevenDaysAgo =
    new Date();

  sevenDaysAgo.setHours(
    0,
    0,
    0,
    0
  );

  sevenDaysAgo.setDate(
    sevenDaysAgo.getDate() - 6
  );

  return history.filter(
    (item) => {
      const date =
        new Date(
          getItemDate(item)
        );

      return (
        !Number.isNaN(
          date.getTime()
        ) &&
        date >= sevenDaysAgo
      );
    }
  ).length;
}

function createInsightItems(params: {
  analysisCount: number;
  latestScore: number;
  changeFromPrevious: number;
  changeFromFirst: number;
  strongestMetric:
    | ResumeMetricSummary
    | null;
  weakestMetric:
    | ResumeMetricSummary
    | null;
  consistency:
    | "high"
    | "moderate"
    | "low";
  topMissingKeywords:
    MissingKeywordTrend[];
}): ResumeInsightItem[] {
  const insights:
    ResumeInsightItem[] = [];

  if (params.analysisCount === 1) {
    insights.push({
      id: "baseline-created",

      title:
        "Your performance baseline is ready",

      description:
        `Your first saved ATS score is ${params.latestScore}/100. Complete another analysis after improving the resume to measure progress.`,

      tone: "info",
      priority: 1,
    });
  }

  if (
    params.analysisCount >= 2 &&
    params.changeFromPrevious >= 3
  ) {
    insights.push({
      id: "score-improving",

      title:
        "Your ATS score is improving",

      description:
        `Your latest analysis increased by ${params.changeFromPrevious} points compared with the previous version.`,

      tone: "positive",
      priority: 1,
    });
  }

  if (
    params.analysisCount >= 2 &&
    params.changeFromPrevious <= -3
  ) {
    insights.push({
      id: "score-declining",

      title:
        "Your latest score declined",

      description:
        `Your latest analysis decreased by ${Math.abs(
          params.changeFromPrevious
        )} points. Review the job description and restore relevant keywords or sections removed from the resume.`,

      tone: "warning",
      priority: 1,
    });
  }

  if (
    params.analysisCount >= 2 &&
    Math.abs(
      params.changeFromPrevious
    ) < 3
  ) {
    insights.push({
      id: "score-stable",

      title:
        "Your score is currently stable",

      description:
        "The latest ATS score is close to the previous result. Focus on the weakest scoring category for the next improvement.",

      tone: "info",
      priority: 2,
    });
  }

  if (
    params.weakestMetric &&
    params.weakestMetric.average < 75
  ) {
    insights.push({
      id: "weakest-metric",

      title:
        `${params.weakestMetric.label} needs attention`,

      description:
        `This is currently your weakest area with an average score of ${params.weakestMetric.average}/100. Prioritize this category before your next application.`,

      tone: "warning",
      priority: 1,
    });
  }

  if (params.strongestMetric) {
    insights.push({
      id: "strongest-metric",

      title:
        `${params.strongestMetric.label} is your strongest area`,

      description:
        `Your average ${params.strongestMetric.label.toLowerCase()} score is ${params.strongestMetric.average}/100. Preserve this strength while improving weaker sections.`,

      tone: "positive",
      priority: 3,
    });
  }

  const mostMissingKeyword =
    params.topMissingKeywords[0];

  if (mostMissingKeyword) {
    insights.push({
      id: "missing-keyword",

      title:
        `Frequently missing keyword: ${mostMissingKeyword.keyword}`,

      description:
        `This keyword was missing from ${mostMissingKeyword.count} saved analysis${
          mostMissingKeyword.count === 1
            ? ""
            : "es"
        }. Add it only when it accurately reflects your experience.`,

      tone: "warning",
      priority: 2,
    });
  }

  if (
    params.analysisCount >= 3 &&
    params.consistency === "high"
  ) {
    insights.push({
      id: "high-consistency",

      title:
        "Your resume performance is consistent",

      description:
        "Your ATS scores remain within a narrow range. Small, targeted improvements may now produce better results than major rewrites.",

      tone: "positive",
      priority: 4,
    });
  }

  if (
    params.analysisCount >= 3 &&
    params.consistency === "low"
  ) {
    insights.push({
      id: "low-consistency",

      title:
        "Your scores vary significantly",

      description:
        "Large score differences may indicate that some resume versions are better aligned with their target roles. Compare your strongest and weakest reports.",

      tone: "info",
      priority: 3,
    });
  }

  if (
    params.analysisCount >= 2 &&
    params.changeFromFirst > 0
  ) {
    insights.push({
      id: "long-term-progress",

      title:
        "Long-term progress detected",

      description:
        `Your latest ATS score is ${params.changeFromFirst} points higher than your first saved analysis.`,

      tone: "positive",
      priority: 3,
    });
  }

  return insights
    .sort(
      (first, second) =>
        first.priority -
        second.priority
    )
    .slice(0, 5);
}

export function generateResumeInsights(
  history: AtsAnalysisHistoryItem[]
): ResumeInsightsSummary {
  const sortedHistory =
    [...history].sort(
      (first, second) =>
        new Date(
          getItemDate(second)
        ).getTime() -
        new Date(
          getItemDate(first)
        ).getTime()
    );

  if (
    sortedHistory.length === 0
  ) {
    return {
      analysisCount: 0,

      latestScore: 0,
      previousScore: 0,

      changeFromPrevious: 0,
      changeFromFirst: 0,

      trend: "baseline",

      strongestMetric: null,
      weakestMetric: null,

      scoreDeviation: 0,
      consistency: "high",

      recentActivityCount: 0,

      topMissingKeywords: [],

      insights: [],
    };
  }

  const latest =
    sortedHistory[0];

  const previous =
    sortedHistory[1] ??
    latest;

  const first =
    sortedHistory[
      sortedHistory.length - 1
    ];

  const latestScore =
    clampScore(
      latest.result.overallScore
    );

  const previousScore =
    clampScore(
      previous.result.overallScore
    );

  const firstScore =
    clampScore(
      first.result.overallScore
    );

  const changeFromPrevious =
    latestScore -
    previousScore;

  const changeFromFirst =
    latestScore -
    firstScore;

  const metricSummaries =
    getMetricSummaries(
      sortedHistory
    );

  const rankedMetrics =
    [...metricSummaries].sort(
      (firstMetric, secondMetric) =>
        secondMetric.average -
        firstMetric.average
    );

  const strongestMetric =
    rankedMetrics[0] ?? null;

  const weakestMetric =
    rankedMetrics[
      rankedMetrics.length - 1
    ] ?? null;

  const overallScores =
    sortedHistory.map(
      (item) =>
        clampScore(
          item.result.overallScore
        )
    );

  const scoreDeviation =
    calculateStandardDeviation(
      overallScores
    );

  const consistency =
    getConsistency(
      scoreDeviation
    );

  const topMissingKeywords =
    getTopMissingKeywords(
      sortedHistory
    );

  const insights =
    createInsightItems({
      analysisCount:
        sortedHistory.length,

      latestScore,

      changeFromPrevious,
      changeFromFirst,

      strongestMetric,
      weakestMetric,

      consistency,

      topMissingKeywords,
    });

  return {
    analysisCount:
      sortedHistory.length,

    latestScore,
    previousScore,

    changeFromPrevious,
    changeFromFirst,

    trend:
      getTrendDirection(
        sortedHistory.length,
        changeFromPrevious
      ),

    strongestMetric,
    weakestMetric,

    scoreDeviation,
    consistency,

    recentActivityCount:
      getRecentActivityCount(
        sortedHistory
      ),

    topMissingKeywords,

    insights,
  };
}