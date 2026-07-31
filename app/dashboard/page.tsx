"use client";

import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Cloud,
  FileSearch,
  Loader2,
  RefreshCw,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

import {
  loadResumeAnalyses,
  type ResumeAnalysisRecord,
} from "@/lib/supabase/resume-analyses";

function calculateAverage(
  values: number[]
): number {
  if (values.length === 0) {
    return 0;
  }

  const total = values.reduce(
    (sum, value) => sum + value,
    0
  );

  return Math.round(
    total / values.length
  );
}

function getScoreTextClass(
  score: number
): string {
  if (score >= 80) {
    return "text-emerald-300";
  }

  if (score >= 60) {
    return "text-blue-300";
  }

  if (score >= 40) {
    return "text-amber-300";
  }

  return "text-red-300";
}

function getScoreBarClass(
  score: number
): string {
  if (score >= 80) {
    return "bg-emerald-500";
  }

  if (score >= 60) {
    return "bg-blue-500";
  }

  if (score >= 40) {
    return "bg-amber-500";
  }

  return "bg-red-500";
}

function formatDate(
  value: string
): string {
  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat(
    "en",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  ).format(date);
}

function formatRelativeTime(
  value: string
): string {
  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Unknown";
  }

  const difference =
    Date.now() -
    date.getTime();

  const minutes =
    Math.floor(
      difference / 60_000
    );

  const hours =
    Math.floor(
      difference / 3_600_000
    );

  const days =
    Math.floor(
      difference / 86_400_000
    );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  if (days < 7) {
    return `${days}d ago`;
  }

  return new Intl.DateTimeFormat(
    "en",
    {
      dateStyle: "medium",
    }
  ).format(date);
}

function getFrequentMissingKeywords(
  analyses: ResumeAnalysisRecord[],
  maximumItems = 8
) {
  const frequency =
    new Map<string, number>();

  analyses.forEach(
    (analysis) => {
      analysis.missingKeywords.forEach(
        (keyword) => {
          const normalized =
            keyword
              .trim()
              .toLowerCase();

          if (!normalized) {
            return;
          }

          frequency.set(
            normalized,
            (frequency.get(
              normalized
            ) ?? 0) + 1
          );
        }
      );
    }
  );

  return [
    ...frequency.entries(),
  ]
    .map(
      ([keyword, count]) => ({
        keyword,
        count,
      })
    )
    .sort(
      (first, second) => {
        if (
          second.count !==
          first.count
        ) {
          return (
            second.count -
            first.count
          );
        }

        return first.keyword.localeCompare(
          second.keyword
        );
      }
    )
    .slice(0, maximumItems);
}

export default function DashboardPage() {
  const [
    analyses,
    setAnalyses,
  ] = useState<
    ResumeAnalysisRecord[]
  >([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isRefreshing,
    setIsRefreshing,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const loadDashboardData =
    useCallback(
      async (
        showRefreshToast = false
      ) => {
        if (showRefreshToast) {
          setIsRefreshing(true);
        } else {
          setIsLoading(true);
        }

        setErrorMessage("");

        try {
          const records =
            await loadResumeAnalyses(
              100
            );

          setAnalyses(records);

          if (
            showRefreshToast
          ) {
            toast.success(
              "Dashboard refreshed."
            );
          }
        } catch (error) {
          console.error(
            "Dashboard cloud load error:",
            error
          );

          const message =
            error instanceof Error
              ? error.message
              : "Unable to load dashboard data.";

          setErrorMessage(
            message
          );

          toast.error(
            "Unable to load dashboard.",
            {
              description:
                message,
            }
          );
        } finally {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      },
      []
    );

  useEffect(() => {
    void loadDashboardData();
  }, [loadDashboardData]);

  const stats =
    useMemo(() => {
      const totalAnalyses =
        analyses.length;

      const averageScore =
        calculateAverage(
          analyses.map(
            (analysis) =>
              analysis.overallScore
          )
        );

      const averageKeywordScore =
        calculateAverage(
          analyses.map(
            (analysis) =>
              analysis.keywordScore
          )
        );

      const averageStructureScore =
        calculateAverage(
          analyses.map(
            (analysis) =>
              analysis.structureScore
          )
        );

      const bestScore =
        totalAnalyses > 0
          ? Math.max(
              ...analyses.map(
                (analysis) =>
                  analysis.overallScore
              )
            )
          : 0;

      const latestScore =
        analyses[0]
          ?.overallScore ?? 0;

      const previousScore =
        analyses[1]
          ?.overallScore ?? 0;

      const scoreChange =
        totalAnalyses >= 2
          ? latestScore -
            previousScore
          : 0;

      const matchedKeywords =
        analyses.reduce(
          (
            total,
            analysis
          ) =>
            total +
            analysis
              .matchedKeywords
              .length,
          0
        );

      const missingKeywords =
        analyses.reduce(
          (
            total,
            analysis
          ) =>
            total +
            analysis
              .missingKeywords
              .length,
          0
        );

      return {
        totalAnalyses,
        averageScore,
        averageKeywordScore,
        averageStructureScore,
        bestScore,
        latestScore,
        scoreChange,
        matchedKeywords,
        missingKeywords,
      };
    }, [analyses]);

  const scoreTrend =
    useMemo(
      () =>
        [...analyses]
          .reverse()
          .slice(-8),
      [analyses]
    );

  const frequentMissingKeywords =
    useMemo(
      () =>
        getFrequentMissingKeywords(
          analyses
        ),
      [analyses]
    );

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2
            aria-hidden
            className="mx-auto h-9 w-9 animate-spin text-blue-400"
          />

          <p className="mt-4 text-sm text-slate-400">
            Loading your cloud
            dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <section className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-red-200">
          Dashboard data
          unavailable
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-red-100/80">
          {errorMessage}
        </p>

        <button
          type="button"
          onClick={() =>
            void loadDashboardData()
          }
          className="mt-6 rounded-xl border border-red-300/30 px-5 py-3 font-semibold text-red-100 transition hover:bg-red-500/10"
        >
          Try Again
        </button>
      </section>
    );
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-blue-600/15 via-slate-900 to-violet-600/10 p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              <Cloud
                aria-hidden
                className="h-4 w-4"
              />

              Live Cloud Dashboard
            </div>

            <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your real ATS
              performance workspace
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
              Scores, history,
              keyword gaps and recent
              reports are loaded from
              your personal Supabase
              account.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                void loadDashboardData(
                  true
                )
              }
              disabled={
                isRefreshing
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                aria-hidden
                className={`h-4 w-4 ${
                  isRefreshing
                    ? "animate-spin"
                    : ""
                }`}
              />

              {isRefreshing
                ? "Refreshing..."
                : "Refresh Data"}
            </button>

            <Link
              href="/ats-resume-checker"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-500"
            >
              Run New Analysis

              <ArrowRight
                aria-hidden
                className="h-4 w-4"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Analyses"
          value={String(
            stats.totalAnalyses
          )}
          caption="Cloud records"
          icon={FileSearch}
          iconClass="bg-blue-500/10 text-blue-300"
        />

        <StatCard
          label="Average ATS Score"
          value={`${stats.averageScore}/100`}
          caption="All reports"
          icon={BarChart3}
          iconClass="bg-violet-500/10 text-violet-300"
          valueClass={getScoreTextClass(
            stats.averageScore
          )}
        />

        <StatCard
          label="Best ATS Score"
          value={`${stats.bestScore}/100`}
          caption="Best result"
          icon={Target}
          iconClass="bg-emerald-500/10 text-emerald-300"
          valueClass={getScoreTextClass(
            stats.bestScore
          )}
        />

        <StatCard
          label="Latest ATS Score"
          value={`${stats.latestScore}/100`}
          caption={`${
            stats.scoreChange > 0
              ? "+"
              : ""
          }${stats.scoreChange} change`}
          icon={
            stats.scoreChange >= 0
              ? TrendingUp
              : TrendingDown
          }
          iconClass="bg-amber-500/10 text-amber-300"
          valueClass={getScoreTextClass(
            stats.latestScore
          )}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-white">
                ATS Score Trend
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Latest cloud reports
                from oldest to newest.
              </p>
            </div>

            <Link
              href="/dashboard/analytics"
              className="text-sm font-semibold text-blue-300 transition hover:text-blue-200"
            >
              Open Analytics
            </Link>
          </div>

          {scoreTrend.length ===
          0 ? (
            <EmptyState
              title="No score trend yet"
              description="Run your first ATS analysis to begin tracking progress."
            />
          ) : (
            <div className="mt-7 flex h-72 items-end gap-3 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 p-5">
              {scoreTrend.map(
                (analysis) => {
                  const height =
                    Math.max(
                      8,
                      analysis.overallScore
                    );

                  return (
                    <div
                      key={
                        analysis.id
                      }
                      className="flex min-w-14 flex-1 flex-col items-center justify-end"
                    >
                      <span
                        className={`mb-2 text-xs font-bold ${getScoreTextClass(
                          analysis.overallScore
                        )}`}
                      >
                        {
                          analysis.overallScore
                        }
                      </span>

                      <div className="flex h-48 w-full items-end rounded-xl bg-slate-900 p-1">
                        <div
                          className={`w-full rounded-lg ${getScoreBarClass(
                            analysis.overallScore
                          )}`}
                          style={{
                            height: `${height}%`,
                          }}
                        />
                      </div>

                      <span className="mt-2 text-[11px] text-slate-600">
                        {formatRelativeTime(
                          analysis.createdAt
                        )}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold text-white">
            Resume Quality
            Averages
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Average quality signals
            across your cloud reports.
          </p>

          <div className="mt-6 space-y-5">
            <ProgressItem
              label="Keyword Match"
              score={
                stats.averageKeywordScore
              }
            />

            <ProgressItem
              label="Resume Structure"
              score={
                stats.averageStructureScore
              }
            />

            <ProgressItem
              label="Overall ATS"
              score={
                stats.averageScore
              }
            />
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <p className="text-xs text-emerald-200/70">
                Matched Keywords
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-300">
                {
                  stats.matchedKeywords
                }
              </p>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
              <p className="text-xs text-amber-200/70">
                Missing Keywords
              </p>

              <p className="mt-2 text-2xl font-bold text-amber-300">
                {
                  stats.missingKeywords
                }
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-white">
                Recent Cloud
                Analyses
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Reports saved
                automatically after
                analysis.
              </p>
            </div>

            <Link
              href="/dashboard/reports"
              className="text-sm font-semibold text-blue-300 transition hover:text-blue-200"
            >
              View All Reports
            </Link>
          </div>

          {analyses.length === 0 ? (
            <EmptyState
              title="No cloud analyses yet"
              description="Run an ATS analysis while signed in. It will appear here automatically."
            />
          ) : (
            <div className="mt-6 space-y-3">
              {analyses
                .slice(0, 6)
                .map(
                  (analysis) => (
                    <article
                      key={
                        analysis.id
                      }
                      className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:flex-row sm:items-center"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-white">
                          {
                            analysis.title
                          }
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays
                              aria-hidden
                              className="h-3.5 w-3.5"
                            />

                            {formatDate(
                              analysis.createdAt
                            )}
                          </span>

                          <span>
                            {
                              analysis
                                .matchedKeywords
                                .length
                            }{" "}
                            matched
                          </span>

                          <span>
                            {
                              analysis
                                .missingKeywords
                                .length
                            }{" "}
                            missing
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-xs text-slate-500">
                            Keywords
                          </p>

                          <p className="mt-1 font-bold text-slate-200">
                            {
                              analysis.keywordScore
                            }
                            /100
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-500">
                            ATS Score
                          </p>

                          <p
                            className={`mt-1 text-lg font-bold ${getScoreTextClass(
                              analysis.overallScore
                            )}`}
                          >
                            {
                              analysis.overallScore
                            }
                            /100
                          </p>
                        </div>
                      </div>
                    </article>
                  )
                )}
            </div>
          )}
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold text-white">
            Frequent Keyword Gaps
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Missing keywords that
            appear most often across
            your reports.
          </p>

          {frequentMissingKeywords.length ===
          0 ? (
            <EmptyState
              title="No recurring gaps"
              description="No frequent missing keywords were found yet."
            />
          ) : (
            <div className="mt-6 space-y-3">
              {frequentMissingKeywords.map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={
                      item.keyword
                    }
                    className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-xs font-bold text-amber-300">
                        {index + 1}
                      </span>

                      <span className="truncate text-sm font-semibold capitalize text-slate-200">
                        {
                          item.keyword
                        }
                      </span>
                    </div>

                    <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                      {item.count}x
                    </span>
                  </div>
                )
              )}
            </div>
          )}
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <DashboardLinkCard
          title="Detailed Analytics"
          description="Review trends, averages, keyword gaps and improvement activity."
          href="/dashboard/analytics"
          icon={BarChart3}
        />

        <DashboardLinkCard
          title="Reports Center"
          description="Open your saved cloud reports and export professional PDFs."
          href="/dashboard/reports"
          icon={FileSearch}
        />

        <DashboardLinkCard
          title="Compare Analyses"
          description="Compare two saved ATS reports and measure improvement."
          href="/dashboard/compare"
          icon={TrendingUp}
        />
      </section>
    </div>
  );
}

type IconComponent =
  typeof FileSearch;

function StatCard({
  label,
  value,
  caption,
  icon: Icon,
  iconClass,
  valueClass = "text-white",
}: {
  label: string;
  value: string;
  caption: string;
  icon: IconComponent;
  iconClass: string;
  valueClass?: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center justify-between">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon
            aria-hidden
            className="h-5 w-5"
          />
        </span>

        <span className="text-xs text-slate-500">
          {caption}
        </span>
      </div>

      <p className="mt-5 text-sm text-slate-400">
        {label}
      </p>

      <p
        className={`mt-2 text-3xl font-bold ${valueClass}`}
      >
        {value}
      </p>
    </article>
  );
}

function ProgressItem({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="text-slate-300">
          {label}
        </span>

        <span
          className={`font-bold ${getScoreTextClass(
            score
          )}`}
        >
          {score}/100
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${getScoreBarClass(
            score
          )}`}
          style={{
            width: `${Math.max(
              0,
              Math.min(
                100,
                score
              )
            )}%`,
          }}
        />
      </div>
    </div>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-8 text-center">
      <FileSearch
        aria-hidden
        className="mx-auto h-8 w-8 text-slate-600"
      />

      <p className="mt-4 font-semibold text-white">
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function DashboardLinkCard({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: IconComponent;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-blue-500/50"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300 transition group-hover:bg-blue-500/20">
        <Icon
          aria-hidden
          className="h-5 w-5"
        />
      </span>

      <h2 className="mt-5 font-bold text-white">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>

      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-300">
        Open

        <ArrowRight
          aria-hidden
          className="h-4 w-4 transition group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}