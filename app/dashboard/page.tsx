"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart3,
  CalendarDays,
  Download,
  FileSearch,
  FileText,
  History,
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

type ScoreMetric = {
  label: string;
  value: number;
  icon: React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;
  helperText: string;
};

type TrendPoint = {
  id: string;
  label: string;
  score: number;
  createdAt: string;
};

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

function formatDashboardDate(
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
    return "Strong Match";
  }

  if (score >= 60) {
    return "Good Foundation";
  }

  if (score >= 40) {
    return "Needs Improvement";
  }

  return "Low Match";
}

function getScoreClasses(
  score: number
): {
  text: string;
  border: string;
  background: string;
  progress: string;
} {
  if (score >= 80) {
    return {
      text: "text-emerald-300",
      border: "border-emerald-500/30",
      background: "bg-emerald-500/10",
      progress: "bg-emerald-500",
    };
  }

  if (score >= 60) {
    return {
      text: "text-blue-300",
      border: "border-blue-500/30",
      background: "bg-blue-500/10",
      progress: "bg-blue-500",
    };
  }

  if (score >= 40) {
    return {
      text: "text-amber-300",
      border: "border-amber-500/30",
      background: "bg-amber-500/10",
      progress: "bg-amber-500",
    };
  }

  return {
    text: "text-red-300",
    border: "border-red-500/30",
    background: "bg-red-500/10",
    progress: "bg-red-500",
  };
}

function getRecentTrend(
  history: AtsAnalysisHistoryItem[]
): number {
  if (history.length < 2) {
    return 0;
  }

  const newest =
    history[0].result.overallScore;

  const previous =
    history[1].result.overallScore;

  return newest - previous;
}

function createTrendPoints(
  history: AtsAnalysisHistoryItem[]
): TrendPoint[] {
  return history
    .slice(0, 10)
    .reverse()
    .map((item) => ({
      id: item.id,
      label: formatShortDate(
        item.updatedAt ||
          item.createdAt
      ),
      score: clampScore(
        item.result.overallScore
      ),
      createdAt:
        item.updatedAt ||
        item.createdAt,
    }));
}

function createChartPath(
  points: TrendPoint[],
  width: number,
  height: number,
  padding: number
): string {
  if (points.length === 0) {
    return "";
  }

  const chartWidth =
    width - padding * 2;

  const chartHeight =
    height - padding * 2;

  return points
    .map((point, index) => {
      const x =
        points.length === 1
          ? width / 2
          : padding +
            (index /
              (points.length - 1)) *
              chartWidth;

      const y =
        padding +
        chartHeight -
        (point.score / 100) *
          chartHeight;

      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

function ScoreGauge({
  score,
}: {
  score: number;
}) {
  const safeScore =
    clampScore(score);

  const radius = 62;
  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (safeScore / 100) *
      circumference;

  const style =
    getScoreClasses(safeScore);

  return (
    <div className="relative flex h-44 w-44 items-center justify-center">
      <svg
        viewBox="0 0 160 160"
        className="h-full w-full -rotate-90"
        role="img"
        aria-label={`ATS score ${safeScore} out of 100`}
      >
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          className="text-slate-800"
        />

        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={
            circumference
          }
          strokeDashoffset={
            offset
          }
          className={style.text}
        />
      </svg>

      <div className="absolute text-center">
        <p className="text-4xl font-bold text-white">
          {safeScore}
        </p>

        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
          ATS Score
        </p>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon: Icon,
  helperText,
}: ScoreMetric) {
  const style =
    getScoreClasses(value);

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {value}
          </p>
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
            width: `${clampScore(
              value
            )}%`,
          }}
        />
      </div>
    </article>
  );
}

function EmptyDashboard() {
  return (
    <section className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center sm:p-12">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-300">
        <FileSearch
          aria-hidden
          className="h-8 w-8"
        />
      </span>

      <h2 className="mt-5 text-2xl font-bold text-white">
        Complete your first ATS analysis
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-400">
        Analyze a resume against a job
        description to unlock score trends,
        history insights, best-match reports,
        and personalized dashboard metrics.
      </p>

      <Link
        href="/ats-resume-checker"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
      >
        Start New Analysis

        <ArrowRight
          aria-hidden
          className="h-4 w-4"
        />
      </Link>
    </section>
  );
}

export default function DashboardPage() {
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
    } catch (historyError) {
      console.error(
        "Unable to load dashboard history:",
        historyError
      );

      toast.error(
        "Unable to load dashboard data."
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
              second.updatedAt ||
                second.createdAt
            ).getTime() -
            new Date(
              first.updatedAt ||
                first.createdAt
            ).getTime()
        ),
      [history]
    );

  const scores = useMemo(
    () =>
      sortedHistory.map((item) =>
        clampScore(
          item.result.overallScore
        )
      ),
    [sortedHistory]
  );

  const totalAnalyses =
    sortedHistory.length;

  const averageScore =
    calculateAverage(scores);

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

  const latestAnalysis =
    sortedHistory[0] ?? null;

  const bestScore =
    bestAnalysis
      ? clampScore(
          bestAnalysis.result
            .overallScore
        )
      : 0;

  const latestScore =
    latestAnalysis
      ? clampScore(
          latestAnalysis.result
            .overallScore
        )
      : 0;

  const recentTrend =
    getRecentTrend(
      sortedHistory
    );

  const trendPoints =
    useMemo(
      () =>
        createTrendPoints(
          sortedHistory
        ),
      [sortedHistory]
    );

  const chartWidth = 760;
  const chartHeight = 240;
  const chartPadding = 28;

  const chartPath =
    createChartPath(
      trendPoints,
      chartWidth,
      chartHeight,
      chartPadding
    );

  const metrics =
    useMemo<ScoreMetric[]>(
      () => [
        {
          label: "Total Analyses",
          value: Math.min(
            totalAnalyses,
            100
          ),
          icon: FileSearch,
          helperText: `${totalAnalyses} resume-to-job comparisons saved in this browser.`,
        },
        {
          label: "Average Score",
          value: averageScore,
          icon: BarChart3,
          helperText:
            "Average ATS alignment across all saved analyses.",
        },
        {
          label: "Best Score",
          value: bestScore,
          icon: Award,
          helperText:
            "Highest ATS match score achieved so far.",
        },
        {
          label: "Latest Score",
          value: latestScore,
          icon: Target,
          helperText:
            "Score from your most recent resume analysis.",
        },
      ],
      [
        totalAnalyses,
        averageScore,
        bestScore,
        latestScore,
      ]
    );

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
    } catch (pdfError) {
      console.error(
        "Dashboard PDF export error:",
        pdfError
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
        <div className="h-40 animate-pulse rounded-3xl bg-slate-900" />

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
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="space-y-8">
        <section className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/50 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
            Premium Dashboard
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Resume performance overview
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            Track your ATS progress, review
            analysis history, export reports,
            and identify your strongest resume
            version.
          </p>
        </section>

        <EmptyDashboard />
      </div>
    );
  }

  const latestScoreStyle =
    getScoreClasses(
      latestScore
    );

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/60 p-6 shadow-xl shadow-black/20 sm:p-8">
        <div className="flex flex-col justify-between gap-8 xl:flex-row xl:items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              Premium Dashboard
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Improve your resume with
              measurable ATS insights
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              Review your latest score, monitor
              progress over time, restore saved
              analyses, and export professional
              PDF reports.
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
                href="/ats-resume-checker#ats-history-title"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/70 px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-blue-500 hover:text-white"
              >
                <History
                  aria-hidden
                  className="h-4 w-4"
                />

                View History
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center rounded-3xl border border-slate-700 bg-slate-950/60 p-6 sm:flex-row sm:gap-7 xl:min-w-[390px]">
            <ScoreGauge
              score={latestScore}
            />

            <div className="mt-4 text-center sm:mt-0 sm:text-left">
              <p
                className={`text-lg font-bold ${latestScoreStyle.text}`}
              >
                {getScoreLabel(
                  latestScore
                )}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Latest ATS analysis
              </p>

              {recentTrend === 0 ? (
                <p className="mt-3 text-xs text-slate-500">
                  Complete another analysis
                  to measure progress.
                </p>
              ) : recentTrend > 0 ? (
                <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-300">
                  <TrendingUp
                    aria-hidden
                    className="h-4 w-4"
                  />

                  +{recentTrend} points
                </p>
              ) : (
                <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-amber-300">
                  <TrendingDown
                    aria-hidden
                    className="h-4 w-4"
                  />

                  {recentTrend} points
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Dashboard metrics"
        className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
      >
        {metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            {...metric}
          />
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/10 sm:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
                Score Trend
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                ATS performance over time
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Your latest ten saved ATS
                analysis scores.
              </p>
            </div>

            <Link
              href="/dashboard/analytics"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-200"
            >
              Full Analytics

              <ArrowRight
                aria-hidden
                className="h-4 w-4"
              />
            </Link>
          </div>

          <div className="mt-7 overflow-x-auto">
            <div className="min-w-[620px]">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="h-[260px] w-full"
                role="img"
                aria-label="ATS score trend chart"
              >
                {[0, 25, 50, 75, 100].map(
                  (score) => {
                    const y =
                      chartPadding +
                      (chartHeight -
                        chartPadding *
                          2) -
                      (score / 100) *
                        (chartHeight -
                          chartPadding *
                            2);

                    return (
                      <g key={score}>
                        <line
                          x1={
                            chartPadding
                          }
                          y1={y}
                          x2={
                            chartWidth -
                            chartPadding
                          }
                          y2={y}
                          stroke="currentColor"
                          strokeWidth="1"
                          className="text-slate-800"
                        />

                        <text
                          x="0"
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
                    const x =
                      trendPoints.length ===
                      1
                        ? chartWidth / 2
                        : chartPadding +
                          (index /
                            (trendPoints.length -
                              1)) *
                            (chartWidth -
                              chartPadding *
                                2);

                    const y =
                      chartPadding +
                      (chartHeight -
                        chartPadding *
                          2) -
                      (point.score /
                        100) *
                        (chartHeight -
                          chartPadding *
                            2);

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
                          y={
                            chartHeight -
                            4
                          }
                          textAnchor="middle"
                          fontSize="10"
                          fill="currentColor"
                          className="text-slate-500"
                        >
                          {point.label}
                        </text>
                      </g>
                    );
                  }
                )}
              </svg>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/10 sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-400">
            Best Analysis
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Highest scoring resume
          </h2>

          {bestAnalysis && (
            <>
              <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">
                      Best ATS score
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
                    className="h-8 w-8 text-emerald-300"
                  />
                </div>

                <p className="mt-4 line-clamp-2 text-sm font-semibold leading-6 text-white">
                  {bestAnalysis.title}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  {formatDashboardDate(
                    bestAnalysis.updatedAt ||
                      bestAnalysis.createdAt
                  )}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs text-slate-500">
                    Keywords
                  </p>

                  <p className="mt-1 text-xl font-bold text-white">
                    {
                      bestAnalysis
                        .result
                        .keywordScore
                    }
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs text-slate-500">
                    Formatting
                  </p>

                  <p className="mt-1 text-xl font-bold text-white">
                    {
                      bestAnalysis
                        .result
                        .formattingScore
                    }
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs text-slate-500">
                    Achievements
                  </p>

                  <p className="mt-1 text-xl font-bold text-white">
                    {
                      bestAnalysis
                        .result
                        .achievementScore
                    }
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs text-slate-500">
                    Readability
                  </p>

                  <p className="mt-1 text-xl font-bold text-white">
                    {
                      bestAnalysis
                        .result
                        .readabilityScore
                    }
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href="/ats-resume-checker#ats-history-title"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
                >
                  <History
                    aria-hidden
                    className="h-4 w-4"
                  />

                  Restore Analysis
                </Link>

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
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-300 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
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
            </>
          )}
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/10 sm:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-400">
                Recent Activity
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Latest analyses
              </h2>
            </div>

            <Link
              href="/ats-resume-checker#ats-history-title"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-200"
            >
              View All

              <ArrowRight
                aria-hidden
                className="h-4 w-4"
              />
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {sortedHistory
              .slice(0, 5)
              .map((item) => {
                const score =
                  clampScore(
                    item.result
                      .overallScore
                  );

                const style =
                  getScoreClasses(
                    score
                  );

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
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays
                            aria-hidden
                            className="h-3.5 w-3.5"
                          />

                          {formatDashboardDate(
                            item.updatedAt ||
                              item.createdAt
                          )}
                        </span>

                        <span>
                          {
                            item.result
                              .matchedKeywords
                              .length
                          }{" "}
                          matched keywords
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-bold ${style.border} ${style.background} ${style.text}`}
                      >
                        {score}/100
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
                        aria-label="Export ATS PDF"
                      >
                        <Download
                          aria-hidden
                          className="h-4 w-4"
                        />
                      </button>
                    </div>
                  </article>
                );
              })}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/10 sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-400">
            Quick Actions
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Continue improving
          </h2>

          <div className="mt-6 space-y-3">
            <Link
              href="/ats-resume-checker"
              className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4 transition hover:border-blue-500/50 hover:bg-blue-500/5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-300">
                <FileSearch
                  aria-hidden
                  className="h-5 w-5"
                />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-white">
                  New ATS Analysis
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  Compare another resume
                  and job description.
                </span>
              </span>

              <ArrowRight
                aria-hidden
                className="h-4 w-4 text-slate-600 transition group-hover:text-blue-300"
              />
            </Link>

            <Link
              href="/ats-resume-checker#ats-bullet-rewriter-title"
              className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4 transition hover:border-violet-500/50 hover:bg-violet-500/5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-300">
                <Sparkles
                  aria-hidden
                  className="h-5 w-5"
                />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-white">
                  AI Bullet Rewrite
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  Strengthen a weak resume
                  bullet with AI.
                </span>
              </span>

              <ArrowRight
                aria-hidden
                className="h-4 w-4 text-slate-600 transition group-hover:text-violet-300"
              />
            </Link>

            <Link
              href="/dashboard/reports"
              className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4 transition hover:border-emerald-500/50 hover:bg-emerald-500/5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                <FileText
                  aria-hidden
                  className="h-5 w-5"
                />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-white">
                  Saved Reports
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  Review and export ATS
                  PDF reports.
                </span>
              </span>

              <ArrowRight
                aria-hidden
                className="h-4 w-4 text-slate-600 transition group-hover:text-emerald-300"
              />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}