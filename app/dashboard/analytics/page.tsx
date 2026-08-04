"use client";

import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  FileText,
  FileSearch,
  Gauge,
  History,
  Loader2,
  RefreshCw,
  Search,
  Sparkles,
  Target,
  Trash2,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import {
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

import {
  exportAtsHistoryItemPdf,
} from "@/lib/ats/exportAtsPdf";

import type {
  AtsAnalysisHistoryItem,
} from "@/lib/ats/analysisHistory";

import {
  loadResumeAnalyses,
  type ResumeAnalysisRecord,
} from "@/lib/supabase/resume-analyses";
import {
  generateResumeInsights,
  type ResumeInsightTone,
  type ResumeTrendDirection,
} from "@/lib/analytics/resumeInsights";
import {
  downloadAnalyticsSummaryPdf,
  downloadAnalyticsSummaryTxt,
} from "@/lib/analytics/exportAnalyticsSummary";

type MetricKey =
  | "overallScore"
  | "keywordScore"
  | "structureScore"
  | "achievementScore"
  | "formattingScore"
  | "readabilityScore";

type ChartMetricOption = {
  key: MetricKey;
  label: string;
};

type TrendPoint = {
  id: string;
  label: string;
  fullDate: string;
  score: number;
};

type KeywordFrequency = {
  keyword: string;
  count: number;
  percentage: number;
};

type WeeklyActivityItem = {
  label: string;
  dateKey: string;
  count: number;
};
type AiAnalyticsUsage = {
  limit: number;
  used: number;
  remaining: number;
  resetsAt: string;
};

type AiAnalyticsSummaryResponse = {
  summary: string;
  source: "ai" | "cache";
  cached: boolean;
  generatedAt: string;
  usage: AiAnalyticsUsage;
};

type AiAnalyticsStatusResponse = {
  summary: string | null;
  source: "cache";
  cached: boolean;
  stale: boolean;
  generatedAt: string | null;
  analysisCount: number | null;
  latestScore: number | null;
  usage: AiAnalyticsUsage;
};

type AiAnalyticsErrorResponse = {
  error?: string;
  code?: string;
  usage?: AiAnalyticsUsage;
};

type AiAnalyticsHistoryItem = {
  id: string;
  summary: string;
  generatedAt: string;
  model: string;
  analysisCount: number;
  latestScore: number;
  usageDay: string;
};

type AiAnalyticsHistoryPagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

type AiAnalyticsHistorySort =
  | "newest"
  | "oldest"
  | "score_desc"
  | "score_asc";

type AiAnalyticsHistoryResponse = {
  items: AiAnalyticsHistoryItem[];
  allTotal: number;
  pagination: AiAnalyticsHistoryPagination;
  filters: {
    search: string;
    fromDate: string | null;
    toDate: string | null;
    sort: AiAnalyticsHistorySort;
  };
};

type AiAnalyticsHistoryDeleteResponse = {
  success: boolean;
  deletedCount: number;
  deletedIds: string[];
};

type AiSummaryDeleteTarget =
  | {
      mode: "single";
      item: AiAnalyticsHistoryItem;
    }
  | {
      mode: "all";
    };

const CHART_METRICS: ChartMetricOption[] = [
  {
    key: "overallScore",
    label: "Overall ATS",
  },
  {
    key: "keywordScore",
    label: "Keywords",
  },
  {
    key: "structureScore",
    label: "Structure",
  },
  {
    key: "achievementScore",
    label: "Achievements",
  },
  {
    key: "formattingScore",
    label: "Formatting",
  },
  {
    key: "readabilityScore",
    label: "Readability",
  },
];

function clampScore(
  value: number
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(100, Math.round(value))
  );
}

function calculateAverage(
  values: number[]
): number {
  if (values.length === 0) {
    return 0;
  }

  return Math.round(
    values.reduce(
      (total, value) =>
        total + value,
      0
    ) / values.length
  );
}

function formatDate(
  dateValue: string
): string {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat(
    undefined,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  ).format(date);
}

function formatShortDate(
  dateValue: string
): string {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(
    undefined,
    {
      month: "short",
      day: "numeric",
    }
  ).format(date);
}

function formatResetTime(
  dateValue: string
): string {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "tomorrow";
  }

  return new Intl.DateTimeFormat(
    undefined,
    {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }
  ).format(date);
}

function getScoreLabel(
  score: number
): string {
  if (score >= 80) {
    return "Strong";
  }

  if (score >= 60) {
    return "Good";
  }

  if (score >= 40) {
    return "Improving";
  }

  return "Low";
}

function getScoreClasses(
  score: number
) {
  if (score >= 80) {
    return {
      text: "text-emerald-300",
      border:
        "border-emerald-500/30",
      background:
        "bg-emerald-500/10",
      progress:
        "bg-emerald-500",
    };
  }

  if (score >= 60) {
    return {
      text: "text-blue-300",
      border:
        "border-blue-500/30",
      background:
        "bg-blue-500/10",
      progress:
        "bg-blue-500",
    };
  }

  if (score >= 40) {
    return {
      text: "text-amber-300",
      border:
        "border-amber-500/30",
      background:
        "bg-amber-500/10",
      progress:
        "bg-amber-500",
    };
  }

  return {
    text: "text-red-300",
    border:
      "border-red-500/30",
    background:
      "bg-red-500/10",
    progress:
      "bg-red-500",
  };
}

function getItemDate(
  item: AtsAnalysisHistoryItem
): string {
  return (
    item.updatedAt ||
    item.createdAt
  );
}

function getMetricValue(
  item: AtsAnalysisHistoryItem,
  metric: MetricKey
): number {
  return clampScore(
    item.result[metric]
  );
}
function getNumber(
  value: unknown,
  fallback = 0
): number {
  return typeof value === "number" &&
    Number.isFinite(value)
    ? value
    : fallback;
}

function mapCloudAnalysisToHistory(
  record: ResumeAnalysisRecord
): AtsAnalysisHistoryItem {
  const rawResult =
    record.analysisResult;

  return {
    id: record.id,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,

    title: record.title,
    resumeText: record.resumeText,
    jobDescription:
      record.jobDescription,

    result: {
      overallScore:
        record.overallScore,

      keywordScore:
        record.keywordScore,

      skillsScore:
        record.skillsScore,

      experienceScore:
        record.experienceScore,

      structureScore:
        record.structureScore,

      bulletScore:
        record.bulletScore,

      achievementScore:
        record.achievementScore,

      formattingScore:
        record.formattingScore,

      readabilityScore:
        record.readabilityScore,

      achievementMetrics:
        record.achievementMetrics,

      achievementActionVerbs:
        record.achievementActionVerbs,

      achievementCount:
        record.achievementCount,

      wordCount:
        record.wordCount,

      bulletCount:
        record.bulletCount,

      longParagraphCount:
        record.longParagraphCount,

      longSentenceCount:
        record.longSentenceCount,

      hasEmail:
        record.hasEmail,

      hasPhone:
        record.hasPhone,

      hasLinkedIn:
        record.hasLinkedIn,

      firstPersonPronounCount:
        getNumber(
          rawResult
            .firstPersonPronounCount
        ),

      weakPhraseCount:
        record.weakPhraseCount,

      repeatedKeywordCount:
        getNumber(
          rawResult
            .repeatedKeywordCount
        ),

      formattingIssues:
        record.formattingIssues.map(
          (issue, index) => ({
            id:
              typeof issue.id ===
              "string"
                ? issue.id
                : `formatting-${index}`,

            title:
              typeof issue.title ===
              "string"
                ? issue.title
                : "Formatting issue",

            description:
              typeof issue.description ===
              "string"
                ? issue.description
                : "",

            severity:
              issue.severity === "high" ||
              issue.severity ===
                "medium" ||
              issue.severity === "low"
                ? issue.severity
                : "low",
          })
        ),

      matchedKeywords:
        record.matchedKeywords,

      missingKeywords:
        record.missingKeywords,

      matchedItems:
        record.matchedItems
          .map((item) => ({
            keyword:
              typeof item.keyword ===
              "string"
                ? item.keyword
                : typeof item.name ===
                    "string"
                  ? item.name
                  : "",

            category:
              typeof item.category ===
              "string"
                ? item.category
                : "general",

            weight:
              getNumber(
                item.weight,
                1
              ),
          }))
          .filter(
            (item) =>
              item.keyword.length > 0
          ),

      missingItems:
        record.missingItems
          .map((item) => ({
            keyword:
              typeof item.keyword ===
              "string"
                ? item.keyword
                : typeof item.name ===
                    "string"
                  ? item.name
                  : "",

            category:
              typeof item.category ===
              "string"
                ? item.category
                : "general",

            weight:
              getNumber(
                item.weight,
                1
              ),
          }))
          .filter(
            (item) =>
              item.keyword.length > 0
          ),

      sections:
        record.sections.map(
          (section, index) => {
            const sectionName =
              typeof section.name ===
              "string"
                ? section.name
                : typeof section
                      .section ===
                    "string"
                  ? section.section
                  : `Section ${index + 1}`;

            return {
              key:
                typeof section.key ===
                "string"
                  ? section.key
                  : sectionName
                      .toLowerCase()
                      .replace(
                        /\s+/g,
                        "-"
                      ),

              label:
                typeof section.label ===
                "string"
                  ? section.label
                  : sectionName,

              found:
                section.found === true,

              required:
                section.required ===
                true,
            };
          }
        ),

      foundSections:
        record.foundSections,

      missingSections:
        record.missingSections,

      requiredMissingSections:
        record.requiredMissingSections,

      recommendations:
        record.recommendations,
    },
  };
}

function createTrendPoints(
  history: AtsAnalysisHistoryItem[],
  metric: MetricKey
): TrendPoint[] {
  return history
    .slice(0, 12)
    .reverse()
    .map((item) => ({
      id: item.id,

      label: formatShortDate(
        getItemDate(item)
      ),

      fullDate: formatDate(
        getItemDate(item)
      ),

      score: getMetricValue(
        item,
        metric
      ),
    }));
}

function createChartPath(
  points: TrendPoint[],
  width: number,
  height: number,
  paddingLeft: number,
  paddingRight: number,
  paddingTop: number,
  paddingBottom: number
): string {
  if (points.length === 0) {
    return "";
  }

  const usableWidth =
    width -
    paddingLeft -
    paddingRight;

  const usableHeight =
    height -
    paddingTop -
    paddingBottom;

  return points
    .map((point, index) => {
      const x =
        points.length === 1
          ? paddingLeft +
            usableWidth / 2
          : paddingLeft +
            (index /
              (points.length - 1)) *
              usableWidth;

      const y =
        paddingTop +
        usableHeight -
        (point.score / 100) *
          usableHeight;

      return `${
        index === 0 ? "M" : "L"
      } ${x} ${y}`;
    })
    .join(" ");
}

function createKeywordFrequency(
  history: AtsAnalysisHistoryItem[]
): KeywordFrequency[] {
  const frequency =
    new Map<string, number>();

  for (const item of history) {
    const uniqueKeywords =
      new Set(
        item.result.missingKeywords
          .map((keyword) =>
            keyword
              .trim()
              .toLowerCase()
          )
          .filter(Boolean)
      );

    for (const keyword of uniqueKeywords) {
      frequency.set(
        keyword,
        (frequency.get(keyword) ?? 0) +
          1
      );
    }
  }

  const maximumCount = Math.max(
    1,
    ...frequency.values()
  );

  return [...frequency.entries()]
    .sort(
      (first, second) =>
        second[1] - first[1]
    )
    .slice(0, 10)
    .map(
      ([keyword, count]) => ({
        keyword,
        count,

        percentage:
          Math.round(
            (count / maximumCount) *
              100
          ),
      })
    );
}

function createWeeklyActivity(
  history: AtsAnalysisHistoryItem[]
): WeeklyActivityItem[] {
  const today = new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );

  const activityMap =
    new Map<string, number>();

  for (const item of history) {
    const date =
      new Date(getItemDate(item));

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      continue;
    }

    const dateKey = [
      date.getFullYear(),
      String(
        date.getMonth() + 1
      ).padStart(2, "0"),
      String(
        date.getDate()
      ).padStart(2, "0"),
    ].join("-");

    activityMap.set(
      dateKey,
      (activityMap.get(dateKey) ??
        0) + 1
    );
  }

  return Array.from(
    {
      length: 7,
    },
    (_, index) => {
      const date = new Date(
        today
      );

      date.setDate(
        today.getDate() -
          (6 - index)
      );

      const dateKey = [
        date.getFullYear(),
        String(
          date.getMonth() + 1
        ).padStart(2, "0"),
        String(
          date.getDate()
        ).padStart(2, "0"),
      ].join("-");

      return {
        label:
          new Intl.DateTimeFormat(
            undefined,
            {
              weekday: "short",
            }
          ).format(date),

        dateKey,

        count:
          activityMap.get(dateKey) ??
          0,
      };
    }
  );
}

function MetricCard({
  title,
  value,
  helperText,
  icon: Icon,
}: {
  title: string;
  value: number;
  helperText: string;

  icon: React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;
}) {
  const style =
    getScoreClasses(value);

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <div className="mt-2 flex items-end gap-1">
            <p className="text-3xl font-bold text-white">
              {value}
            </p>

            <span className="pb-1 text-xs text-slate-500">
              /100
            </span>
          </div>
        </div>

        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl border ${style.border} ${style.background} ${style.text}`}
        >
          <Icon
            aria-hidden
            className="h-5 w-5"
          />
        </span>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        {helperText}
      </p>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${style.progress}`}
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </article>
  );
}
function getInsightToneClasses(
  tone: ResumeInsightTone
) {
  if (tone === "positive") {
    return {
      border:
        "border-emerald-500/30",
      background:
        "bg-emerald-500/10",
      title:
        "text-emerald-300",
      icon:
        "bg-emerald-500/15 text-emerald-300",
    };
  }

  if (tone === "warning") {
    return {
      border:
        "border-amber-500/30",
      background:
        "bg-amber-500/10",
      title:
        "text-amber-300",
      icon:
        "bg-amber-500/15 text-amber-300",
    };
  }

  return {
    border:
      "border-blue-500/30",
    background:
      "bg-blue-500/10",
    title:
      "text-blue-300",
    icon:
      "bg-blue-500/15 text-blue-300",
  };
}

function getTrendLabel(
  trend: ResumeTrendDirection
): string {
  if (trend === "improving") {
    return "Improving";
  }

  if (trend === "declining") {
    return "Declining";
  }

  if (trend === "stable") {
    return "Stable";
  }

  return "Baseline";
}

function getTrendClasses(
  trend: ResumeTrendDirection
): string {
  if (trend === "improving") {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
  }

  if (trend === "declining") {
    return "border-amber-500/30 bg-amber-500/10 text-amber-300";
  }

  return "border-blue-500/30 bg-blue-500/10 text-blue-300";
}

function EmptyAnalytics() {
  return (
    <section className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center sm:p-12">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-300">
        <BarChart3
          aria-hidden
          className="h-8 w-8"
        />
      </span>

      <h2 className="mt-5 text-2xl font-bold text-white">
        No analytics data yet
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-400">
        Complete at least one ATS
        resume analysis to view score
        trends, missing keyword
        frequency, weekly activity, and
        progress insights.
      </p>

      <Link
        href="/ats-resume-checker"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
      >
        Start ATS Analysis

        <ArrowRight
          aria-hidden
          className="h-4 w-4"
        />
      </Link>
    </section>
  );
}

export default function AnalyticsPage() {
  const [
    history,
    setHistory,
  ] = useState<
    AtsAnalysisHistoryItem[]
  >([]);

  const [
    historyLoaded,
    setHistoryLoaded,
  ] = useState(false);

  const [
    selectedMetric,
    setSelectedMetric,
  ] = useState<MetricKey>(
    "overallScore"
  );

  const [
    exportingId,
    setExportingId,
  ] = useState<string | null>(
    null
  );
  const [
    aiSummary,
    setAiSummary,
  ] = useState<string | null>(
    null
  );

  const [
    aiSummaryGeneratedAt,
    setAiSummaryGeneratedAt,
  ] = useState<string | null>(
    null
  );

  const [
    isGeneratingAiSummary,
    setIsGeneratingAiSummary,
  ] = useState(false);

  const [
    aiSummarySource,
    setAiSummarySource,
  ] = useState<
    "ai" | "cache" | null
  >(null);

  const [
    aiUsage,
    setAiUsage,
  ] = useState<AiAnalyticsUsage | null>(
    null
  );

  const [
    aiSummaryIsStale,
    setAiSummaryIsStale,
  ] = useState(false);

  const [
    isLoadingAiSummaryStatus,
    setIsLoadingAiSummaryStatus,
  ] = useState(true);

  const [
    aiSummaryHistory,
    setAiSummaryHistory,
  ] = useState<AiAnalyticsHistoryItem[]>(
    []
  );

  const [
    isLoadingAiSummaryHistory,
    setIsLoadingAiSummaryHistory,
  ] = useState(false);

  const [
    aiSummaryHistoryAllTotal,
    setAiSummaryHistoryAllTotal,
  ] = useState(0);

  const [
    aiSummaryHistoryPagination,
    setAiSummaryHistoryPagination,
  ] = useState<AiAnalyticsHistoryPagination>({
    page: 1,
    pageSize: 5,
    total: 0,
    totalPages: 1,
  });

  const [
    aiSummaryHistoryPage,
    setAiSummaryHistoryPage,
  ] = useState(1);

  const [
    aiSummaryHistoryPageSize,
    setAiSummaryHistoryPageSize,
  ] = useState(5);

  const [
    aiSummaryHistorySort,
    setAiSummaryHistorySort,
  ] = useState<AiAnalyticsHistorySort>(
    "newest"
  );

  const [
    isExportingAiSummaryHistoryCsv,
    setIsExportingAiSummaryHistoryCsv,
  ] = useState(false);

  const [
    aiSummaryHistorySearchInput,
    setAiSummaryHistorySearchInput,
  ] = useState("");

  const [
    aiSummaryHistoryFromDateInput,
    setAiSummaryHistoryFromDateInput,
  ] = useState("");

  const [
    aiSummaryHistoryToDateInput,
    setAiSummaryHistoryToDateInput,
  ] = useState("");

  const [
    aiSummaryHistorySearch,
    setAiSummaryHistorySearch,
  ] = useState("");

  const [
    aiSummaryHistoryFromDate,
    setAiSummaryHistoryFromDate,
  ] = useState("");

  const [
    aiSummaryHistoryToDate,
    setAiSummaryHistoryToDate,
  ] = useState("");

  const [
    isAiSummaryHistoryOpen,
    setIsAiSummaryHistoryOpen,
  ] = useState(false);

  const [
    currentAiSummaryGeneratedAt,
    setCurrentAiSummaryGeneratedAt,
  ] = useState<string | null>(null);

  const [
    aiSummaryDeleteTarget,
    setAiSummaryDeleteTarget,
  ] = useState<AiSummaryDeleteTarget | null>(
    null
  );

  const [
    isDeletingAiSummaryHistory,
    setIsDeletingAiSummaryHistory,
  ] = useState(false);

  const aiSummaryHistoryUrl =
    useMemo(() => {
      const params =
        new URLSearchParams({
          page: String(
            aiSummaryHistoryPage
          ),
          pageSize: String(
            aiSummaryHistoryPageSize
          ),
          sort: aiSummaryHistorySort,
        });

      if (aiSummaryHistorySearch) {
        params.set(
          "search",
          aiSummaryHistorySearch
        );
      }

      if (aiSummaryHistoryFromDate) {
        params.set(
          "from",
          aiSummaryHistoryFromDate
        );
      }

      if (aiSummaryHistoryToDate) {
        params.set(
          "to",
          aiSummaryHistoryToDate
        );
      }

      return `/api/analytics-insights/history?${params.toString()}`;
    }, [
      aiSummaryHistoryPage,
      aiSummaryHistoryPageSize,
      aiSummaryHistorySort,
      aiSummaryHistorySearch,
      aiSummaryHistoryFromDate,
      aiSummaryHistoryToDate,
    ]);

  const aiSummaryHistoryCsvUrl =
    useMemo(() => {
      const params =
        new URLSearchParams({
          export: "csv",
          sort: aiSummaryHistorySort,
        });

      if (aiSummaryHistorySearch) {
        params.set(
          "search",
          aiSummaryHistorySearch
        );
      }

      if (aiSummaryHistoryFromDate) {
        params.set(
          "from",
          aiSummaryHistoryFromDate
        );
      }

      if (aiSummaryHistoryToDate) {
        params.set(
          "to",
          aiSummaryHistoryToDate
        );
      }

      return `/api/analytics-insights/history?${params.toString()}`;
    }, [
      aiSummaryHistorySort,
      aiSummaryHistorySearch,
      aiSummaryHistoryFromDate,
      aiSummaryHistoryToDate,
    ]);

  const hasActiveAiSummaryHistoryFilters =
    Boolean(
      aiSummaryHistorySearch ||
        aiSummaryHistoryFromDate ||
        aiSummaryHistoryToDate
    );

  const hasCustomizedAiSummaryHistoryView =
    hasActiveAiSummaryHistoryFilters ||
    aiSummaryHistorySort !== "newest";

  const aiDailyLimitReached =
    aiUsage !== null &&
    aiUsage.remaining <= 0;

  useEffect(() => {
    if (!aiSummaryDeleteTarget) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (
        event.key === "Escape" &&
        !isDeletingAiSummaryHistory
      ) {
        setAiSummaryDeleteTarget(null);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    aiSummaryDeleteTarget,
    isDeletingAiSummaryHistory,
  ]);

  useEffect(() => {
    let isMounted = true;

    async function loadAnalytics() {
      try {
        const cloudRecords =
          await loadResumeAnalyses(100);

        const analyticsHistory =
          cloudRecords.map(
            mapCloudAnalysisToHistory
          );

        if (isMounted) {
          setHistory(
            analyticsHistory
          );
        }
      } catch (error) {
        console.error(
          "Unable to load Supabase analytics:",
          error
        );

        if (isMounted) {
          toast.error(
            "Unable to load cloud analytics."
          );
        }
      } finally {
        if (isMounted) {
          setHistoryLoaded(true);
        }
      }
    }

    void loadAnalytics();

    return () => {
      isMounted = false;
    };
  }, []);

  const sortedHistory =
    useMemo(
      () =>
        [...history].sort(
          (first, second) =>
            new Date(
              getItemDate(second)
            ).getTime() -
            new Date(
              getItemDate(first)
            ).getTime()
        ),
      [history]
    );
  const resumeInsights =
    useMemo(
      () =>
        generateResumeInsights(
          sortedHistory
        ),
      [sortedHistory]
    );

  const aiInsightsPayload =
    useMemo(
      () => ({
        analysisCount:
          resumeInsights.analysisCount,

        latestScore:
          resumeInsights.latestScore,

        previousScore:
          resumeInsights.previousScore,

        changeFromPrevious:
          resumeInsights
            .changeFromPrevious,

        changeFromFirst:
          resumeInsights
            .changeFromFirst,

        trend:
          resumeInsights.trend,

        consistency:
          resumeInsights.consistency,

        recentActivityCount:
          resumeInsights
            .recentActivityCount,

        strongestMetric:
          resumeInsights
            .strongestMetric,

        weakestMetric:
          resumeInsights
            .weakestMetric,

        topMissingKeywords:
          resumeInsights
            .topMissingKeywords,

        existingInsights:
          resumeInsights.insights.map(
            (insight) =>
              `${insight.title}: ${insight.description}`
          ),
      }),
      [resumeInsights]
    );

  useEffect(() => {
    if (!historyLoaded) {
      return;
    }

    if (
      aiInsightsPayload.analysisCount < 1
    ) {
      setAiSummary(null);
      setAiSummaryGeneratedAt(null);
      setAiSummarySource(null);
      setAiSummaryIsStale(false);
      setCurrentAiSummaryGeneratedAt(null);
      setIsLoadingAiSummaryStatus(false);
      return;
    }

    let isMounted = true;

    async function loadAiSummaryStatus() {
      setIsLoadingAiSummaryStatus(true);

      try {
        const response = await fetch(
          "/api/analytics-insights",
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              aiInsightsPayload
            ),

            cache: "no-store",
          }
        );

        const responseText =
          await response.text();

        let data:
          | AiAnalyticsStatusResponse
          | AiAnalyticsErrorResponse;

        try {
          data = JSON.parse(
            responseText
          ) as
            | AiAnalyticsStatusResponse
            | AiAnalyticsErrorResponse;
        } catch {
          console.warn(
            "Unexpected AI analytics status response:",
            responseText
          );

          return;
        }

        if (!response.ok) {
          if (response.status !== 401) {
            console.warn(
              "Unable to load AI analytics status:",
              "error" in data
                ? data.error
                : undefined
            );
          }

          return;
        }

        const statusData =
          data as AiAnalyticsStatusResponse;

        if (!isMounted) {
          return;
        }

        setAiUsage(
          statusData.usage
        );

        setAiSummaryIsStale(
          statusData.stale
        );

        setCurrentAiSummaryGeneratedAt(
          statusData.stale
            ? null
            : statusData.generatedAt
        );

        if (
          statusData.summary &&
          statusData.generatedAt
        ) {
          setAiSummary(
            statusData.summary.trim()
          );

          setAiSummaryGeneratedAt(
            statusData.generatedAt
          );

          setAiSummarySource(
            "cache"
          );
        } else {
          setAiSummary(null);
          setAiSummaryGeneratedAt(null);
          setAiSummarySource(null);
          setCurrentAiSummaryGeneratedAt(null);
        }
      } catch (error) {
        console.warn(
          "AI analytics status load error:",
          error
        );
      } finally {
        if (isMounted) {
          setIsLoadingAiSummaryStatus(
            false
          );
        }
      }
    }

    void loadAiSummaryStatus();

    return () => {
      isMounted = false;
    };
  }, [
    historyLoaded,
    aiInsightsPayload,
  ]);

  useEffect(() => {
    if (!historyLoaded) {
      return;
    }

    let isMounted = true;

    async function loadSavedAiHistory() {
      setIsLoadingAiSummaryHistory(true);

      try {
        const response = await fetch(
          aiSummaryHistoryUrl,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const responseText =
          await response.text();

        let data:
          | AiAnalyticsHistoryResponse
          | AiAnalyticsErrorResponse;

        try {
          data = JSON.parse(
            responseText
          ) as
            | AiAnalyticsHistoryResponse
            | AiAnalyticsErrorResponse;
        } catch {
          throw new Error(
            "The server returned an unexpected history response."
          );
        }

        if (!response.ok) {
          throw new Error(
            "error" in data && data.error
              ? data.error
              : "Unable to load AI summary history."
          );
        }

        if (isMounted) {
          const historyData =
            data as AiAnalyticsHistoryResponse;

          setAiSummaryHistory(
            historyData.items
          );
          setAiSummaryHistoryPagination(
            historyData.pagination
          );
          setAiSummaryHistoryAllTotal(
            historyData.allTotal
          );

          if (
            historyData.pagination.page >
              historyData.pagination.totalPages &&
            historyData.pagination.total > 0
          ) {
            setAiSummaryHistoryPage(
              historyData.pagination.totalPages
            );
          }
        }
      } catch (error) {
        if (isMounted) {
          console.warn(
            "AI summary history load error:",
            error
          );

          toast.error(
            error instanceof Error
              ? error.message
              : "Unable to load AI summary history."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingAiSummaryHistory(false);
        }
      }
    }

    void loadSavedAiHistory();

    return () => {
      isMounted = false;
    };
  }, [
    historyLoaded,
    aiSummaryHistoryUrl,
  ]);

  async function refreshAiSummaryHistory() {
    setIsLoadingAiSummaryHistory(true);

    try {
      const response = await fetch(
        aiSummaryHistoryUrl,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const responseText =
        await response.text();

      let data:
        | AiAnalyticsHistoryResponse
        | AiAnalyticsErrorResponse;

      try {
        data = JSON.parse(
          responseText
        ) as
          | AiAnalyticsHistoryResponse
          | AiAnalyticsErrorResponse;
      } catch {
        throw new Error(
          "The server returned an unexpected history response."
        );
      }

      if (!response.ok) {
        throw new Error(
          "error" in data && data.error
            ? data.error
            : "Unable to refresh AI summary history."
        );
      }

      const historyData =
        data as AiAnalyticsHistoryResponse;

      setAiSummaryHistory(
        historyData.items
      );
      setAiSummaryHistoryPagination(
        historyData.pagination
      );
      setAiSummaryHistoryAllTotal(
        historyData.allTotal
      );
    } catch (error) {
      console.warn(
        "Unable to refresh AI summary history:",
        error
      );
    } finally {
      setIsLoadingAiSummaryHistory(false);
    }
  }

  function applyAiSummaryHistoryFilters(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      aiSummaryHistoryFromDateInput &&
      aiSummaryHistoryToDateInput &&
      aiSummaryHistoryFromDateInput >
        aiSummaryHistoryToDateInput
    ) {
      toast.error(
        "The start date cannot be after the end date."
      );
      return;
    }

    setAiSummaryHistoryPage(1);
    setAiSummaryHistorySearch(
      aiSummaryHistorySearchInput.trim()
    );
    setAiSummaryHistoryFromDate(
      aiSummaryHistoryFromDateInput
    );
    setAiSummaryHistoryToDate(
      aiSummaryHistoryToDateInput
    );
  }

  function resetAiSummaryHistoryFilters() {
    setAiSummaryHistorySearchInput("");
    setAiSummaryHistoryFromDateInput("");
    setAiSummaryHistoryToDateInput("");
    setAiSummaryHistorySearch("");
    setAiSummaryHistoryFromDate("");
    setAiSummaryHistoryToDate("");
    setAiSummaryHistorySort("newest");
    setAiSummaryHistoryPage(1);
  }

  async function exportAiSummaryHistoryCsv() {
    if (
      isExportingAiSummaryHistoryCsv ||
      aiSummaryHistoryPagination.total < 1
    ) {
      return;
    }

    setIsExportingAiSummaryHistoryCsv(true);

    try {
      const response = await fetch(
        aiSummaryHistoryCsvUrl,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        const responseText =
          await response.text();

        let message =
          "Unable to export AI summary history.";

        try {
          const data = JSON.parse(
            responseText
          ) as AiAnalyticsErrorResponse;

          if (data.error) {
            message = data.error;
          }
        } catch {
          if (responseText.trim()) {
            message = responseText.trim();
          }
        }

        throw new Error(message);
      }

      const blob = await response.blob();
      const disposition =
        response.headers.get(
          "Content-Disposition"
        );
      const filenameMatch =
        disposition?.match(
          /filename="?([^";]+)"?/i
        );
      const filename =
        filenameMatch?.[1] ??
        `resume-impact-ai-summary-history-${new Date()
          .toISOString()
          .slice(0, 10)}.csv`;
      const objectUrl =
        URL.createObjectURL(blob);
      const link =
        document.createElement("a");

      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);

      toast.success(
        `${aiSummaryHistoryPagination.total} saved summaries exported to CSV.`
      );
    } catch (error) {
      console.warn(
        "AI summary history CSV export error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to export AI summary history."
      );
    } finally {
      setIsExportingAiSummaryHistoryCsv(false);
    }
  }

  async function reloadAiSummaryStatusAfterDeletion() {
    try {
      const response = await fetch(
        "/api/analytics-insights",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            aiInsightsPayload
          ),
          cache: "no-store",
        }
      );

      const responseText =
        await response.text();

      let data:
        | AiAnalyticsStatusResponse
        | AiAnalyticsErrorResponse;

      try {
        data = JSON.parse(
          responseText
        ) as
          | AiAnalyticsStatusResponse
          | AiAnalyticsErrorResponse;
      } catch {
        console.warn(
          "Unexpected AI status response after deletion:",
          responseText
        );
        return;
      }

      if (!response.ok) {
        return;
      }

      const statusData =
        data as AiAnalyticsStatusResponse;

      setAiUsage(statusData.usage);
      setAiSummaryIsStale(
        statusData.stale
      );

      setCurrentAiSummaryGeneratedAt(
        statusData.stale
          ? null
          : statusData.generatedAt
      );

      if (
        statusData.summary &&
        statusData.generatedAt
      ) {
        setAiSummary(
          statusData.summary.trim()
        );
        setAiSummaryGeneratedAt(
          statusData.generatedAt
        );
        setAiSummarySource("cache");
      } else {
        setAiSummary(null);
        setAiSummaryGeneratedAt(null);
        setAiSummarySource(null);
        setAiSummaryIsStale(false);
        setCurrentAiSummaryGeneratedAt(
          null
        );
      }
    } catch (error) {
      console.warn(
        "Unable to reload AI summary after deletion:",
        error
      );
    }
  }

  function openDeleteAiSummaryDialog(
    item: AiAnalyticsHistoryItem
  ) {
    setAiSummaryDeleteTarget({
      mode: "single",
      item,
    });
  }

  function openClearAiSummaryHistoryDialog() {
    setAiSummaryDeleteTarget({
      mode: "all",
    });
  }

  function closeAiSummaryDeleteDialog() {
    if (isDeletingAiSummaryHistory) {
      return;
    }

    setAiSummaryDeleteTarget(null);
  }

  async function confirmAiSummaryHistoryDeletion() {
    if (!aiSummaryDeleteTarget) {
      return;
    }

    setIsDeletingAiSummaryHistory(true);

    try {
      const requestBody =
        aiSummaryDeleteTarget.mode ===
        "all"
          ? {
              clearAll: true,
            }
          : {
              id: aiSummaryDeleteTarget
                .item.id,
            };

      const response = await fetch(
        "/api/analytics-insights/history",
        {
          method: "DELETE",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            requestBody
          ),
        }
      );

      const responseText =
        await response.text();

      let data:
        | AiAnalyticsHistoryDeleteResponse
        | AiAnalyticsErrorResponse;

      try {
        data = JSON.parse(
          responseText
        ) as
          | AiAnalyticsHistoryDeleteResponse
          | AiAnalyticsErrorResponse;
      } catch {
        throw new Error(
          "The server returned an unexpected delete response."
        );
      }

      if (!response.ok) {
        throw new Error(
          "error" in data && data.error
            ? data.error
            : "Unable to delete AI summary history."
        );
      }

      const deleteData =
        data as AiAnalyticsHistoryDeleteResponse;

      const deletingAll =
        aiSummaryDeleteTarget.mode ===
        "all";

      const remainingItems =
        aiSummaryHistory.filter(
          (item) =>
            !deleteData.deletedIds.includes(
              item.id
            )
        );

      setAiSummaryHistory(
        remainingItems
      );

      if (!deletingAll) {
        setAiSummaryHistoryAllTotal(
          (current) =>
            Math.max(
              0,
              current - deleteData.deletedCount
            )
        );
      }

      if (deletingAll) {
        setAiSummaryHistoryAllTotal(0);
        setAiSummaryHistoryPage(1);
        setAiSummaryHistoryPagination(
          (current) => ({
            ...current,
            page: 1,
            total: 0,
            totalPages: 1,
          })
        );
      } else if (
        remainingItems.length === 0 &&
        aiSummaryHistoryPage > 1
      ) {
        setAiSummaryHistoryPage(
          (current) =>
            Math.max(1, current - 1)
        );
      } else {
        await refreshAiSummaryHistory();
      }

      await reloadAiSummaryStatusAfterDeletion();

      setAiSummaryDeleteTarget(null);

      toast.success(
        aiSummaryDeleteTarget.mode ===
          "all"
          ? `${deleteData.deletedCount} saved summaries cleared.`
          : "Saved AI summary deleted."
      );
    } catch (error) {
      console.warn(
        "AI summary history delete error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to delete AI summary history."
      );
    } finally {
      setIsDeletingAiSummaryHistory(false);
    }
  }

  const averageOverall =
    useMemo(
      () =>
        calculateAverage(
          sortedHistory.map(
            (item) =>
              clampScore(
                item.result
                  .overallScore
              )
          )
        ),
      [sortedHistory]
    );

  const averageKeyword =
    useMemo(
      () =>
        calculateAverage(
          sortedHistory.map(
            (item) =>
              clampScore(
                item.result
                  .keywordScore
              )
          )
        ),
      [sortedHistory]
    );

  const averageFormatting =
    useMemo(
      () =>
        calculateAverage(
          sortedHistory.map(
            (item) =>
              clampScore(
                item.result
                  .formattingScore
              )
          )
        ),
      [sortedHistory]
    );

  const averageReadability =
    useMemo(
      () =>
        calculateAverage(
          sortedHistory.map(
            (item) =>
              clampScore(
                item.result
                  .readabilityScore
              )
          )
        ),
      [sortedHistory]
    );

  const bestAnalysis =
    useMemo(
      () =>
        sortedHistory.reduce<
          AtsAnalysisHistoryItem | null
        >(
          (best, current) => {
            if (!best) {
              return current;
            }

            return current.result
              .overallScore >
              best.result.overallScore
              ? current
              : best;
          },
          null
        ),
      [sortedHistory]
    );

  const lowestAnalysis =
    useMemo(
      () =>
        sortedHistory.reduce<
          AtsAnalysisHistoryItem | null
        >(
          (lowest, current) => {
            if (!lowest) {
              return current;
            }

            return current.result
              .overallScore <
              lowest.result.overallScore
              ? current
              : lowest;
          },
          null
        ),
      [sortedHistory]
    );

  const latestAnalysis =
    sortedHistory[0] ?? null;

  const latestScore =
    latestAnalysis
      ? clampScore(
          latestAnalysis.result
            .overallScore
        )
      : 0;

  const bestScore =
    bestAnalysis
      ? clampScore(
          bestAnalysis.result
            .overallScore
        )
      : 0;

  const lowestScore =
    lowestAnalysis
      ? clampScore(
          lowestAnalysis.result
            .overallScore
        )
      : 0;

  const totalImprovement =
    sortedHistory.length >= 2
      ? latestScore -
        clampScore(
          sortedHistory[
            sortedHistory.length - 1
          ].result.overallScore
        )
      : 0;

  const trendPoints =
    useMemo(
      () =>
        createTrendPoints(
          sortedHistory,
          selectedMetric
        ),
      [
        sortedHistory,
        selectedMetric,
      ]
    );

  const keywordFrequency =
    useMemo(
      () =>
        createKeywordFrequency(
          sortedHistory
        ),
      [sortedHistory]
    );

  const weeklyActivity =
    useMemo(
      () =>
        createWeeklyActivity(
          sortedHistory
        ),
      [sortedHistory]
    );

  const maximumWeeklyCount =
    Math.max(
      1,
      ...weeklyActivity.map(
        (item) => item.count
      )
    );

  const chartWidth = 900;
  const chartHeight = 300;
  const paddingLeft = 48;
  const paddingRight = 24;
  const paddingTop = 24;
  const paddingBottom = 42;

  const chartPath =
    createChartPath(
      trendPoints,
      chartWidth,
      chartHeight,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom
    );

  const selectedMetricLabel =
    CHART_METRICS.find(
      (metric) =>
        metric.key ===
        selectedMetric
    )?.label ?? "Overall ATS";

  async function handleGenerateAiSummary() {
    if (
      resumeInsights.analysisCount < 1
    ) {
      toast.error(
        "Complete an ATS analysis first."
      );

      return;
    }

    if (
      aiDailyLimitReached &&
      (
        !aiSummary ||
        aiSummaryIsStale
      )
    ) {
      toast.error(
        "Your daily AI analytics limit has been reached."
      );

      return;
    }

    setIsGeneratingAiSummary(true);

    try {
      const response = await fetch(
        "/api/analytics-insights",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            aiInsightsPayload
          ),
        }
      );

      const responseText =
        await response.text();

      let data:
        | AiAnalyticsSummaryResponse
        | AiAnalyticsErrorResponse;

      try {
        data = JSON.parse(
          responseText
        ) as
          | AiAnalyticsSummaryResponse
          | AiAnalyticsErrorResponse;
      } catch {
        console.error(
          "Unexpected AI analytics response:",
          responseText
        );

        throw new Error(
          "The server returned an unexpected response."
        );
      }

      if (!response.ok) {
        const errorData =
          data as AiAnalyticsErrorResponse;

        if (errorData.usage) {
          setAiUsage(
            errorData.usage
          );
        }

        throw new Error(
          errorData.error ||
            "Unable to generate AI analytics insights."
        );
      }

      if (
        !("summary" in data) ||
        !data.summary.trim()
      ) {
        throw new Error(
          "The AI returned an incomplete summary."
        );
      }

      const successData =
        data as AiAnalyticsSummaryResponse;

      setAiSummary(
        successData.summary.trim()
      );

      setAiSummaryGeneratedAt(
        successData.generatedAt
      );

      setAiSummarySource(
        successData.source
      );

      setAiUsage(
        successData.usage
      );

      setAiSummaryIsStale(false);

      setCurrentAiSummaryGeneratedAt(
        successData.generatedAt
      );

      void refreshAiSummaryHistory();

      toast.success(
        successData.cached
          ? "Cached AI summary loaded. No new API usage."
          : "New AI analytics summary generated."
      );
    } catch (error) {
      console.warn(
        "AI analytics summary error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to generate AI analytics insights."
      );
    } finally {
      setIsGeneratingAiSummary(false);
    }
  }

  async function handleCopyAiSummary(
    summary: string
  ) {
    try {
      await navigator.clipboard.writeText(
        summary
      );

      toast.success(
        "AI summary copied."
      );
    } catch (error) {
      console.warn(
        "Unable to copy AI summary:",
        error
      );

      toast.error(
        "Unable to copy the AI summary."
      );
    }
  }

  function handleDownloadAiSummaryTxt(
    summary: string,
    generatedAt: string,
    stale: boolean
  ) {
    downloadAnalyticsSummaryTxt({
      summary,
      generatedAt,
      stale,
    });

    toast.success(
      "AI summary TXT downloaded."
    );
  }

  function handleDownloadAiSummaryPdf(
    summary: string,
    generatedAt: string,
    stale: boolean
  ) {
    downloadAnalyticsSummaryPdf({
      summary,
      generatedAt,
      stale,
    });

    toast.success(
      "AI summary PDF downloaded."
    );
  }

  function handleViewSavedAiSummary(
    item: AiAnalyticsHistoryItem
  ) {
    const isCurrent =
      currentAiSummaryGeneratedAt !== null &&
      item.generatedAt ===
        currentAiSummaryGeneratedAt;

    setAiSummary(item.summary);
    setAiSummaryGeneratedAt(
      item.generatedAt
    );
    setAiSummarySource("cache");
    setAiSummaryIsStale(!isCurrent);

    window.requestAnimationFrame(() => {
      document
        .getElementById(
          "ai-performance-summary"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  }

  async function handleExport(
    item: AtsAnalysisHistoryItem
  ) {
    setExportingId(item.id);

    try {
      await exportAtsHistoryItemPdf(
        item
      );

      toast.success(
        "ATS PDF report downloaded."
      );
    } catch (error) {
      console.error(
        "Analytics PDF export error:",
        error
      );

      toast.error(
        "Unable to export the PDF report."
      );
    } finally {
      setExportingId(null);
    }
  }

  if (!historyLoaded) {
    return (
      <div className="space-y-6">
        <div className="h-44 animate-pulse rounded-3xl bg-slate-900" />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map(
            (item) => (
              <div
                key={item}
                className="h-40 animate-pulse rounded-2xl bg-slate-900"
              />
            )
          )}
        </div>

        <div className="h-96 animate-pulse rounded-3xl bg-slate-900" />
      </div>
    );
  }

  if (
    sortedHistory.length === 0
  ) {
    return (
      <div className="space-y-8">
        <section className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/50 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
            Analytics Dashboard
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Resume performance analytics
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
            Measure ATS score trends,
            keyword coverage, formatting
            performance, readability, and
            resume improvement over time.
          </p>
        </section>

        <EmptyAnalytics />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/50 p-6 shadow-xl shadow-black/20 sm:p-8">
        <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
              Analytics Dashboard
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Track your resume
              improvement over time
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              Review ATS score trends,
              discover recurring missing
              keywords, measure weekly
              activity, and identify your
              strongest resume version.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/ats-resume-checker"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                <FileSearch
                  aria-hidden
                  className="h-4 w-4"
                />

                New ATS Analysis
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/70 px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-blue-500 hover:text-white"
              >
                <Gauge
                  aria-hidden
                  className="h-4 w-4"
                />

                Main Dashboard
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-6 xl:min-w-[330px]">
            <p className="text-sm text-slate-400">
              Overall progress
            </p>

            <div className="mt-3 flex items-end gap-3">
              <p className="text-5xl font-bold text-white">
                {latestScore}
              </p>

              <span className="pb-1 text-sm text-slate-500">
                latest score
              </span>
            </div>

            {sortedHistory.length < 2 ? (
              <p className="mt-4 text-sm text-slate-500">
                Complete another analysis
                to calculate improvement.
              </p>
            ) : totalImprovement > 0 ? (
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
                <TrendingUp
                  aria-hidden
                  className="h-4 w-4"
                />

                +{totalImprovement} points
                since first analysis
              </p>
            ) : totalImprovement < 0 ? (
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-300">
                <TrendingDown
                  aria-hidden
                  className="h-4 w-4"
                />

                {totalImprovement} points
                since first analysis
              </p>
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                Score remains unchanged.
              </p>
            )}
          </div>
        </div>
      </section>

      <section
        aria-label="Analytics summary"
        className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
      >
        <MetricCard
          title="Average ATS Score"
          value={averageOverall}
          helperText="Average overall match across all saved analyses."
          icon={Target}
        />

        <MetricCard
          title="Average Keywords"
          value={averageKeyword}
          helperText="Average job keyword coverage across your resumes."
          icon={Sparkles}
        />

        <MetricCard
          title="Average Formatting"
          value={averageFormatting}
          helperText="Average ATS-friendly formatting performance."
          icon={BarChart3}
        />

        <MetricCard
          title="Average Readability"
          value={averageReadability}
          helperText="Average recruiter readability score."
          icon={Activity}
        />
      </section>
<section className="overflow-hidden rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 via-slate-900 to-blue-500/10 p-5 shadow-xl shadow-black/10 sm:p-7">
  <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
    <div className="max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/15 text-violet-300">
          <Sparkles
            aria-hidden
            className="h-5 w-5"
          />
        </span>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-300">
            AI Resume Insights
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            Personalized performance
            recommendations
          </h2>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-400">
        ResumeClimb AI analyzes your
        saved ATS reports to identify
        progress, recurring weaknesses,
        keyword gaps, and your strongest
        resume areas.
      </p>
    </div>

 <div className="flex shrink-0 flex-col gap-3">
  <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold ${getTrendClasses(
        resumeInsights.trend
      )}`}
    >
      {resumeInsights.trend ===
      "improving" ? (
        <TrendingUp
          aria-hidden
          className="h-4 w-4"
        />
      ) : resumeInsights.trend ===
        "declining" ? (
        <TrendingDown
          aria-hidden
          className="h-4 w-4"
        />
      ) : (
        <Activity
          aria-hidden
          className="h-4 w-4"
        />
      )}

      {getTrendLabel(
        resumeInsights.trend
      )}
    </span>

    <button
      type="button"
      onClick={
        handleGenerateAiSummary
      }
      disabled={
        isGeneratingAiSummary ||
        isLoadingAiSummaryStatus ||
        (
          aiDailyLimitReached &&
          (
            !aiSummary ||
            aiSummaryIsStale
          )
        )
      }
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isGeneratingAiSummary ? (
        <>
          <Loader2
            aria-hidden
            className="h-4 w-4 animate-spin"
          />

          Generating...
        </>
      ) : isLoadingAiSummaryStatus ? (
        <>
          <Loader2
            aria-hidden
            className="h-4 w-4 animate-spin"
          />

          Loading saved summary...
        </>
      ) :
        aiDailyLimitReached &&
        (
          !aiSummary ||
          aiSummaryIsStale
        ) ? (
        <>
          <Sparkles
            aria-hidden
            className="h-4 w-4"
          />

          Daily Limit Reached
        </>
      ) : aiSummaryIsStale ? (
        <>
          <RefreshCw
            aria-hidden
            className="h-4 w-4"
          />

          Generate Updated Summary
        </>
      ) : aiSummary ? (
        <>
          <RefreshCw
            aria-hidden
            className="h-4 w-4"
          />

          Reload Summary
        </>
      ) : (
        <>
          <Sparkles
            aria-hidden
            className="h-4 w-4"
          />

          Generate AI Summary
        </>
      )}
    </button>
  </div>

  {aiUsage && (
    <div
      aria-live="polite"
      className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-xs text-slate-400"
    >
      <span className="font-bold text-slate-200">
        Daily usage:{" "}
        {aiUsage.used}/
        {aiUsage.limit}
      </span>

      <span className="mx-2 text-slate-600">
        •
      </span>

      <span>
        {aiUsage.remaining} remaining
      </span>

      {aiDailyLimitReached && (
        <p className="mt-2 text-amber-300">
          Resets{" "}
          {formatResetTime(
            aiUsage.resetsAt
          )}
        </p>
      )}
    </div>
  )}

  {aiSummaryIsStale && (
    <div
      role="status"
      className="max-w-md rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs leading-5 text-amber-100"
    >
      <p className="font-bold text-amber-300">
        Analytics data changed
      </p>

      <p className="mt-1">
        This saved summary was generated
        from older analytics. Generate an
        updated summary for your current
        ATS results.
      </p>
    </div>
  )}
</div>
  </div>

  <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <article className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        Latest Change
      </p>

      <p
        className={
          resumeInsights
            .changeFromPrevious > 0
            ? "mt-3 text-3xl font-bold text-emerald-300"
            : resumeInsights
                  .changeFromPrevious < 0
              ? "mt-3 text-3xl font-bold text-amber-300"
              : "mt-3 text-3xl font-bold text-white"
        }
      >
        {resumeInsights.analysisCount <
        2
          ? "—"
          : `${
              resumeInsights
                .changeFromPrevious > 0
                ? "+"
                : ""
            }${
              resumeInsights
                .changeFromPrevious
            }`}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {resumeInsights.analysisCount <
        2
          ? "Complete another analysis to measure change."
          : "Points compared with your previous analysis."}
      </p>
    </article>

    <article className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-400">
        Strongest Area
      </p>

      <p className="mt-3 text-lg font-bold text-white">
        {resumeInsights
          .strongestMetric?.label ??
          "Not available"}
      </p>

      <p className="mt-2 text-sm font-semibold text-emerald-300">
        {resumeInsights
          .strongestMetric
          ? `${resumeInsights.strongestMetric.average}/100 average`
          : "No score available"}
      </p>
    </article>

    <article className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-400">
        Focus Area
      </p>

      <p className="mt-3 text-lg font-bold text-white">
        {resumeInsights
          .weakestMetric?.label ??
          "Not available"}
      </p>

      <p className="mt-2 text-sm font-semibold text-amber-300">
        {resumeInsights.weakestMetric
          ? `${resumeInsights.weakestMetric.average}/100 average`
          : "No score available"}
      </p>
    </article>

    <article className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-400">
        Recent Activity
      </p>

      <p className="mt-3 text-3xl font-bold text-white">
        {
          resumeInsights
            .recentActivityCount
        }
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        ATS analyses completed during
        the last seven days.
      </p>
    </article>
  </div>

  <div className="mt-7 grid gap-4 lg:grid-cols-2">
    {resumeInsights.insights.map(
      (insight) => {
        const style =
          getInsightToneClasses(
            insight.tone
          );

        return (
          <article
            key={insight.id}
            className={`rounded-2xl border p-5 ${style.border} ${style.background}`}
          >
            <div className="flex items-start gap-4">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.icon}`}
              >
                {insight.tone ===
                "positive" ? (
                  <TrendingUp
                    aria-hidden
                    className="h-5 w-5"
                  />
                ) : insight.tone ===
                  "warning" ? (
                  <Target
                    aria-hidden
                    className="h-5 w-5"
                  />
                ) : (
                  <Sparkles
                    aria-hidden
                    className="h-5 w-5"
                  />
                )}
              </span>

              <div>
                <h3
                  className={`font-bold ${style.title}`}
                >
                  {insight.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {insight.description}
                </p>
              </div>
            </div>
          </article>
        );
      }
    )}
  </div>
{aiSummary && (
  <article
    id="ai-performance-summary"
    className="mt-7 scroll-mt-6 overflow-hidden rounded-2xl border border-violet-500/30 bg-slate-950/70"
  >
    <div className="flex flex-col justify-between gap-3 border-b border-slate-800 p-5 sm:flex-row sm:items-center">
      <div>
        <div className="flex items-center gap-2">
          <Sparkles
            aria-hidden
            className="h-5 w-5 text-violet-300"
          />

          <h3 className="font-bold text-white">
            AI Performance Summary
          </h3>
        </div>

        {aiSummaryGeneratedAt && (
          <p className="mt-2 text-xs text-slate-500">
            Generated{" "}
            {formatDate(
              aiSummaryGeneratedAt
            )}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {aiSummaryIsStale && (
          <span className="w-fit rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-200">
            Update needed
          </span>
        )}

        <span
          className={
            aiSummarySource === "cache"
              ? "w-fit rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-200"
              : "w-fit rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-200"
          }
        >
          {aiSummarySource === "cache"
            ? "Cached result"
            : "New AI result"}
        </span>

        {aiUsage && (
          <span className="w-fit rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-bold text-slate-300">
            Daily {aiUsage.used}/
            {aiUsage.limit}
          </span>
        )}
      </div>
    </div>


    <div className="p-5 sm:p-6">
      <div className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
        {aiSummary}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() =>
            void handleCopyAiSummary(
              aiSummary
            )
          }
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-200 transition hover:border-violet-500/50 hover:text-white"
        >
          <Copy
            aria-hidden
            className="h-4 w-4"
          />

          Copy
        </button>

        <button
          type="button"
          onClick={() =>
            handleDownloadAiSummaryTxt(
              aiSummary,
              aiSummaryGeneratedAt ??
                new Date().toISOString(),
              aiSummaryIsStale
            )
          }
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-200 transition hover:border-blue-500/50 hover:text-white"
        >
          <FileText
            aria-hidden
            className="h-4 w-4"
          />

          Download TXT
        </button>

        <button
          type="button"
          onClick={() =>
            handleDownloadAiSummaryPdf(
              aiSummary,
              aiSummaryGeneratedAt ??
                new Date().toISOString(),
              aiSummaryIsStale
            )
          }
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-200 transition hover:border-rose-500/50 hover:text-white"
        >
          <Download
            aria-hidden
            className="h-4 w-4"
          />

          Download PDF
        </button>

        <button
          type="button"
          onClick={() =>
            setIsAiSummaryHistoryOpen(
              (current) => !current
            )
          }
          className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-2.5 text-xs font-bold text-violet-200 transition hover:bg-violet-500/15"
        >
          <History
            aria-hidden
            className="h-4 w-4"
          />

          {isAiSummaryHistoryOpen
            ? "Hide History"
            : "View History"}
        </button>
      </div>

      <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <p className="text-xs leading-6 text-amber-100">
          AI recommendations should be
          reviewed before use. Add only
          skills, keywords, and claims
          that accurately reflect your
          real experience.
        </p>
      </div>
    </div>
  </article>
)}

{isAiSummaryHistoryOpen && (
  <section className="mt-7 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/60">
    <div className="flex flex-col justify-between gap-3 border-b border-slate-800 p-5 sm:flex-row sm:items-center">
      <div>
        <div className="flex items-center gap-2">
          <History
            aria-hidden
            className="h-5 w-5 text-violet-300"
          />

          <h3 className="font-bold text-white">
            Saved AI Summary History
          </h3>
        </div>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          Search, filter, and browse your
          saved analytics summaries. Opening
          saved history does not use the
          OpenAI API.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="w-fit rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-bold text-slate-300">
          {hasActiveAiSummaryHistoryFilters
            ? `${aiSummaryHistoryPagination.total} results • ${aiSummaryHistoryAllTotal} saved`
            : `${aiSummaryHistoryAllTotal} saved`}
        </span>

        <button
          type="button"
          onClick={() =>
            void exportAiSummaryHistoryCsv()
          }
          disabled={
            isExportingAiSummaryHistoryCsv ||
            aiSummaryHistoryPagination.total < 1
          }
          title="Export all matching summaries, not only this page"
          className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-200 transition hover:bg-emerald-500/15 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isExportingAiSummaryHistoryCsv ? (
            <Loader2
              aria-hidden
              className="h-4 w-4 animate-spin"
            />
          ) : (
            <Download
              aria-hidden
              className="h-4 w-4"
            />
          )}

          {isExportingAiSummaryHistoryCsv
            ? "Exporting..."
            : "Export CSV"}
        </button>

        {aiSummaryHistoryAllTotal > 0 && (
          <button
            type="button"
            onClick={
              openClearAiSummaryHistoryDialog
            }
            disabled={
              isDeletingAiSummaryHistory
            }
            className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-200 transition hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2
              aria-hidden
              className="h-4 w-4"
            />

            Clear All
          </button>
        )}
      </div>
    </div>

    <form
      onSubmit={
        applyAiSummaryHistoryFilters
      }
      className="grid gap-3 border-b border-slate-800 bg-slate-950/30 p-5 md:grid-cols-2 xl:grid-cols-[minmax(240px,1fr)_170px_170px_190px_auto]"
    >
      <label className="block">
        <span className="mb-2 block text-xs font-bold text-slate-400">
          Search summaries
        </span>

        <span className="relative block">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
          />

          <input
            type="search"
            value={
              aiSummaryHistorySearchInput
            }
            onChange={(event) =>
              setAiSummaryHistorySearchInput(
                event.target.value
              )
            }
            placeholder="Keyword or recommendation..."
            className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />
        </span>
      </label>

      <label className="block">
        <span className="mb-2 block text-xs font-bold text-slate-400">
          From date
        </span>

        <input
          type="date"
          value={
            aiSummaryHistoryFromDateInput
          }
          onChange={(event) =>
            setAiSummaryHistoryFromDateInput(
              event.target.value
            )
          }
          className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-xs font-bold text-slate-400">
          To date
        </span>

        <input
          type="date"
          value={
            aiSummaryHistoryToDateInput
          }
          onChange={(event) =>
            setAiSummaryHistoryToDateInput(
              event.target.value
            )
          }
          className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-xs font-bold text-slate-400">
          Sort by
        </span>

        <select
          value={aiSummaryHistorySort}
          onChange={(event) => {
            setAiSummaryHistorySort(
              event.target
                .value as AiAnalyticsHistorySort
            );
            setAiSummaryHistoryPage(1);
          }}
          className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
        >
          <option value="newest">
            Newest first
          </option>
          <option value="oldest">
            Oldest first
          </option>
          <option value="score_desc">
            Highest score
          </option>
          <option value="score_asc">
            Lowest score
          </option>
        </select>
      </label>

      <div className="flex items-end gap-2">
        <button
          type="submit"
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-xs font-bold text-white transition hover:bg-violet-500"
        >
          <Search
            aria-hidden
            className="h-4 w-4"
          />
          Apply
        </button>

        <button
          type="button"
          onClick={
            resetAiSummaryHistoryFilters
          }
          disabled={
            !hasCustomizedAiSummaryHistoryView &&
            !aiSummaryHistorySearchInput &&
            !aiSummaryHistoryFromDateInput &&
            !aiSummaryHistoryToDateInput
          }
          className="h-11 rounded-xl border border-slate-700 bg-slate-900 px-4 text-xs font-bold text-slate-300 transition hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Reset
        </button>
      </div>
    </form>

    <div className="p-5 sm:p-6">
      {isLoadingAiSummaryHistory ? (
        <div className="flex items-center justify-center gap-3 rounded-xl border border-dashed border-slate-700 p-8 text-sm text-slate-400">
          <Loader2
            aria-hidden
            className="h-5 w-5 animate-spin"
          />

          Loading saved summaries...
        </div>
      ) : aiSummaryHistory.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-500">
          {hasActiveAiSummaryHistoryFilters
            ? "No saved summaries match these filters."
            : "No saved AI summaries yet."}
        </div>
      ) : (
        <div className="space-y-4">
          {aiSummaryHistory.map(
            (item) => {
              const isCurrent =
                currentAiSummaryGeneratedAt !==
                  null &&
                item.generatedAt ===
                  currentAiSummaryGeneratedAt;

              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
                >
                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-bold text-white">
                          {formatDate(
                            item.generatedAt
                          )}
                        </p>

                        {isCurrent && (
                          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
                            Current analytics
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-xs text-slate-500">
                        Latest score {item.latestScore}/100
                        {" • "}
                        {item.analysisCount} analyses
                        {" • "}
                        {item.model}
                      </p>

                      <p className="mt-4 line-clamp-3 whitespace-pre-wrap text-sm leading-6 text-slate-400">
                        {item.summary}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleViewSavedAiSummary(
                            item
                          )
                        }
                        className="rounded-lg bg-violet-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-violet-500"
                      >
                        View
                      </button>

                      <button
                        type="button"
                        title="Copy summary"
                        aria-label="Copy saved summary"
                        onClick={() =>
                          void handleCopyAiSummary(
                            item.summary
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-950 text-slate-300 transition hover:border-slate-500 hover:text-white"
                      >
                        <Copy
                          aria-hidden
                          className="h-4 w-4"
                        />
                      </button>

                      <button
                        type="button"
                        title="Download TXT"
                        aria-label="Download saved summary as TXT"
                        onClick={() =>
                          handleDownloadAiSummaryTxt(
                            item.summary,
                            item.generatedAt,
                            !isCurrent
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-950 text-slate-300 transition hover:border-blue-500/50 hover:text-white"
                      >
                        <FileText
                          aria-hidden
                          className="h-4 w-4"
                        />
                      </button>

                      <button
                        type="button"
                        title="Download PDF"
                        aria-label="Download saved summary as PDF"
                        onClick={() =>
                          handleDownloadAiSummaryPdf(
                            item.summary,
                            item.generatedAt,
                            !isCurrent
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-950 text-slate-300 transition hover:border-rose-500/50 hover:text-white"
                      >
                        <Download
                          aria-hidden
                          className="h-4 w-4"
                        />
                      </button>

                      <button
                        type="button"
                        title="Delete saved summary"
                        aria-label="Delete saved AI summary"
                        onClick={() =>
                          openDeleteAiSummaryDialog(
                            item
                          )
                        }
                        disabled={
                          isDeletingAiSummaryHistory
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 transition hover:bg-red-500/15 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2
                          aria-hidden
                          className="h-4 w-4"
                        />
                      </button>
                    </div>
                  </div>
                </article>
              );
            }
          )}
        </div>
      )}

      {aiSummaryHistoryPagination.total > 0 && (
        <div className="mt-5 flex flex-col justify-between gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span>
              Showing {
                (aiSummaryHistoryPagination.page -
                  1) *
                  aiSummaryHistoryPagination.pageSize +
                1
              }–{
                Math.min(
                  aiSummaryHistoryPagination.page *
                    aiSummaryHistoryPagination.pageSize,
                  aiSummaryHistoryPagination.total
                )
              } of {
                aiSummaryHistoryPagination.total
              }
            </span>

            <label className="flex items-center gap-2">
              <span>Per page</span>
              <select
                value={
                  aiSummaryHistoryPageSize
                }
                onChange={(event) => {
                  setAiSummaryHistoryPageSize(
                    Number(event.target.value)
                  );
                  setAiSummaryHistoryPage(1);
                }}
                className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-xs text-white outline-none focus:border-violet-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setAiSummaryHistoryPage(
                  (current) =>
                    Math.max(1, current - 1)
                )
              }
              disabled={
                aiSummaryHistoryPagination.page <=
                  1 ||
                isLoadingAiSummaryHistory
              }
              className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-3 text-xs font-bold text-slate-300 transition hover:border-violet-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft
                aria-hidden
                className="h-4 w-4"
              />
              Previous
            </button>

            <span className="min-w-[92px] text-center text-xs font-bold text-slate-300">
              Page {
                aiSummaryHistoryPagination.page
              } of {
                aiSummaryHistoryPagination.totalPages
              }
            </span>

            <button
              type="button"
              onClick={() =>
                setAiSummaryHistoryPage(
                  (current) =>
                    Math.min(
                      aiSummaryHistoryPagination.totalPages,
                      current + 1
                    )
                )
              }
              disabled={
                aiSummaryHistoryPagination.page >=
                  aiSummaryHistoryPagination.totalPages ||
                isLoadingAiSummaryHistory
              }
              className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-3 text-xs font-bold text-slate-300 transition hover:border-violet-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight
                aria-hidden
                className="h-4 w-4"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  </section>
)}

  {resumeInsights
    .topMissingKeywords.length >
    0 && (
    <div className="mt-7 rounded-2xl border border-slate-700 bg-slate-950/50 p-5">
      <p className="text-sm font-bold text-white">
        Recurring keyword opportunities
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        Add these keywords only when
        they accurately represent your
        experience.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {resumeInsights.topMissingKeywords.map(
          (item) => (
            <span
              key={item.keyword}
              className="rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold capitalize text-amber-300"
            >
              {item.keyword} ·{" "}
              {item.count}
            </span>
          )
        )}
      </div>
    </div>
  )}
</section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/10 sm:p-7">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
              Score Trends
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              {selectedMetricLabel}{" "}
              performance
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              View the latest twelve saved
              analyses and compare your
              resume performance.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CHART_METRICS.map(
              (metric) => (
                <button
                  key={metric.key}
                  type="button"
                  onClick={() =>
                    setSelectedMetric(
                      metric.key
                    )
                  }
                  className={
                    selectedMetric ===
                    metric.key
                      ? "rounded-xl border border-blue-500/40 bg-blue-500/15 px-4 py-2 text-xs font-semibold text-blue-200"
                      : "rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-xs font-semibold text-slate-400 transition hover:border-slate-500 hover:text-white"
                  }
                >
                  {metric.label}
                </button>
              )
            )}
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <div className="min-w-[720px]">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="h-[330px] w-full"
              role="img"
              aria-label={`${selectedMetricLabel} trend chart`}
            >
              {[0, 25, 50, 75, 100].map(
                (score) => {
                  const usableHeight =
                    chartHeight -
                    paddingTop -
                    paddingBottom;

                  const y =
                    paddingTop +
                    usableHeight -
                    (score / 100) *
                      usableHeight;

                  return (
                    <g key={score}>
                      <line
                        x1={paddingLeft}
                        y1={y}
                        x2={
                          chartWidth -
                          paddingRight
                        }
                        y2={y}
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-slate-800"
                      />

                      <text
                        x="5"
                        y={y + 4}
                        fontSize="11"
                        fill="currentColor"
                        className="text-slate-500"
                      >
                        {score}
                      </text>
                    </g>
                  );
                }
              )}

              {chartPath && (
                <path
                  d={chartPath}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-500"
                />
              )}

              {trendPoints.map(
                (point, index) => {
                  const usableWidth =
                    chartWidth -
                    paddingLeft -
                    paddingRight;

                  const usableHeight =
                    chartHeight -
                    paddingTop -
                    paddingBottom;

                  const x =
                    trendPoints.length ===
                    1
                      ? paddingLeft +
                        usableWidth / 2
                      : paddingLeft +
                        (index /
                          (trendPoints.length -
                            1)) *
                          usableWidth;

                  const y =
                    paddingTop +
                    usableHeight -
                    (point.score /
                      100) *
                      usableHeight;

                  return (
                    <g key={point.id}>
                      <circle
                        cx={x}
                        cy={y}
                        r="6"
                        fill="currentColor"
                        className="text-blue-400"
                      />

                      <circle
                        cx={x}
                        cy={y}
                        r="11"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-blue-500/30"
                      />

                      <text
                        x={x}
                        y={y - 15}
                        textAnchor="middle"
                        fontSize="11"
                        fill="currentColor"
                        className="text-slate-300"
                      >
                        {point.score}
                      </text>

                      <text
                        x={x}
                        y={
                          chartHeight -
                          10
                        }
                        textAnchor="middle"
                        fontSize="10"
                        fill="currentColor"
                        className="text-slate-500"
                      >
                        {point.label}
                      </text>

                      <title>
                        {point.fullDate}:{" "}
                        {point.score}/100
                      </title>
                    </g>
                  );
                }
              )}
            </svg>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/10 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-400">
                Keyword Gaps
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Frequently missing keywords
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Keywords that appear most
                often across your saved job
                comparisons.
              </p>
            </div>

            <Sparkles
              aria-hidden
              className="h-6 w-6 text-amber-300"
            />
          </div>

          {keywordFrequency.length ===
          0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 p-8 text-center">
              <p className="text-sm text-slate-500">
                No missing keyword data
                available.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {keywordFrequency.map(
                (item, index) => (
                  <div
                    key={item.keyword}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold capitalize text-slate-200">
                          {item.keyword}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Missing in{" "}
                          {item.count}{" "}
                          analysis
                          {item.count === 1
                            ? ""
                            : "es"}
                        </p>
                      </div>

                      <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
                        #{index + 1}
                      </span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-amber-500"
                        style={{
                          width: `${item.percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/10 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-400">
                Weekly Activity
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Last seven days
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Number of ATS analyses
                completed each day.
              </p>
            </div>

            <CalendarDays
              aria-hidden
              className="h-6 w-6 text-violet-300"
            />
          </div>

          <div className="mt-8 flex h-64 items-end justify-between gap-3">
            {weeklyActivity.map(
              (item) => {
                const height =
                  item.count === 0
                    ? 8
                    : Math.max(
                        18,
                        Math.round(
                          (item.count /
                            maximumWeeklyCount) *
                            100
                        )
                      );

                return (
                  <div
                    key={item.dateKey}
                    className="flex min-w-0 flex-1 flex-col items-center justify-end"
                  >
                    <span className="mb-2 text-xs font-semibold text-slate-400">
                      {item.count}
                    </span>

                    <div className="flex h-44 w-full items-end rounded-xl bg-slate-950 p-1">
                      <div
                        className={
                          item.count > 0
                            ? "w-full rounded-lg bg-gradient-to-t from-violet-600 to-blue-500 transition"
                            : "w-full rounded-lg bg-slate-800"
                        }
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    </div>

                    <span className="mt-3 text-xs font-semibold text-slate-500">
                      {item.label}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/10 sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-400">
            Score Range
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Best and lowest results
          </h2>

          <div className="mt-6 space-y-4">
            {bestAnalysis && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">
                      Highest score
                    </p>

                    <p className="mt-2 text-4xl font-bold text-emerald-300">
                      {bestScore}
                      <span className="text-base text-slate-500">
                        /100
                      </span>
                    </p>
                  </div>

                  <Award
                    aria-hidden
                    className="h-7 w-7 text-emerald-300"
                  />
                </div>

                <p className="mt-4 line-clamp-2 text-sm font-semibold leading-6 text-white">
                  {bestAnalysis.title}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    handleExport(
                      bestAnalysis
                    )
                  }
                  disabled={
                    exportingId ===
                    bestAnalysis.id
                  }
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-300 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download
                    aria-hidden
                    className="h-4 w-4"
                  />

                  {exportingId ===
                  bestAnalysis.id
                    ? "Creating PDF..."
                    : "Export Best Report"}
                </button>
              </div>
            )}

            {lowestAnalysis && (
              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5">
                <p className="text-sm text-slate-400">
                  Lowest score
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {lowestScore}
                  <span className="text-sm text-slate-500">
                    /100
                  </span>
                </p>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
                  {lowestAnalysis.title}
                </p>

                <p className="mt-3 text-xs text-slate-600">
                  Improvement opportunity:{" "}
                  {Math.max(
                    0,
                    bestScore -
                      lowestScore
                  )}{" "}
                  points
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/10 sm:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-400">
                Recent Analytics
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Latest resume analyses
              </h2>
            </div>

            <Link
              href="/ats-resume-checker#ats-history-title"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-200"
            >
              View History

              <ArrowRight
                aria-hidden
                className="h-4 w-4"
              />
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {sortedHistory
              .slice(0, 6)
              .map(
                (
                  item,
                  index
                ) => {
                  const score =
                    clampScore(
                      item.result
                        .overallScore
                    );

                  const style =
                    getScoreClasses(
                      score
                    );

                  const previousItem =
                    sortedHistory[
                      index + 1
                    ];

                  const change =
                    previousItem
                      ? score -
                        clampScore(
                          previousItem
                            .result
                            .overallScore
                        )
                      : 0;

                  return (
                    <article
                      key={item.id}
                      className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 sm:flex-row sm:items-center"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-white">
                          {item.title}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span>
                            {formatDate(
                              getItemDate(
                                item
                              )
                            )}
                          </span>

                          <span>
                            {
                              item.result
                                .matchedKeywords
                                .length
                            }{" "}
                            matched
                          </span>

                          <span>
                            {
                              item.result
                                .missingKeywords
                                .length
                            }{" "}
                            missing
                          </span>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        {change > 0 && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300">
                            <TrendingUp
                              aria-hidden
                              className="h-3.5 w-3.5"
                            />

                            +{change}
                          </span>
                        )}

                        {change < 0 && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-300">
                            <TrendingDown
                              aria-hidden
                              className="h-3.5 w-3.5"
                            />

                            {change}
                          </span>
                        )}

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-bold ${style.border} ${style.background} ${style.text}`}
                        >
                          {score}/100 ·{" "}
                          {getScoreLabel(
                            score
                          )}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            handleExport(
                              item
                            )
                          }
                          disabled={
                            exportingId ===
                            item.id
                          }
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-400 transition hover:border-emerald-500 hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label="Export ATS report PDF"
                        >
                          <Download
                            aria-hidden
                            className="h-4 w-4"
                          />
                        </button>
                      </div>
                    </article>
                  );
                }
              )}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 via-slate-900 to-blue-500/10 p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-300">
              Next Improvement
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Continue optimizing your
              resume
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
              Use missing keyword trends
              and score breakdowns to
              create a truthful, relevant,
              and ATS-friendly resume for
              your next application.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/ats-resume-checker"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-500"
            >
              <FileSearch
                aria-hidden
                className="h-4 w-4"
              />

              Analyze Again
            </Link>

            <Link
              href="/ats-resume-checker#ats-bullet-rewriter-title"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-5 py-3 text-sm font-bold text-violet-200 transition hover:bg-violet-500/20"
            >
              <Sparkles
                aria-hidden
                className="h-4 w-4"
              />

              Rewrite a Bullet
            </Link>
          </div>
        </div>
      </section>

      {aiSummaryDeleteTarget && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeAiSummaryDeleteDialog();
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-ai-summary-title"
            aria-describedby="delete-ai-summary-description"
            className="w-full max-w-md overflow-hidden rounded-2xl border border-red-500/30 bg-slate-950 shadow-2xl shadow-black/50"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-300">
                  <AlertTriangle
                    aria-hidden
                    className="h-5 w-5"
                  />
                </span>

                <div>
                  <h2
                    id="delete-ai-summary-title"
                    className="font-bold text-white"
                  >
                    {aiSummaryDeleteTarget.mode ===
                    "all"
                      ? "Clear all saved summaries?"
                      : "Delete this saved summary?"}
                  </h2>

                  <p
                    id="delete-ai-summary-description"
                    className="mt-2 text-sm leading-6 text-slate-400"
                  >
                    {aiSummaryDeleteTarget.mode ===
                    "all"
                      ? "This removes all saved AI summaries from your history view."
                      : `This removes the summary generated ${formatDate(
                          aiSummaryDeleteTarget
                            .item.generatedAt
                        )} from your history view.`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={
                  closeAiSummaryDeleteDialog
                }
                disabled={
                  isDeletingAiSummaryHistory
                }
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-400 transition hover:text-white disabled:opacity-50"
                aria-label="Close confirmation dialog"
              >
                <X
                  aria-hidden
                  className="h-4 w-4"
                />
              </button>
            </div>

            <div className="p-5">
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <p className="text-xs leading-6 text-amber-100">
                  Deleting history does not reset
                  today&apos;s AI usage limit.
                </p>
              </div>

              <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={
                    closeAiSummaryDeleteDialog
                  }
                  disabled={
                    isDeletingAiSummaryHistory
                  }
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-bold text-slate-300 transition hover:text-white disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() =>
                    void confirmAiSummaryHistoryDeletion()
                  }
                  disabled={
                    isDeletingAiSummaryHistory
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDeletingAiSummaryHistory ? (
                    <Loader2
                      aria-hidden
                      className="h-4 w-4 animate-spin"
                    />
                  ) : (
                    <Trash2
                      aria-hidden
                      className="h-4 w-4"
                    />
                  )}

                  {isDeletingAiSummaryHistory
                    ? "Deleting..."
                    : aiSummaryDeleteTarget.mode ===
                        "all"
                      ? "Clear All History"
                      : "Delete Summary"}
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}