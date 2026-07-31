"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  CalendarDays,
  Download,
  FileSearch,
  Gauge,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

import {
  exportAtsHistoryItemPdf,
} from "@/lib/ats/exportAtsPdf";

import {
  getAtsAnalysisHistory,
  type AtsAnalysisHistoryItem,
} from "@/lib/ats/analysisHistory";

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

  useEffect(() => {
    try {
      setHistory(
        getAtsAnalysisHistory()
      );
    } catch (error) {
      console.error(
        "Unable to load analytics history:",
        error
      );

      toast.error(
        "Unable to load analytics data."
      );
    } finally {
      setHistoryLoaded(true);
    }
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

  const previousAnalysis =
    sortedHistory[1] ?? null;

  const latestScore =
    latestAnalysis
      ? clampScore(
          latestAnalysis.result
            .overallScore
        )
      : 0;

  const previousScore =
    previousAnalysis
      ? clampScore(
          previousAnalysis.result
            .overallScore
        )
      : latestScore;

  const scoreChange =
    latestScore -
    previousScore;

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
    </div>
  );
}