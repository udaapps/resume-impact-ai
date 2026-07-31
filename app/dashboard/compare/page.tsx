"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronDown,
  Download,
  FileSearch,
  GitCompareArrows,
  Minus,
  Plus,
  Sparkles,
  TrendingDown,
  TrendingUp,
  XCircle,
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

type ComparisonMetric = {
  label: string;
  before: number;
  after: number;
  difference: number;
};

function clampScore(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(100, Math.round(value))
  );
}

function getItemDate(
  item: AtsAnalysisHistoryItem
): string {
  return item.updatedAt || item.createdAt;
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
      dateStyle: "medium",
      timeStyle: "short",
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

function normalizeKeyword(
  keyword: string
): string {
  return keyword
    .trim()
    .toLowerCase();
}

function uniqueKeywords(
  keywords: string[]
): string[] {
  const keywordMap =
    new Map<string, string>();

  for (const keyword of keywords) {
    const normalized =
      normalizeKeyword(keyword);

    if (
      normalized &&
      !keywordMap.has(normalized)
    ) {
      keywordMap.set(
        normalized,
        keyword.trim()
      );
    }
  }

  return [
    ...keywordMap.values(),
  ];
}

function findAddedKeywords(
  beforeKeywords: string[],
  afterKeywords: string[]
): string[] {
  const beforeSet = new Set(
    beforeKeywords.map(
      normalizeKeyword
    )
  );

  return uniqueKeywords(
    afterKeywords
  ).filter(
    (keyword) =>
      !beforeSet.has(
        normalizeKeyword(keyword)
      )
  );
}

function findRemovedKeywords(
  beforeKeywords: string[],
  afterKeywords: string[]
): string[] {
  const afterSet = new Set(
    afterKeywords.map(
      normalizeKeyword
    )
  );

  return uniqueKeywords(
    beforeKeywords
  ).filter(
    (keyword) =>
      !afterSet.has(
        normalizeKeyword(keyword)
      )
  );
}

function MetricComparisonCard({
  metric,
}: {
  metric: ComparisonMetric;
}) {
  const difference =
    metric.difference;

  const improved =
    difference > 0;

  const declined =
    difference < 0;

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-300">
            {metric.label}
          </p>

          <div className="mt-4 flex items-center gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-slate-600">
                Before
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-300">
                {metric.before}
              </p>
            </div>

            <ArrowRight
              aria-hidden
              className="h-4 w-4 text-slate-600"
            />

            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-slate-600">
                After
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {metric.after}
              </p>
            </div>
          </div>
        </div>

        <span
          className={
            improved
              ? "inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300"
              : declined
                ? "inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-300"
                : "inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-bold text-slate-400"
          }
        >
          {improved ? (
            <TrendingUp
              aria-hidden
              className="h-3.5 w-3.5"
            />
          ) : declined ? (
            <TrendingDown
              aria-hidden
              className="h-3.5 w-3.5"
            />
          ) : (
            <Minus
              aria-hidden
              className="h-3.5 w-3.5"
            />
          )}

          {difference > 0
            ? `+${difference}`
            : difference}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-slate-500"
            style={{
              width: `${metric.before}%`,
            }}
          />
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className={
              improved
                ? "h-full rounded-full bg-emerald-500"
                : declined
                  ? "h-full rounded-full bg-red-500"
                  : "h-full rounded-full bg-blue-500"
            }
            style={{
              width: `${metric.after}%`,
            }}
          />
        </div>
      </div>
    </article>
  );
}

function KeywordList({
  title,
  keywords,
  variant,
  emptyText,
}: {
  title: string;
  keywords: string[];
  variant:
    | "positive"
    | "warning"
    | "negative"
    | "neutral";
  emptyText: string;
}) {
  const styles = {
    positive: {
      section:
        "border-emerald-500/25 bg-emerald-500/5",
      title:
        "text-emerald-300",
      badge:
        "border-emerald-500/25 bg-emerald-500/10 text-emerald-200",
      icon: CheckCircle2,
    },

    warning: {
      section:
        "border-amber-500/25 bg-amber-500/5",
      title:
        "text-amber-300",
      badge:
        "border-amber-500/25 bg-amber-500/10 text-amber-200",
      icon: Sparkles,
    },

    negative: {
      section:
        "border-red-500/25 bg-red-500/5",
      title:
        "text-red-300",
      badge:
        "border-red-500/25 bg-red-500/10 text-red-200",
      icon: XCircle,
    },

    neutral: {
      section:
        "border-slate-700 bg-slate-950",
      title:
        "text-slate-300",
      badge:
        "border-slate-700 bg-slate-900 text-slate-300",
      icon: Minus,
    },
  };

  const style = styles[variant];
  const Icon = style.icon;

  return (
    <section
      className={`rounded-2xl border p-5 ${style.section}`}
    >
      <div className="flex items-center justify-between gap-4">
        <h3
          className={`font-bold ${style.title}`}
        >
          {title}
        </h3>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-bold ${style.badge}`}
        >
          {keywords.length}
        </span>
      </div>

      {keywords.length === 0 ? (
        <p className="mt-4 text-sm leading-6 text-slate-500">
          {emptyText}
        </p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          {keywords.map(
            (keyword) => (
              <span
                key={keyword}
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm ${style.badge}`}
              >
                <Icon
                  aria-hidden
                  className="h-3.5 w-3.5"
                />

                {keyword}
              </span>
            )
          )}
        </div>
      )}
    </section>
  );
}

function EmptyComparison() {
  return (
    <section className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center sm:p-12">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 text-violet-300">
        <GitCompareArrows
          aria-hidden
          className="h-8 w-8"
        />
      </span>

      <h2 className="mt-5 text-2xl font-bold text-white">
        Two saved reports are required
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-400">
        Complete at least two ATS
        analyses before using the report
        comparison tool. This lets you
        compare an earlier resume with an
        improved version.
      </p>

      <Link
        href="/ats-resume-checker"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
      >
        <FileSearch
          aria-hidden
          className="h-4 w-4"
        />

        Create Another Analysis
      </Link>
    </section>
  );
}

export default function ComparePage() {
  const [
    reports,
    setReports,
  ] = useState<
    AtsAnalysisHistoryItem[]
  >([]);

  const [
    reportsLoaded,
    setReportsLoaded,
  ] = useState(false);

  const [
    beforeReportId,
    setBeforeReportId,
  ] = useState("");

  const [
    afterReportId,
    setAfterReportId,
  ] = useState("");

  const [
    exportingId,
    setExportingId,
  ] = useState<string | null>(
    null
  );

  useEffect(() => {
    try {
      const savedReports =
        getAtsAnalysisHistory();

      const sortedReports = [
        ...savedReports,
      ].sort(
        (first, second) =>
          new Date(
            getItemDate(second)
          ).getTime() -
          new Date(
            getItemDate(first)
          ).getTime()
      );

      setReports(sortedReports);

      if (
        sortedReports.length >= 2
      ) {
        setAfterReportId(
          sortedReports[0].id
        );

        setBeforeReportId(
          sortedReports[
            sortedReports.length - 1
          ].id
        );
      }
    } catch (error) {
      console.error(
        "Unable to load comparison reports:",
        error
      );

      toast.error(
        "Unable to load saved reports."
      );
    } finally {
      setReportsLoaded(true);
    }
  }, []);

  const beforeReport =
    useMemo(
      () =>
        reports.find(
          (item) =>
            item.id === beforeReportId
        ) ?? null,
      [
        reports,
        beforeReportId,
      ]
    );

  const afterReport =
    useMemo(
      () =>
        reports.find(
          (item) =>
            item.id === afterReportId
        ) ?? null,
      [
        reports,
        afterReportId,
      ]
    );

  const metrics =
    useMemo<
      ComparisonMetric[]
    >(() => {
      if (
        !beforeReport ||
        !afterReport
      ) {
        return [];
      }

      const values = [
        {
          label:
            "Overall ATS Score",
          before:
            beforeReport.result
              .overallScore,
          after:
            afterReport.result
              .overallScore,
        },
        {
          label:
            "Keyword Match",
          before:
            beforeReport.result
              .keywordScore,
          after:
            afterReport.result
              .keywordScore,
        },
        {
          label:
            "Skills Match",
          before:
            beforeReport.result
              .skillsScore,
          after:
            afterReport.result
              .skillsScore,
        },
        {
          label:
            "Experience",
          before:
            beforeReport.result
              .experienceScore,
          after:
            afterReport.result
              .experienceScore,
        },
        {
          label:
            "Resume Structure",
          before:
            beforeReport.result
              .structureScore,
          after:
            afterReport.result
              .structureScore,
        },
        {
          label:
            "Bullet Quality",
          before:
            beforeReport.result
              .bulletScore,
          after:
            afterReport.result
              .bulletScore,
        },
        {
          label:
            "Achievements",
          before:
            beforeReport.result
              .achievementScore,
          after:
            afterReport.result
              .achievementScore,
        },
        {
          label:
            "Formatting",
          before:
            beforeReport.result
              .formattingScore,
          after:
            afterReport.result
              .formattingScore,
        },
        {
          label:
            "Readability",
          before:
            beforeReport.result
              .readabilityScore,
          after:
            afterReport.result
              .readabilityScore,
        },
      ];

      return values.map(
        (metric) => ({
          label: metric.label,

          before: clampScore(
            metric.before
          ),

          after: clampScore(
            metric.after
          ),

          difference:
            clampScore(metric.after) -
            clampScore(metric.before),
        })
      );
    }, [
      beforeReport,
      afterReport,
    ]);

  const comparison =
    useMemo(() => {
      if (
        !beforeReport ||
        !afterReport
      ) {
        return null;
      }

      const matchedAdded =
        findAddedKeywords(
          beforeReport.result
            .matchedKeywords,
          afterReport.result
            .matchedKeywords
        );

      const matchedRemoved =
        findRemovedKeywords(
          beforeReport.result
            .matchedKeywords,
          afterReport.result
            .matchedKeywords
        );

      const missingResolved =
        findRemovedKeywords(
          beforeReport.result
            .missingKeywords,
          afterReport.result
            .missingKeywords
        );

      const newMissing =
        findAddedKeywords(
          beforeReport.result
            .missingKeywords,
          afterReport.result
            .missingKeywords
        );

      const sectionsAdded =
        findAddedKeywords(
          beforeReport.result
            .foundSections,
          afterReport.result
            .foundSections
        );

      const missingSectionsResolved =
        findRemovedKeywords(
          beforeReport.result
            .missingSections,
          afterReport.result
            .missingSections
        );

      const beforeScore =
        clampScore(
          beforeReport.result
            .overallScore
        );

      const afterScore =
        clampScore(
          afterReport.result
            .overallScore
        );

      return {
        beforeScore,
        afterScore,

        scoreDifference:
          afterScore - beforeScore,

        matchedAdded,
        matchedRemoved,
        missingResolved,
        newMissing,
        sectionsAdded,
        missingSectionsResolved,

        recommendationChange:
          beforeReport.result
            .recommendations.length -
          afterReport.result
            .recommendations.length,
      };
    }, [
      beforeReport,
      afterReport,
    ]);

  const winner =
    useMemo(() => {
      if (!comparison) {
        return "equal";
      }

      if (
        comparison.afterScore >
        comparison.beforeScore
      ) {
        return "after";
      }

      if (
        comparison.beforeScore >
        comparison.afterScore
      ) {
        return "before";
      }

      return "equal";
    }, [comparison]);

  function handleSwapReports() {
    const currentBefore =
      beforeReportId;

    setBeforeReportId(
      afterReportId
    );

    setAfterReportId(
      currentBefore
    );
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
        "Comparison PDF export error:",
        error
      );

      toast.error(
        "Unable to export the PDF report."
      );
    } finally {
      setExportingId(null);
    }
  }

  if (!reportsLoaded) {
    return (
      <div className="space-y-6">
        <div className="h-44 animate-pulse rounded-3xl bg-slate-900" />

        <div className="h-40 animate-pulse rounded-3xl bg-slate-900" />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(
            (item) => (
              <div
                key={item}
                className="h-44 animate-pulse rounded-2xl bg-slate-900"
              />
            )
          )}
        </div>
      </div>
    );
  }

  if (reports.length < 2) {
    return (
      <div className="space-y-8">
        <section className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950/50 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
            Report Comparison
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Compare resume improvements
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
            Compare two saved ATS
            analyses to measure score,
            keyword, structure and
            formatting improvements.
          </p>
        </section>

        <EmptyComparison />
      </div>
    );
  }

  const beforeStyle =
    getScoreClasses(
      comparison?.beforeScore ?? 0
    );

  const afterStyle =
    getScoreClasses(
      comparison?.afterScore ?? 0
    );

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950/50 p-6 shadow-xl shadow-black/20 sm:p-8">
        <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
              Report Comparison
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Compare before and after
              resume performance
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              Select two saved ATS
              reports to compare scores,
              keyword gains, resolved
              gaps, section improvements
              and remaining optimization
              opportunities.
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
                href="/dashboard/reports"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/70 px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-blue-500 hover:text-white"
              >
                View Reports
              </Link>
            </div>
          </div>

          {comparison && (
            <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-6 xl:min-w-[350px]">
              <p className="text-sm text-slate-400">
                Overall score change
              </p>

              <div className="mt-3 flex items-end gap-3">
                <p
                  className={
                    comparison.scoreDifference >
                    0
                      ? "text-5xl font-bold text-emerald-300"
                      : comparison.scoreDifference <
                          0
                        ? "text-5xl font-bold text-red-300"
                        : "text-5xl font-bold text-white"
                  }
                >
                  {comparison.scoreDifference >
                  0
                    ? `+${comparison.scoreDifference}`
                    : comparison.scoreDifference}
                </p>

                <span className="pb-1 text-sm text-slate-500">
                  points
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                {winner === "after"
                  ? "The after report has the stronger overall ATS score."
                  : winner === "before"
                    ? "The before report currently has the stronger score."
                    : "Both reports have the same overall score."}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-7">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
          <div>
            <label
              htmlFor="before-report"
              className="text-sm font-semibold text-slate-300"
            >
              Before report
            </label>

            <div className="relative mt-2">
              <select
                id="before-report"
                value={beforeReportId}
                onChange={(event) =>
                  setBeforeReportId(
                    event.target.value
                  )
                }
                className="h-14 w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-4 pr-10 text-sm text-white outline-none transition focus:border-blue-500"
              >
                {reports.map(
                  (item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      disabled={
                        item.id ===
                        afterReportId
                      }
                    >
                      {item.title} —{" "}
                      {
                        item.result
                          .overallScore
                      }
                      /100
                    </option>
                  )
                )}
              </select>

              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSwapReports}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 text-sm font-bold text-violet-300 transition hover:bg-violet-500/20"
          >
            <GitCompareArrows
              aria-hidden
              className="h-4 w-4"
            />

            Swap
          </button>

          <div>
            <label
              htmlFor="after-report"
              className="text-sm font-semibold text-slate-300"
            >
              After report
            </label>

            <div className="relative mt-2">
              <select
                id="after-report"
                value={afterReportId}
                onChange={(event) =>
                  setAfterReportId(
                    event.target.value
                  )
                }
                className="h-14 w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-4 pr-10 text-sm text-white outline-none transition focus:border-blue-500"
              >
                {reports.map(
                  (item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      disabled={
                        item.id ===
                        beforeReportId
                      }
                    >
                      {item.title} —{" "}
                      {
                        item.result
                          .overallScore
                      }
                      /100
                    </option>
                  )
                )}
              </select>

              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>
        </div>
      </section>

      {beforeReport &&
        afterReport &&
        comparison && (
          <>
            <section className="grid gap-5 lg:grid-cols-2">
              <article
                className={`rounded-3xl border p-6 ${beforeStyle.border} ${beforeStyle.background}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                      Before
                    </p>

                    <h2 className="mt-2 line-clamp-2 text-xl font-bold text-white">
                      {beforeReport.title}
                    </h2>

                    <p className="mt-2 text-xs text-slate-500">
                      {formatDate(
                        getItemDate(
                          beforeReport
                        )
                      )}
                    </p>
                  </div>

                  {winner ===
                    "before" && (
                    <Award
                      aria-hidden
                      className="h-7 w-7 shrink-0 text-emerald-300"
                    />
                  )}
                </div>

                <div className="mt-6 flex items-end gap-3">
                  <p className="text-5xl font-bold text-white">
                    {
                      comparison.beforeScore
                    }
                  </p>

                  <span className="pb-1 text-sm text-slate-500">
                    /100
                  </span>
                </div>

                <p
                  className={`mt-3 font-semibold ${beforeStyle.text}`}
                >
                  {getScoreLabel(
                    comparison.beforeScore
                  )}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    handleExport(
                      beforeReport
                    )
                  }
                  disabled={
                    exportingId ===
                    beforeReport.id
                  }
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-bold text-slate-300 transition hover:border-emerald-500 hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download
                    aria-hidden
                    className="h-4 w-4"
                  />

                  {exportingId ===
                  beforeReport.id
                    ? "Creating PDF..."
                    : "Export Before Report"}
                </button>
              </article>

              <article
                className={`rounded-3xl border p-6 ${afterStyle.border} ${afterStyle.background}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                      After
                    </p>

                    <h2 className="mt-2 line-clamp-2 text-xl font-bold text-white">
                      {afterReport.title}
                    </h2>

                    <p className="mt-2 text-xs text-slate-500">
                      {formatDate(
                        getItemDate(
                          afterReport
                        )
                      )}
                    </p>
                  </div>

                  {winner ===
                    "after" && (
                    <Award
                      aria-hidden
                      className="h-7 w-7 shrink-0 text-emerald-300"
                    />
                  )}
                </div>

                <div className="mt-6 flex items-end gap-3">
                  <p className="text-5xl font-bold text-white">
                    {
                      comparison.afterScore
                    }
                  </p>

                  <span className="pb-1 text-sm text-slate-500">
                    /100
                  </span>
                </div>

                <p
                  className={`mt-3 font-semibold ${afterStyle.text}`}
                >
                  {getScoreLabel(
                    comparison.afterScore
                  )}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    handleExport(
                      afterReport
                    )
                  }
                  disabled={
                    exportingId ===
                    afterReport.id
                  }
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-300 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download
                    aria-hidden
                    className="h-4 w-4"
                  />

                  {exportingId ===
                  afterReport.id
                    ? "Creating PDF..."
                    : "Export After Report"}
                </button>
              </article>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-7">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
                  Score Comparison
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  Performance changes
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Positive values show
                  improvement in the after
                  report.
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {metrics.map(
                  (metric) => (
                    <MetricComparisonCard
                      key={
                        metric.label
                      }
                      metric={metric}
                    />
                  )
                )}
              </div>
            </section>

            <section className="grid gap-5 xl:grid-cols-2">
              <KeywordList
                title="New Matched Keywords"
                keywords={
                  comparison.matchedAdded
                }
                variant="positive"
                emptyText="No new matched keywords were added."
              />

              <KeywordList
                title="Resolved Missing Keywords"
                keywords={
                  comparison.missingResolved
                }
                variant="positive"
                emptyText="No missing keywords were resolved."
              />

              <KeywordList
                title="New Missing Keywords"
                keywords={
                  comparison.newMissing
                }
                variant="warning"
                emptyText="No new missing keywords were detected."
              />

              <KeywordList
                title="Matched Keywords Lost"
                keywords={
                  comparison.matchedRemoved
                }
                variant="negative"
                emptyText="No previously matched keywords were lost."
              />
            </section>

            <section className="grid gap-5 xl:grid-cols-2">
              <KeywordList
                title="Resume Sections Added"
                keywords={
                  comparison.sectionsAdded
                }
                variant="positive"
                emptyText="No additional resume sections were detected."
              />

              <KeywordList
                title="Missing Sections Resolved"
                keywords={
                  comparison
                    .missingSectionsResolved
                }
                variant="positive"
                emptyText="No missing resume sections were resolved."
              />
            </section>

            <section className="rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 via-slate-900 to-blue-500/10 p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-300">
                    Comparison Summary
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-white">
                    {winner === "after"
                      ? "The after resume is stronger"
                      : winner ===
                          "before"
                        ? "The before resume currently performs better"
                        : "Both resumes have equal overall scores"}
                  </h2>

                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                    {winner === "after"
                      ? `The after report improved by ${comparison.scoreDifference} points, added ${comparison.matchedAdded.length} matched keywords and resolved ${comparison.missingResolved.length} missing keywords.`
                      : winner ===
                          "before"
                        ? `The after report decreased by ${Math.abs(
                            comparison.scoreDifference
                          )} points. Review lost keywords, formatting changes and new missing requirements before using it.`
                        : "The overall score is unchanged. Review the individual metrics and keyword changes to determine which resume is better for the target role."}
                  </p>

                  <p className="mt-3 text-sm text-slate-500">
                    Recommendation count
                    change:{" "}
                    <span
                      className={
                        comparison.recommendationChange >
                        0
                          ? "font-semibold text-emerald-300"
                          : comparison.recommendationChange <
                              0
                            ? "font-semibold text-amber-300"
                            : "font-semibold text-slate-300"
                      }
                    >
                      {comparison.recommendationChange >
                      0
                        ? `${comparison.recommendationChange} fewer recommendations`
                        : comparison.recommendationChange <
                            0
                          ? `${Math.abs(
                              comparison.recommendationChange
                            )} more recommendations`
                          : "No change"}
                    </span>
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

                    Improve a Bullet
                  </Link>
                </div>
              </div>
            </section>
          </>
        )}
    </div>
  );
}