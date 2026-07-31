"use client";

import Link from "next/link";
import {
  Award,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Download,
  Eye,
  FileSearch,
  FileText,
  Search,
  Sparkles,
  Trash2,
  X,
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
  deleteAtsAnalysisHistory,
  getAtsAnalysisHistory,
  type AtsAnalysisHistoryItem,
} from "@/lib/ats/analysisHistory";

type SortOption =
  | "newest"
  | "oldest"
  | "highest"
  | "lowest"
  | "title";

type ScoreFilter =
  | "all"
  | "strong"
  | "good"
  | "improving"
  | "low";

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

function formatReportDate(
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

function getItemDate(
  item: AtsAnalysisHistoryItem
): string {
  return (
    item.updatedAt ||
    item.createdAt
  );
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

function matchesScoreFilter(
  score: number,
  filter: ScoreFilter
): boolean {
  if (filter === "all") {
    return true;
  }

  if (filter === "strong") {
    return score >= 80;
  }

  if (filter === "good") {
    return score >= 60 && score < 80;
  }

  if (filter === "improving") {
    return score >= 40 && score < 60;
  }

  return score < 40;
}

function createPreviewText(
  value: string,
  maximumLength = 220
): string {
  const cleanValue = value
    .replace(/\s+/g, " ")
    .trim();

  if (cleanValue.length <= maximumLength) {
    return cleanValue;
  }

  return `${cleanValue.slice(
    0,
    maximumLength
  )}...`;
}

function getMissingKeywordPreview(
  keywords: string[]
): string {
  if (keywords.length === 0) {
    return "No important missing keywords";
  }

  const visible =
    keywords.slice(0, 4);

  const remaining =
    keywords.length - visible.length;

  return remaining > 0
    ? `${visible.join(", ")} +${remaining}`
    : visible.join(", ");
}

function EmptyReports() {
  return (
    <section className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center sm:p-12">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
        <FileText
          aria-hidden
          className="h-8 w-8"
        />
      </span>

      <h2 className="mt-5 text-2xl font-bold text-white">
        No saved ATS reports yet
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-400">
        Complete an ATS resume analysis to
        create a saved report. You can then
        review, search, preview, delete and
        export it as a professional PDF.
      </p>

      <Link
        href="/ats-resume-checker"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
      >
        <FileSearch
          aria-hidden
          className="h-4 w-4"
        />

        Start ATS Analysis
      </Link>
    </section>
  );
}

export default function ReportsPage() {
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
    searchText,
    setSearchText,
  ] = useState("");

  const [
    sortOption,
    setSortOption,
  ] = useState<SortOption>(
    "newest"
  );

  const [
    scoreFilter,
    setScoreFilter,
  ] = useState<ScoreFilter>(
    "all"
  );

  const [
    previewItem,
    setPreviewItem,
  ] = useState<
    AtsAnalysisHistoryItem | null
  >(null);

  const [
    exportingId,
    setExportingId,
  ] = useState<string | null>(
    null
  );

  useEffect(() => {
    try {
      setReports(
        getAtsAnalysisHistory()
      );
    } catch (error) {
      console.error(
        "Unable to load ATS reports:",
        error
      );

      toast.error(
        "Unable to load saved reports."
      );
    } finally {
      setReportsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!previewItem) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setPreviewItem(null);
      }
    }

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [previewItem]);

  const bestReport =
    useMemo(
      () =>
        reports.reduce<
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
      [reports]
    );

  const averageScore =
    useMemo(() => {
      if (reports.length === 0) {
        return 0;
      }

      const total =
        reports.reduce(
          (sum, item) =>
            sum +
            clampScore(
              item.result
                .overallScore
            ),
          0
        );

      return Math.round(
        total / reports.length
      );
    }, [reports]);

  const filteredReports =
    useMemo(() => {
      const query =
        searchText
          .trim()
          .toLowerCase();

      const filtered =
        reports.filter((item) => {
          const score =
            clampScore(
              item.result
                .overallScore
            );

          if (
            !matchesScoreFilter(
              score,
              scoreFilter
            )
          ) {
            return false;
          }

          if (!query) {
            return true;
          }

          const searchableText = [
            item.title,
            item.resumeText,
            item.jobDescription,
            ...item.result
              .matchedKeywords,
            ...item.result
              .missingKeywords,
            ...item.result
              .recommendations,
          ]
            .join(" ")
            .toLowerCase();

          return searchableText.includes(
            query
          );
        });

      return [...filtered].sort(
        (first, second) => {
          if (
            sortOption === "highest"
          ) {
            return (
              second.result
                .overallScore -
              first.result
                .overallScore
            );
          }

          if (
            sortOption === "lowest"
          ) {
            return (
              first.result
                .overallScore -
              second.result
                .overallScore
            );
          }

          if (
            sortOption === "title"
          ) {
            return first.title.localeCompare(
              second.title
            );
          }

          const firstTime =
            new Date(
              getItemDate(first)
            ).getTime();

          const secondTime =
            new Date(
              getItemDate(second)
            ).getTime();

          return sortOption ===
            "newest"
            ? secondTime - firstTime
            : firstTime - secondTime;
        }
      );
    }, [
      reports,
      searchText,
      scoreFilter,
      sortOption,
    ]);

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
        "Report PDF export error:",
        error
      );

      toast.error(
        "Unable to export the PDF report."
      );
    } finally {
      setExportingId(null);
    }
  }

  function handleDelete(
    item: AtsAnalysisHistoryItem
  ) {
    const confirmed =
      window.confirm(
        `Delete "${item.title}"? This action cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    const nextReports =
      deleteAtsAnalysisHistory(
        item.id
      );

    setReports(nextReports);

    if (
      previewItem?.id === item.id
    ) {
      setPreviewItem(null);
    }

    toast.success(
      "ATS report deleted."
    );
  }

  function handleResetFilters() {
    setSearchText("");
    setScoreFilter("all");
    setSortOption("newest");
  }

  if (!reportsLoaded) {
    return (
      <div className="space-y-6">
        <div className="h-44 animate-pulse rounded-3xl bg-slate-900" />

        <div className="h-24 animate-pulse rounded-2xl bg-slate-900" />

        <div className="grid gap-5 xl:grid-cols-2">
          {[1, 2, 3, 4].map(
            (item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-3xl bg-slate-900"
              />
            )
          )}
        </div>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="space-y-8">
        <section className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/50 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
            Reports Center
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            ATS analysis reports
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
            Review, organize and export
            professional ATS reports from
            your saved resume analyses.
          </p>
        </section>

        <EmptyReports />
      </div>
    );
  }

  const bestScore =
    bestReport
      ? clampScore(
          bestReport.result
            .overallScore
        )
      : 0;

  return (
    <>
      <div className="space-y-8">
        <section className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/50 p-6 shadow-xl shadow-black/20 sm:p-8">
          <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Reports Center
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Manage your ATS analysis
                reports
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                Search saved resume
                analyses, filter by score,
                preview details, remove old
                reports and export
                professional PDF files.
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
                  href="/dashboard/analytics"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/70 px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-blue-500 hover:text-white"
                >
                  View Analytics
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[480px]">
              <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Total Reports
                </p>

                <p className="mt-3 text-3xl font-bold text-white">
                  {reports.length}
                </p>
              </div>

              <div className="rounded-2xl border border-blue-500/25 bg-blue-500/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-300">
                  Average Score
                </p>

                <p className="mt-3 text-3xl font-bold text-white">
                  {averageScore}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
                  Best Score
                </p>

                <p className="mt-3 text-3xl font-bold text-white">
                  {bestScore}
                </p>
              </div>
            </div>
          </div>
        </section>

        {bestReport && (
          <section className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-900 p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="flex min-w-0 items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                  <Award
                    aria-hidden
                    className="h-6 w-6"
                  />
                </span>

                <div className="min-w-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-300">
                    Best Saved Report
                  </p>

                  <h3 className="mt-2 truncate text-xl font-bold text-white">
                    {bestReport.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    {bestScore}/100 ·{" "}
                    {getScoreLabel(
                      bestScore
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    setPreviewItem(
                      bestReport
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-blue-500 hover:text-white"
                >
                  <Eye
                    aria-hidden
                    className="h-4 w-4"
                  />

                  Preview
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleExport(
                      bestReport
                    )
                  }
                  disabled={
                    exportingId ===
                    bestReport.id
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download
                    aria-hidden
                    className="h-4 w-4"
                  />

                  {exportingId ===
                  bestReport.id
                    ? "Creating PDF..."
                    : "Export Best Report"}
                </button>
              </div>
            </div>
          </section>
        )}

        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-7">
          <div className="grid gap-4 lg:grid-cols-[1fr_210px_210px]">
            <div className="relative">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              />

              <input
                type="search"
                value={searchText}
                onChange={(event) =>
                  setSearchText(
                    event.target.value
                  )
                }
                placeholder="Search reports, keywords, resumes or job descriptions..."
                className="h-12 w-full rounded-xl border border-slate-700 bg-slate-950 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="relative">
              <select
                value={scoreFilter}
                onChange={(event) =>
                  setScoreFilter(
                    event.target
                      .value as ScoreFilter
                  )
                }
                className="h-12 w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-4 pr-10 text-sm text-white outline-none transition focus:border-blue-500"
              >
                <option value="all">
                  All Scores
                </option>

                <option value="strong">
                  Strong Match — 80+
                </option>

                <option value="good">
                  Good — 60–79
                </option>

                <option value="improving">
                  Improving — 40–59
                </option>

                <option value="low">
                  Low — Below 40
                </option>
              </select>

              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              />
            </div>

            <div className="relative">
              <select
                value={sortOption}
                onChange={(event) =>
                  setSortOption(
                    event.target
                      .value as SortOption
                  )
                }
                className="h-12 w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-4 pr-10 text-sm text-white outline-none transition focus:border-blue-500"
              >
                <option value="newest">
                  Newest First
                </option>

                <option value="oldest">
                  Oldest First
                </option>

                <option value="highest">
                  Highest Score
                </option>

                <option value="lowest">
                  Lowest Score
                </option>

                <option value="title">
                  Title A–Z
                </option>
              </select>

              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-300">
                {filteredReports.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-300">
                {reports.length}
              </span>{" "}
              reports
            </p>

            {(searchText ||
              scoreFilter !== "all" ||
              sortOption !==
                "newest") && (
              <button
                type="button"
                onClick={
                  handleResetFilters
                }
                className="text-sm font-semibold text-blue-300 transition hover:text-blue-200"
              >
                Reset Filters
              </button>
            )}
          </div>
        </section>

        {filteredReports.length ===
        0 ? (
          <section className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 p-10 text-center">
            <Search
              aria-hidden
              className="mx-auto h-9 w-9 text-slate-600"
            />

            <h2 className="mt-4 text-xl font-bold text-white">
              No matching reports
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try a different search term
              or score filter.
            </p>

            <button
              type="button"
              onClick={
                handleResetFilters
              }
              className="mt-5 rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              Reset Filters
            </button>
          </section>
        ) : (
          <section className="grid gap-5 xl:grid-cols-2">
            {filteredReports.map(
              (item) => {
                const score =
                  clampScore(
                    item.result
                      .overallScore
                  );

                const style =
                  getScoreClasses(
                    score
                  );

                const isExporting =
                  exportingId === item.id;

                return (
                  <article
                    key={item.id}
                    className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-black/10 transition hover:border-slate-700 sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-bold ${style.border} ${style.background} ${style.text}`}
                          >
                            {score}/100 ·{" "}
                            {getScoreLabel(
                              score
                            )}
                          </span>

                          {bestReport?.id ===
                            item.id && (
                            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
                              Best Report
                            </span>
                          )}
                        </div>

                        <h2 className="mt-4 line-clamp-2 text-xl font-bold leading-7 text-white">
                          {item.title}
                        </h2>

                        <p className="mt-3 inline-flex items-center gap-2 text-xs text-slate-500">
                          <CalendarDays
                            aria-hidden
                            className="h-3.5 w-3.5"
                          />

                          {formatReportDate(
                            getItemDate(
                              item
                            )
                          )}
                        </p>
                      </div>

                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${style.border} ${style.background} ${style.text}`}
                      >
                        <FileText
                          aria-hidden
                          className="h-6 w-6"
                        />
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        {
                          label:
                            "Keywords",
                          value:
                            item.result
                              .keywordScore,
                        },
                        {
                          label:
                            "Structure",
                          value:
                            item.result
                              .structureScore,
                        },
                        {
                          label:
                            "Formatting",
                          value:
                            item.result
                              .formattingScore,
                        },
                        {
                          label:
                            "Readability",
                          value:
                            item.result
                              .readabilityScore,
                        },
                      ].map(
                        (metric) => (
                          <div
                            key={
                              metric.label
                            }
                            className="rounded-xl border border-slate-800 bg-slate-950 p-3"
                          >
                            <p className="text-xs text-slate-500">
                              {
                                metric.label
                              }
                            </p>

                            <p className="mt-1 text-lg font-bold text-white">
                              {
                                metric.value
                              }
                            </p>
                          </div>
                        )
                      )}
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
                          Matched Keywords
                        </p>

                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-300">
                          {item.result
                            .matchedKeywords
                            .slice(0, 5)
                            .join(", ") ||
                            "No matched keywords"}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">
                          Missing Keywords
                        </p>

                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-300">
                          {getMissingKeywordPreview(
                            item.result
                              .missingKeywords
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Target Job Preview
                      </p>

                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
                        {createPreviewText(
                          item.jobDescription
                        )}
                      </p>
                    </div>

                    <div className="mt-auto grid grid-cols-2 gap-3 pt-5 sm:grid-cols-3">
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewItem(
                            item
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-bold text-slate-300 transition hover:border-blue-500 hover:text-white"
                      >
                        <Eye
                          aria-hidden
                          className="h-4 w-4"
                        />

                        Preview
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleExport(
                            item
                          )
                        }
                        disabled={
                          isExporting
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-300 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Download
                          aria-hidden
                          className="h-4 w-4"
                        />

                        {isExporting
                          ? "Creating..."
                          : "Export PDF"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            item
                          )
                        }
                        disabled={
                          isExporting
                        }
                        className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-1"
                      >
                        <Trash2
                          aria-hidden
                          className="h-4 w-4"
                        />

                        Delete
                      </button>
                    </div>
                  </article>
                );
              }
            )}
          </section>
        )}

        <section className="rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 via-slate-900 to-blue-500/10 p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-300">
                Continue Improving
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Create a stronger resume
                report
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                Analyze another resume
                version, resolve missing
                keywords and compare the
                new score with your saved
                reports.
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

                Analyze Resume
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

      {previewItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-preview-title"
        >
          <button
            type="button"
            onClick={() =>
              setPreviewItem(null)
            }
            aria-label="Close report preview"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          <article className="relative z-10 max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/60">
            <header className="sticky top-0 z-10 flex items-start justify-between gap-5 border-b border-slate-800 bg-slate-900/95 p-5 backdrop-blur-xl sm:p-6">
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-400">
                  ATS Report Preview
                </p>

                <h2
                  id="report-preview-title"
                  className="mt-2 break-words text-2xl font-bold text-white"
                >
                  {previewItem.title}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {formatReportDate(
                    getItemDate(
                      previewItem
                    )
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setPreviewItem(null)
                }
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 text-slate-400 transition hover:border-red-500 hover:text-red-300"
                aria-label="Close preview"
              >
                <X
                  aria-hidden
                  className="h-5 w-5"
                />
              </button>
            </header>

            <div className="space-y-6 p-5 sm:p-7">
              <section className="grid gap-4 sm:grid-cols-[220px_1fr]">
                <div className="rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-300">
                    Overall ATS Score
                  </p>

                  <p className="mt-4 text-6xl font-bold text-white">
                    {clampScore(
                      previewItem.result
                        .overallScore
                    )}
                  </p>

                  <p className="mt-3 font-semibold text-blue-300">
                    {getScoreLabel(
                      clampScore(
                        previewItem.result
                          .overallScore
                      )
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    {
                      label:
                        "Keywords",
                      value:
                        previewItem.result
                          .keywordScore,
                    },
                    {
                      label:
                        "Structure",
                      value:
                        previewItem.result
                          .structureScore,
                    },
                    {
                      label:
                        "Achievements",
                      value:
                        previewItem.result
                          .achievementScore,
                    },
                    {
                      label:
                        "Formatting",
                      value:
                        previewItem.result
                          .formattingScore,
                    },
                    {
                      label:
                        "Readability",
                      value:
                        previewItem.result
                          .readabilityScore,
                    },
                    {
                      label:
                        "Experience",
                      value:
                        previewItem.result
                          .experienceScore,
                    },
                    {
                      label:
                        "Bullets",
                      value:
                        previewItem.result
                          .bulletScore,
                    },
                    {
                      label:
                        "Skills",
                      value:
                        previewItem.result
                          .skillsScore,
                    },
                  ].map(
                    (metric) => (
                      <div
                        key={
                          metric.label
                        }
                        className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                      >
                        <p className="text-xs text-slate-500">
                          {
                            metric.label
                          }
                        </p>

                        <p className="mt-2 text-2xl font-bold text-white">
                          {
                            metric.value
                          }
                        </p>
                      </div>
                    )
                  )}
                </div>
              </section>

              <section className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5">
                  <h3 className="font-bold text-emerald-300">
                    Matched Keywords
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {previewItem.result
                      .matchedKeywords
                      .length === 0 ? (
                      <p className="text-sm text-slate-500">
                        No matched keywords.
                      </p>
                    ) : (
                      previewItem.result.matchedKeywords.map(
                        (keyword) => (
                          <span
                            key={
                              keyword
                            }
                            className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200"
                          >
                            <CheckCircle2 className="mr-1 inline h-3.5 w-3.5" />
                            {keyword}
                          </span>
                        )
                      )
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5">
                  <h3 className="font-bold text-amber-300">
                    Missing Keywords
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {previewItem.result
                      .missingKeywords
                      .length === 0 ? (
                      <p className="text-sm text-emerald-300">
                        No important
                        keywords missing.
                      </p>
                    ) : (
                      previewItem.result.missingKeywords.map(
                        (keyword) => (
                          <span
                            key={
                              keyword
                            }
                            className="rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-sm text-amber-200"
                          >
                            {keyword}
                          </span>
                        )
                      )
                    )}
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <h3 className="text-lg font-bold text-white">
                  Recommended
                  Improvements
                </h3>

                <ol className="mt-4 space-y-3">
                  {previewItem.result
                    .recommendations
                    .length === 0 ? (
                    <li className="text-sm text-slate-500">
                      No recommendations
                      available.
                    </li>
                  ) : (
                    previewItem.result.recommendations.map(
                      (
                        recommendation,
                        index
                      ) => (
                        <li
                          key={`${index}-${recommendation}`}
                          className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-300">
                            {index + 1}
                          </span>

                          <p className="text-sm leading-6 text-slate-300">
                            {
                              recommendation
                            }
                          </p>
                        </li>
                      )
                    )
                  )}
                </ol>
              </section>

              <section className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <h3 className="font-bold text-white">
                    Resume Content
                  </h3>

                  <pre className="mt-4 max-h-80 overflow-y-auto whitespace-pre-wrap break-words font-sans text-sm leading-6 text-slate-400">
                    {
                      previewItem.resumeText
                    }
                  </pre>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <h3 className="font-bold text-white">
                    Target Job
                    Description
                  </h3>

                  <pre className="mt-4 max-h-80 overflow-y-auto whitespace-pre-wrap break-words font-sans text-sm leading-6 text-slate-400">
                    {
                      previewItem.jobDescription
                    }
                  </pre>
                </div>
              </section>

              <div className="flex flex-col justify-end gap-3 border-t border-slate-800 pt-6 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    setPreviewItem(null)
                  }
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-slate-500 hover:text-white"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleExport(
                      previewItem
                    )
                  }
                  disabled={
                    exportingId ===
                    previewItem.id
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download
                    aria-hidden
                    className="h-4 w-4"
                  />

                  {exportingId ===
                  previewItem.id
                    ? "Creating PDF..."
                    : "Download PDF Report"}
                </button>
              </div>
            </div>
          </article>
        </div>
      )}
    </>
  );
}