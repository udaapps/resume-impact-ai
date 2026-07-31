"use client";

import {
  AlertTriangle,
  ArrowRight,
  Brain,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  ClipboardCheck,
  FileText,
  Loader2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

type AtsCoachResultInput = {
  overallScore?: number;
  keywordScore?: number;
  skillsScore?: number;
  experienceScore?: number;
  structureScore?: number;
  bulletScore?: number;
  achievementScore?: number;
  formattingScore?: number;
  readabilityScore?: number;

  matchedKeywords?: string[];
  missingKeywords?: string[];

  foundSections?: string[];
  missingSections?: string[];
  requiredMissingSections?: string[];

  recommendations?: string[];

  formattingIssues?: Array<{
    title?: string;
    description?: string;
    severity?: string;
  }>;

  achievementCount?: number;
  achievementMetrics?: number;
  achievementActionVerbs?: number;

  wordCount?: number;
  bulletCount?: number;
  weakPhraseCount?: number;
  longSentenceCount?: number;
  longParagraphCount?: number;

  hasEmail?: boolean;
  hasPhone?: boolean;
  hasLinkedIn?: boolean;
};

type ReadinessLevel =
  | "strong"
  | "good"
  | "developing"
  | "not-ready";

type ImpactLevel =
  | "high"
  | "medium"
  | "low";

type KeywordStatus =
  | "use-if-true"
  | "already-present"
  | "not-recommended";

type SectionStatus =
  | "missing"
  | "weak"
  | "present";

type AtsCoachResponse = {
  source: "ai" | "local";

  readiness: {
    level: ReadinessLevel;
    score: number;
    message: string;
  };

  executiveSummary: string;

  biggestBlockers: string[];

  priorities: Array<{
    rank: number;
    title: string;
    reason: string;
    action: string;
    expectedImpact: ImpactLevel;
    relatedScore: string;
  }>;

  keywordPlan: Array<{
    keyword: string;
    status: KeywordStatus;
    placement: string;
    guidance: string;
  }>;

  bulletPlan: Array<{
    originalIdea: string;
    problem: string;
    improvementDirection: string;
    exampleFramework: string;
  }>;

  sectionPlan: Array<{
    section: string;
    status: SectionStatus;
    action: string;
  }>;

  sevenDayPlan: Array<{
    day: number;
    title: string;
    task: string;
  }>;

  finalChecklist: string[];

  safetyNotice: string;
};

type AiResumeCoachProps = {
  resumeText: string;
  jobDescription: string;
  result: AtsCoachResultInput | null;
};

type ExpandableSection =
  | "keywords"
  | "bullets"
  | "sections"
  | "seven-day"
  | "checklist";

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

function getReadinessContent(
  level: ReadinessLevel
) {
  if (level === "strong") {
    return {
      label: "Strong",
      text: "text-emerald-300",
      border:
        "border-emerald-500/30",
      background:
        "bg-emerald-500/10",
      progress:
        "bg-emerald-500",
    };
  }

  if (level === "good") {
    return {
      label: "Good",
      text: "text-blue-300",
      border:
        "border-blue-500/30",
      background:
        "bg-blue-500/10",
      progress:
        "bg-blue-500",
    };
  }

  if (level === "developing") {
    return {
      label: "Developing",
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
    label: "Not Ready",
    text: "text-red-300",
    border:
      "border-red-500/30",
    background:
      "bg-red-500/10",
    progress:
      "bg-red-500",
  };
}

function getImpactClasses(
  impact: ImpactLevel
) {
  if (impact === "high") {
    return {
      label: "High impact",
      text: "text-red-300",
      border:
        "border-red-500/30",
      background:
        "bg-red-500/10",
    };
  }

  if (impact === "medium") {
    return {
      label: "Medium impact",
      text: "text-amber-300",
      border:
        "border-amber-500/30",
      background:
        "bg-amber-500/10",
    };
  }

  return {
    label: "Low impact",
    text: "text-slate-300",
    border:
      "border-slate-700",
    background:
      "bg-slate-800/70",
  };
}

function getKeywordStatusContent(
  status: KeywordStatus
) {
  if (status === "already-present") {
    return {
      label: "Already present",
      text: "text-emerald-300",
      border:
        "border-emerald-500/30",
      background:
        "bg-emerald-500/10",
      icon: CheckCircle2,
    };
  }

  if (status === "not-recommended") {
    return {
      label: "Not recommended",
      text: "text-red-300",
      border:
        "border-red-500/30",
      background:
        "bg-red-500/10",
      icon: AlertTriangle,
    };
  }

  return {
    label: "Use only if true",
    text: "text-amber-300",
    border:
      "border-amber-500/30",
    background:
      "bg-amber-500/10",
    icon: ShieldCheck,
  };
}

function getSectionStatusContent(
  status: SectionStatus
) {
  if (status === "present") {
    return {
      label: "Present",
      text: "text-emerald-300",
      border:
        "border-emerald-500/30",
      background:
        "bg-emerald-500/10",
    };
  }

  if (status === "weak") {
    return {
      label: "Needs improvement",
      text: "text-amber-300",
      border:
        "border-amber-500/30",
      background:
        "bg-amber-500/10",
    };
  }

  return {
    label: "Missing",
    text: "text-red-300",
    border:
      "border-red-500/30",
    background:
      "bg-red-500/10",
  };
}

function ExpandButton({
  expanded,
  onClick,
  label,
}: {
  expanded: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
      aria-expanded={expanded}
    >
      {expanded
        ? `Hide ${label}`
        : `Show ${label}`}

      {expanded ? (
        <ChevronUp
          aria-hidden
          className="h-4 w-4"
        />
      ) : (
        <ChevronDown
          aria-hidden
          className="h-4 w-4"
        />
      )}
    </button>
  );
}

export default function AiResumeCoach({
  resumeText,
  jobDescription,
  result,
}: AiResumeCoachProps) {
  const [
    coach,
    setCoach,
  ] = useState<AtsCoachResponse | null>(
    null
  );

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const [
    expandedSections,
    setExpandedSections,
  ] = useState<
    Record<ExpandableSection, boolean>
  >({
    keywords: true,
    bullets: false,
    sections: false,
    "seven-day": false,
    checklist: false,
  });

  const canGenerate =
    resumeText.trim().length >= 100 &&
    jobDescription.trim().length >= 100 &&
    Boolean(result);

  const readinessStyle =
    useMemo(
      () =>
        coach
          ? getReadinessContent(
              coach.readiness.level
            )
          : null,
      [coach]
    );

  function toggleSection(
    section: ExpandableSection
  ) {
    setExpandedSections(
      (current) => ({
        ...current,
        [section]:
          !current[section],
      })
    );
  }

  async function handleGenerateCoach() {
    if (!result) {
      toast.error(
        "Run the ATS analysis first."
      );

      return;
    }

    if (
      resumeText.trim().length < 100 ||
      jobDescription.trim().length <
        100
    ) {
      toast.error(
        "Resume and job description must each contain at least 100 characters."
      );

      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/ats-coach",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            resumeText:
              resumeText.trim(),
            jobDescription:
              jobDescription.trim(),
            result,
          }),
        }
      );

      const data =
        (await response.json()) as
          | AtsCoachResponse
          | {
              error?: string;
            };

      if (!response.ok) {
        throw new Error(
          "error" in data
            ? data.error ||
                "Unable to generate the coaching plan."
            : "Unable to generate the coaching plan."
        );
      }

      if (
        !("readiness" in data) ||
        !("priorities" in data)
      ) {
        throw new Error(
          "The coaching response was incomplete."
        );
      }

      setCoach(data);

      toast.success(
        data.source === "ai"
          ? "AI coaching plan generated."
          : "Coaching plan generated with local analysis."
      );
    } catch (error) {
      console.error(
        "AI Resume Coach error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to generate the coaching plan."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      id="ai-resume-coach"
      aria-labelledby="ai-resume-coach-title"
      className="overflow-hidden rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 via-slate-900 to-blue-500/10 shadow-xl shadow-black/20"
    >
      <div className="border-b border-slate-800 p-5 sm:p-7">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">
                AI Resume Coach
              </p>

              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-200">
                Personalized guidance
              </span>
            </div>

            <h2
              id="ai-resume-coach-title"
              className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Turn your ATS result into a
              practical improvement plan
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
              Review your highest-impact
              blockers, truthful keyword
              opportunities, resume section
              improvements, bullet-writing
              guidance, and a seven-day action
              plan.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleGenerateCoach}
              disabled={
                !canGenerate ||
                isLoading
              }
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2
                    aria-hidden
                    className="h-4 w-4 animate-spin"
                  />

                  Building Plan...
                </>
              ) : coach ? (
                <>
                  <RefreshCw
                    aria-hidden
                    className="h-4 w-4"
                  />

                  Regenerate Plan
                </>
              ) : (
                <>
                  <Brain
                    aria-hidden
                    className="h-4 w-4"
                  />

                  Generate Coaching Plan
                </>
              )}
            </button>
          </div>
        </div>

        {!canGenerate && (
          <div className="mt-5 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle
                aria-hidden
                className="mt-0.5 h-5 w-5 shrink-0 text-amber-300"
              />

              <p className="text-sm leading-6 text-amber-100">
                Complete the ATS resume
                analysis first. The coach
                requires the resume, target job
                description, and current score
                breakdown.
              </p>
            </div>
          </div>
        )}
      </div>

      {!coach ? (
        <div className="p-5 sm:p-7">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: Target,
                title:
                  "Priority action plan",
                text:
                  "Fix the highest-impact blockers first.",
              },
              {
                icon: Sparkles,
                title:
                  "Keyword guidance",
                text:
                  "Place relevant terms naturally and truthfully.",
              },
              {
                icon: FileText,
                title:
                  "Bullet improvements",
                text:
                  "Turn weak duties into clearer achievement statements.",
              },
              {
                icon: ClipboardCheck,
                title:
                  "Seven-day roadmap",
                text:
                  "Follow a simple plan before submitting the resume.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-300">
                    <Icon
                      aria-hidden
                      className="h-5 w-5"
                    />
                  </span>

                  <h3 className="mt-4 font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-6 p-5 sm:p-7">
          <section className="grid gap-5 xl:grid-cols-[300px_1fr]">
            <article
              className={`rounded-3xl border p-6 ${readinessStyle?.border} ${readinessStyle?.background}`}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Application Readiness
                </p>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-bold ${readinessStyle?.border} ${readinessStyle?.background} ${readinessStyle?.text}`}
                >
                  {readinessStyle?.label}
                </span>
              </div>

              <div className="mt-5 flex items-end gap-2">
                <p className="text-5xl font-bold text-white">
                  {clampScore(
                    coach.readiness.score
                  )}
                </p>

                <span className="pb-1 text-sm text-slate-500">
                  /100
                </span>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full ${readinessStyle?.progress}`}
                  style={{
                    width: `${clampScore(
                      coach.readiness.score
                    )}%`,
                  }}
                />
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-300">
                {coach.readiness.message}
              </p>

              <div className="mt-5 border-t border-slate-800 pt-4">
                <span
                  className={
                    coach.source === "ai"
                      ? "inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-bold text-violet-200"
                      : "inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-bold text-blue-200"
                  }
                >
                  {coach.source === "ai" ? (
                    <Sparkles
                      aria-hidden
                      className="h-3.5 w-3.5"
                    />
                  ) : (
                    <ShieldCheck
                      aria-hidden
                      className="h-3.5 w-3.5"
                    />
                  )}

                  {coach.source === "ai"
                    ? "AI generated"
                    : "Local fallback"}
                </span>
              </div>
            </article>

            <article className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-400">
                Coach Summary
              </p>

              <h3 className="mt-3 text-2xl font-bold text-white">
                Your next improvement focus
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                {coach.executiveSummary}
              </p>

              <div className="mt-6">
                <p className="text-sm font-bold text-white">
                  Biggest blockers
                </p>

                {coach.biggestBlockers
                  .length === 0 ? (
                  <p className="mt-3 text-sm text-slate-500">
                    No major blockers were
                    identified.
                  </p>
                ) : (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {coach.biggestBlockers.map(
                      (blocker) => (
                        <span
                          key={blocker}
                          className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-sm text-amber-200"
                        >
                          {blocker}
                        </span>
                      )
                    )}
                  </div>
                )}
              </div>
            </article>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-7">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-400">
                Priority Actions
              </p>

              <h3 className="mt-2 text-2xl font-bold text-white">
                Fix these items first
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Actions are ranked by expected
                impact on relevance, ATS
                readability, and recruiter
                review.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {coach.priorities.map(
                (priority) => {
                  const impact =
                    getImpactClasses(
                      priority.expectedImpact
                    );

                  return (
                    <article
                      key={`${priority.rank}-${priority.title}`}
                      className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
                    >
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                        <div className="flex gap-4">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                            {priority.rank}
                          </span>

                          <div>
                            <h4 className="text-lg font-bold text-white">
                              {priority.title}
                            </h4>

                            <p className="mt-2 text-sm leading-6 text-slate-400">
                              {priority.reason}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`w-fit shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${impact.border} ${impact.background} ${impact.text}`}
                        >
                          {impact.label}
                        </span>
                      </div>

                      <div className="mt-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-300">
                          Recommended action
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {priority.action}
                        </p>
                      </div>

                      <p className="mt-4 text-xs text-slate-600">
                        Related metric:{" "}
                        <span className="font-semibold text-slate-400">
                          {priority.relatedScore}
                        </span>
                      </p>
                    </article>
                  );
                }
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-400">
                  Keyword Plan
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  Place keywords naturally
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Never add a keyword unless it
                  accurately represents your real
                  background.
                </p>
              </div>

              <ExpandButton
                expanded={
                  expandedSections.keywords
                }
                onClick={() =>
                  toggleSection(
                    "keywords"
                  )
                }
                label="keyword plan"
              />
            </div>

            {expandedSections.keywords && (
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {coach.keywordPlan.map(
                  (item) => {
                    const status =
                      getKeywordStatusContent(
                        item.status
                      );

                    const StatusIcon =
                      status.icon;

                    return (
                      <article
                        key={`${item.keyword}-${item.status}`}
                        className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h4 className="font-bold text-white">
                            {item.keyword}
                          </h4>

                          <span
                            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold ${status.border} ${status.background} ${status.text}`}
                          >
                            <StatusIcon
                              aria-hidden
                              className="h-3.5 w-3.5"
                            />

                            {status.label}
                          </span>
                        </div>

                        <div className="mt-4 space-y-3">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
                              Suggested placement
                            </p>

                            <p className="mt-1 text-sm leading-6 text-slate-300">
                              {item.placement}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
                              Guidance
                            </p>

                            <p className="mt-1 text-sm leading-6 text-slate-400">
                              {item.guidance}
                            </p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-400">
                  Bullet Improvement Plan
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  Strengthen weak experience
                  statements
                </h3>
              </div>

              <ExpandButton
                expanded={
                  expandedSections.bullets
                }
                onClick={() =>
                  toggleSection(
                    "bullets"
                  )
                }
                label="bullet plan"
              />
            </div>

            {expandedSections.bullets && (
              <div className="mt-6 space-y-4">
                {coach.bulletPlan.map(
                  (item, index) => (
                    <article
                      key={`${index}-${item.originalIdea}`}
                      className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
                    >
                      <div className="flex gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/10 font-bold text-violet-300">
                          {index + 1}
                        </span>

                        <div className="min-w-0">
                          <h4 className="font-bold text-white">
                            {item.originalIdea}
                          </h4>

                          <p className="mt-3 text-sm leading-6 text-red-200">
                            <span className="font-bold">
                              Problem:
                            </span>{" "}
                            {item.problem}
                          </p>

                          <p className="mt-3 text-sm leading-6 text-slate-300">
                            <span className="font-bold text-blue-300">
                              Direction:
                            </span>{" "}
                            {
                              item.improvementDirection
                            }
                          </p>

                          <div className="mt-4 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
                            <p className="text-xs font-bold uppercase tracking-[0.12em] text-violet-300">
                              Safe framework
                            </p>

                            <p className="mt-2 text-sm leading-6 text-slate-300">
                              {
                                item.exampleFramework
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                )}
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-400">
                  Resume Sections
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  Section improvement plan
                </h3>
              </div>

              <ExpandButton
                expanded={
                  expandedSections.sections
                }
                onClick={() =>
                  toggleSection(
                    "sections"
                  )
                }
                label="section plan"
              />
            </div>

            {expandedSections.sections && (
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {coach.sectionPlan.map(
                  (item) => {
                    const status =
                      getSectionStatusContent(
                        item.status
                      );

                    return (
                      <article
                        key={`${item.section}-${item.status}`}
                        className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h4 className="font-bold text-white">
                            {item.section}
                          </h4>

                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-bold ${status.border} ${status.background} ${status.text}`}
                          >
                            {status.label}
                          </span>
                        </div>

                        <p className="mt-4 text-sm leading-6 text-slate-400">
                          {item.action}
                        </p>
                      </article>
                    );
                  })}
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-400">
                  Seven-Day Plan
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  Improve your resume step by
                  step
                </h3>
              </div>

              <ExpandButton
                expanded={
                  expandedSections[
                    "seven-day"
                  ]
                }
                onClick={() =>
                  toggleSection(
                    "seven-day"
                  )
                }
                label="seven-day plan"
              />
            </div>

            {expandedSections[
              "seven-day"
            ] && (
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {coach.sevenDayPlan.map(
                  (item) => (
                    <article
                      key={`${item.day}-${item.title}`}
                      className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white">
                          {item.day}
                        </span>

                        <h4 className="font-bold text-white">
                          {item.title}
                        </h4>
                      </div>

                      <p className="mt-4 text-sm leading-6 text-slate-400">
                        {item.task}
                      </p>
                    </article>
                  )
                )}
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
                  Final Checklist
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  Review before applying
                </h3>
              </div>

              <ExpandButton
                expanded={
                  expandedSections.checklist
                }
                onClick={() =>
                  toggleSection(
                    "checklist"
                  )
                }
                label="checklist"
              />
            </div>

            {expandedSections.checklist && (
              <div className="mt-6 grid gap-3 lg:grid-cols-2">
                {coach.finalChecklist.map(
                  (item, index) => (
                    <div
                      key={`${index}-${item}`}
                      className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300">
                        <Check
                          aria-hidden
                          className="h-4 w-4"
                        />
                      </span>

                      <p className="text-sm leading-6 text-slate-300">
                        {item}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <ShieldCheck
                aria-hidden
                className="mt-0.5 h-6 w-6 shrink-0 text-amber-300"
              />

              <div>
                <h3 className="font-bold text-amber-100">
                  Accuracy notice
                </h3>

                <p className="mt-2 text-sm leading-7 text-amber-100/80">
                  {coach.safetyNotice}
                </p>
              </div>
            </div>
          </section>

          <div className="flex flex-col justify-between gap-4 rounded-3xl border border-blue-500/25 bg-blue-500/10 p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <p className="font-bold text-white">
                Ready to measure your
                improvement?
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Apply the recommended changes
                and run another ATS analysis.
              </p>
            </div>

            <a
              href="#ats-resume-checker-title"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
            >
              Analyze Again

              <ArrowRight
                aria-hidden
                className="h-4 w-4"
              />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}