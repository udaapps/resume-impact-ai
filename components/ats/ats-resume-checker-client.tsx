"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { toast } from "sonner";

import AtsBulletRewriter from "@/components/ats/ats-bullet-rewriter";
import AtsHistoryPanel from "@/components/ats/ats-history-panel";
import AiResumeCoach from "@/components/ats/ai-resume-coach";
import {
  exportAtsAnalysisPdf,
} from "@/lib/ats/exportAtsPdf";
import {
  getAtsAnalysisHistory,
  saveAtsAnalysisHistory,
  type AtsAnalysisHistoryItem,
  type AtsHistoryAnalysisResult,
} from "@/lib/ats/analysisHistory";
import {
  saveResumeAnalysis,
} from "@/lib/supabase/resume-analyses";

import type {
  ResumeAnalysisResult,
} from "@/lib/supabase/resume-analyses";

type ResumeSection = {
  key: string;
  label: string;
  found: boolean;
  required: boolean;
};

type KeywordItem = {
  keyword: string;
  category: string;
  weight: number;
};

type FormattingIssue = {
  id: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
};

type AnalysisResult = {
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

  formattingIssues: FormattingIssue[];

  matchedKeywords: string[];
  missingKeywords: string[];

  matchedItems: KeywordItem[];
  missingItems: KeywordItem[];

  sections: ResumeSection[];
  foundSections: string[];
  missingSections: string[];
  requiredMissingSections: string[];

  recommendations: string[];
};

const SAMPLE_RESUME = `UDARA HETTIARACHCHI
udara@example.com
+94 77 123 4567
linkedin.com/in/udara-hettiarachchi

PROFESSIONAL SUMMARY

Senior Software Engineer with six years of experience building scalable web applications, backend APIs, and database-driven systems.

TECHNICAL SKILLS

TypeScript, React, Node.js, PostgreSQL, Git, Agile

PROFESSIONAL EXPERIENCE

Senior Software Engineer

- Developed REST APIs that improved response time by 35%.
- Optimized PostgreSQL queries and reduced page load time by 40%.
- Led a team of 5 developers and delivered 12 projects.
- Automated deployment workflows and supported 100+ users.

EDUCATION

Bachelor of Science in Information Technology

PROJECTS

Built a resume optimization platform using Next.js and Supabase.`;

const SAMPLE_JOB_DESCRIPTION = `We are looking for a Senior Software Engineer with experience in React, TypeScript, Node.js, REST APIs, AWS, Docker, CI/CD, PostgreSQL, Git, cloud deployment, and Agile development.

The candidate should have at least five years of software development experience and be able to build scalable applications, optimize system performance, collaborate with cross-functional engineering teams, and deliver measurable business results.

A bachelor's degree in Computer Science, Information Technology, or a related field is preferred.`;

function getScoreStyle(score: number) {
  if (score >= 80) {
    return {
      label: "Strong Match",
      border: "border-emerald-500/40",
      background: "bg-emerald-500/10",
      text: "text-emerald-300",
      bar: "bg-emerald-500",
    };
  }

  if (score >= 60) {
    return {
      label: "Good Foundation",
      border: "border-blue-500/40",
      background: "bg-blue-500/10",
      text: "text-blue-300",
      bar: "bg-blue-500",
    };
  }

  if (score >= 40) {
    return {
      label: "Needs Improvement",
      border: "border-amber-500/40",
      background: "bg-amber-500/10",
      text: "text-amber-300",
      bar: "bg-amber-500",
    };
  }

  return {
    label: "Low Match",
    border: "border-red-500/40",
    background: "bg-red-500/10",
    text: "text-red-300",
    bar: "bg-red-500",
  };
}

function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    programming: "Programming",
    framework: "Framework",
    database: "Database",
    cloud: "Cloud",
    devops: "DevOps",
    methodology: "Methodology",
    "soft-skill": "Soft Skill",
    general: "General",
  };

  return labels[category] ?? category;
}

function getSeverityClasses(
  severity: FormattingIssue["severity"]
) {
  if (severity === "high") {
    return {
      badge:
        "border-red-500/40 bg-red-500/10 text-red-300",
      card: "border-red-500/25 bg-red-500/5",
      label: "High",
    };
  }

  if (severity === "medium") {
    return {
      badge:
        "border-amber-500/40 bg-amber-500/10 text-amber-300",
      card: "border-amber-500/25 bg-amber-500/5",
      label: "Medium",
    };
  }

  return {
    badge:
      "border-blue-500/40 bg-blue-500/10 text-blue-300",
    card: "border-blue-500/25 bg-blue-500/5",
    label: "Low",
  };
}

function ScoreCard({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  const safeScore = Number.isFinite(score) ? score : 0;
  const style = getScoreStyle(safeScore);

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-slate-400">
        {label}
      </p>

      <div className="mt-2 flex items-end gap-1">
        <p className="text-3xl font-bold text-white">
          {safeScore}
        </p>

        <span className="pb-1 text-sm text-slate-500">
          /100
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${style.bar}`}
          style={{
            width: `${Math.max(
              0,
              Math.min(100, safeScore)
            )}%`,
          }}
        />
      </div>
    </article>
  );
}

function BooleanStatus({
  label,
  value,
}: {
  label: string;
  value: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
      <span className="text-sm text-slate-300">
        {label}
      </span>

      <span
        className={
          value
            ? "rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300"
            : "rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300"
        }
      >
        {value ? "Detected" : "Missing"}
      </span>
    </div>
  );
}

function createSafeAnalysis(
  analysis: Partial<AnalysisResult>
): AnalysisResult {
  return {
    overallScore: analysis.overallScore ?? 0,

    keywordScore: analysis.keywordScore ?? 0,
    skillsScore: analysis.skillsScore ?? 0,
    experienceScore: analysis.experienceScore ?? 0,
    structureScore: analysis.structureScore ?? 0,
    bulletScore: analysis.bulletScore ?? 0,
    achievementScore: analysis.achievementScore ?? 0,
    formattingScore: analysis.formattingScore ?? 0,
    readabilityScore: analysis.readabilityScore ?? 0,

    achievementMetrics:
      analysis.achievementMetrics ?? 0,

    achievementActionVerbs:
      analysis.achievementActionVerbs ?? 0,

    achievementCount:
      analysis.achievementCount ?? 0,

    wordCount: analysis.wordCount ?? 0,
    bulletCount: analysis.bulletCount ?? 0,

    longParagraphCount:
      analysis.longParagraphCount ?? 0,

    longSentenceCount:
      analysis.longSentenceCount ?? 0,

    hasEmail: analysis.hasEmail ?? false,
    hasPhone: analysis.hasPhone ?? false,
    hasLinkedIn: analysis.hasLinkedIn ?? false,

    firstPersonPronounCount:
      analysis.firstPersonPronounCount ?? 0,

    weakPhraseCount:
      analysis.weakPhraseCount ?? 0,

    repeatedKeywordCount:
      analysis.repeatedKeywordCount ?? 0,

    formattingIssues:
      analysis.formattingIssues ?? [],

    matchedKeywords:
      analysis.matchedKeywords ?? [],

    missingKeywords:
      analysis.missingKeywords ?? [],

    matchedItems:
      analysis.matchedItems ?? [],

    missingItems:
      analysis.missingItems ?? [],

    sections: analysis.sections ?? [],

    foundSections:
      analysis.foundSections ?? [],

    missingSections:
      analysis.missingSections ?? [],

    requiredMissingSections:
      analysis.requiredMissingSections ?? [],

    recommendations:
      analysis.recommendations ?? [],
  };
}

export default function AtsResumeCheckerClient() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] =
    useState("");

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);
    const [isExportingPdf, setIsExportingPdf] =
  useState(false);

  const [error, setError] = useState("");

  const [result, setResult] =
    useState<AnalysisResult | null>(null);
    const [history, setHistory] = useState<
  AtsAnalysisHistoryItem[]
>([]);

const [historyLoaded, setHistoryLoaded] =
  useState(false);
  const lastCloudSaveKeyRef =
  useRef<string>("");

useEffect(() => {
  try {
    const savedHistory =
      getAtsAnalysisHistory();

    setHistory(savedHistory);
  } catch (historyError) {
    console.error(
      "Unable to load ATS history:",
      historyError
    );
  } finally {
    setHistoryLoaded(true);
  }
}, []);

  const canAnalyze = useMemo(() => {
    return (
      resumeText.trim().length >= 100 &&
      jobDescription.trim().length >= 100
    );
  }, [resumeText, jobDescription]);

  const scoreStyle = result
    ? getScoreStyle(result.overallScore)
    : null;

  async function handleAnalyze() {
    if (!canAnalyze) {
      const message =
        "Please add at least 100 characters to both the resume and job description.";

      setError(message);

      toast.error("More content required.", {
        description: message,
      });

      return;
    }

    setError("");
    setResult(null);
    setIsAnalyzing(true);

    try {
      const response = await fetch(
        "/api/ats-analyze",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            resumeText,
            jobDescription,
          }),
        }
      );

      const responseText = await response.text();

      let data:
        | Partial<AnalysisResult>
        | {
            error?: string;
          };

      try {
        data = JSON.parse(responseText);
      } catch {
        console.error(
          "Unexpected ATS API response:",
          responseText
        );

        throw new Error(
          "The server returned an unexpected response."
        );
      }

      if (!response.ok) {
        throw new Error(
          "error" in data && data.error
            ? data.error
            : "Unable to analyze the resume."
        );
      }

    const safeAnalysis = createSafeAnalysis(
  data as Partial<AnalysisResult>
);

setResult(safeAnalysis);

/*
 * Save to local browser history first.
 */
try {
  const savedItem =
    saveAtsAnalysisHistory({
      resumeText,
      jobDescription,

      result:
        safeAnalysis as AtsHistoryAnalysisResult,
    });

  setHistory((currentHistory) =>
    [
      savedItem,

      ...currentHistory.filter(
        (item) =>
          item.id !== savedItem.id
      ),
    ].slice(0, 20)
  );
} catch (historyError) {
  console.error(
    "Unable to save local ATS history:",
    historyError
  );

  toast.warning(
    "Analysis completed, but local history could not be saved."
  );
}

/*
 * Create a stable key from the current input.
 * This prevents the same completed analysis
 * from being inserted twice during one session.
 */
const cloudSaveKey = [
  resumeText.trim(),
  jobDescription.trim(),
  safeAnalysis.overallScore,
].join("::");

if (
  lastCloudSaveKeyRef.current !==
  cloudSaveKey
) {
  try {
    const jobTitle =
      jobDescription
        .split("\n")
        .map((line) => line.trim())
        .find(Boolean)
        ?.slice(0, 120) ||
      "ATS Resume Analysis";

    const cloudRecord =
      await saveResumeAnalysis({
        title: jobTitle,

        resumeText:
          resumeText.trim(),

        jobDescription:
          jobDescription.trim(),

        result:
          safeAnalysis as unknown as ResumeAnalysisResult,

        source: "web",
      });

    lastCloudSaveKeyRef.current =
      cloudSaveKey;

    console.log(
      "ATS analysis saved to Supabase:",
      cloudRecord.id
    );

    toast.success(
      "Analysis saved to cloud.",
      {
        description:
          "Your report is available in Dashboard, Reports, Analytics, and Compare.",
      }
    );
  } catch (cloudSaveError) {
    const cloudMessage =
      cloudSaveError instanceof Error
        ? cloudSaveError.message
        : "Unable to save the analysis to cloud history.";

    console.error(
      "Unable to save cloud ATS history:",
      cloudSaveError
    );

    /*
     * The ATS checker may still be used by a
     * visitor who is not signed in. The analysis
     * should remain successful in that case.
     */
    if (
      cloudMessage
        .toLowerCase()
        .includes(
          "must be signed in"
        )
    ) {
      toast.info(
        "Analysis saved locally.",
        {
          description:
            "Sign in to save future analyses to your cloud workspace.",
        }
      );
    } else {
      toast.warning(
        "Analysis completed, but cloud save failed.",
        {
          description:
            cloudMessage,
        }
      );
    }
  }
}
  
      sendGAEvent(
        "event",
        "ats_resume_analyze",
        {
          overall_score:
            safeAnalysis.overallScore,

          keyword_score:
            safeAnalysis.keywordScore,

          structure_score:
            safeAnalysis.structureScore,

          achievement_score:
            safeAnalysis.achievementScore,

          formatting_score:
            safeAnalysis.formattingScore,

          readability_score:
            safeAnalysis.readabilityScore,

          matched_keyword_count:
            safeAnalysis.matchedKeywords.length,

          missing_keyword_count:
            safeAnalysis.missingKeywords.length,

          formatting_issue_count:
            safeAnalysis.formattingIssues.length,
        }
      );

      toast.success(
        "ATS resume analysis completed."
      );

      window.setTimeout(() => {
        document
          .getElementById("ats-results")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 150);
    } catch (analysisError) {
      const message =
        analysisError instanceof Error
          ? analysisError.message
          : "Unable to analyze the resume.";

      console.error(
        "ATS analysis request error:",
        analysisError
      );

      setError(message);

      toast.error("Analysis failed.", {
        description: message,
      });
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleLoadSample() {
    setResumeText(SAMPLE_RESUME);
    setJobDescription(
      SAMPLE_JOB_DESCRIPTION
    );

    setResult(null);
    setError("");

    toast.success("Sample content loaded.");
  }

  function handleClear() {
    setResumeText("");
    setJobDescription("");
    setResult(null);
    setError("");

    toast.success("ATS form cleared.");
  }
async function handleExportCurrentPdf() {
  if (!result) {
    toast.error(
      "Complete an ATS analysis before exporting a PDF."
    );

    return;
  }

  setIsExportingPdf(true);

  try {
   await exportAtsAnalysisPdf({
  resumeText,
  jobDescription,
  result:
    result as AtsHistoryAnalysisResult,
  title:
    "ATS Resume Analysis Report",
});

    sendGAEvent(
      "event",
      "ats_pdf_export",
      {
        source: "current_analysis",
        overall_score:
          result.overallScore,
      }
    );

    toast.success(
      "ATS PDF report downloaded."
    );
  } catch (pdfError) {
    console.error(
      "ATS PDF export error:",
      pdfError
    );

    toast.error(
      "Unable to export the PDF report.",
      {
        description:
          "Please try again.",
      }
    );
  } finally {
    setIsExportingPdf(false);
  }
}

function handleRestoreHistory(
  historyItem: AtsAnalysisHistoryItem
) {
  setResumeText(historyItem.resumeText);

  setJobDescription(
    historyItem.jobDescription
  );

  setResult(
    historyItem.result as AnalysisResult
  );

  setError("");

  sendGAEvent(
    "event",
    "ats_history_restore",
    {
      overall_score:
        historyItem.result.overallScore,

      history_item_id:
        historyItem.id,
    }
  );

  window.setTimeout(() => {
    document
      .getElementById("ats-results")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }, 150);
}
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-10 flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4 sm:flex-row sm:items-center">
          <a
            href="/"
            className="text-lg font-bold tracking-tight text-white"
          >
            ResumeClimb AI
          </a>

          <div className="flex flex-wrap gap-3">
            <a
              href="/"
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              Bullet Generator
            </a>

            <button
              type="button"
              onClick={handleLoadSample}
              disabled={isAnalyzing}
              className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Load Sample
            </button>
          </div>
        </nav>

        <header className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            ATS Resume Optimizer
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Free ATS Resume Checker and Resume Score
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
            ResumeClimb AI is a free ATS resume checker that compares
            your resume with a target job description. Find missing
            keywords, weak bullet points, formatting risks, and practical
            improvements before your next application.
          </p>

          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-500">
            ATS scores are estimates and do not guarantee interviews,
            employer screening outcomes, or job offers.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-300">
              Keyword Matching
            </span>

            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-violet-300">
              Achievement Analysis
            </span>

            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-cyan-300">
              Formatting & Readability
            </span>

            <span className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-2 text-fuchsia-300">
              AI Bullet Rewrite
            </span>
          </div>
        </header>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <label
                  htmlFor="resume-text"
                  className="text-lg font-semibold text-white"
                >
                  Resume content
                </label>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Paste the text from your existing
                  resume.
                </p>
              </div>

              <span
                className={
                  resumeText.trim().length >= 100
                    ? "rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300"
                    : "rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-400"
                }
              >
                {resumeText.trim().length >= 100
                  ? "Ready"
                  : "Minimum 100"}
              </span>
            </div>

            <textarea
              id="resume-text"
              value={resumeText}
              onChange={(event) => {
                setResumeText(event.target.value);
                setError("");
              }}
              rows={20}
              placeholder={`Paste your resume here...

Recommended sections:
Contact Information
Professional Summary
Skills
Work Experience
Education
Projects`}
              className="mt-5 w-full resize-y rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <p className="mt-2 text-right text-xs text-slate-500">
              {resumeText.length} characters
            </p>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <label
                  htmlFor="job-description"
                  className="text-lg font-semibold text-white"
                >
                  Job description
                </label>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Paste the complete advertisement
                  for your target job.
                </p>
              </div>

              <span
                className={
                  jobDescription.trim().length >=
                  100
                    ? "rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300"
                    : "rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-400"
                }
              >
                {jobDescription.trim().length >=
                100
                  ? "Ready"
                  : "Minimum 100"}
              </span>
            </div>

            <textarea
              id="job-description"
              value={jobDescription}
              onChange={(event) => {
                setJobDescription(
                  event.target.value
                );
                setError("");
              }}
              rows={20}
              placeholder={`Paste the target job description here...

Include:
Required skills
Responsibilities
Experience requirements
Tools and technologies`}
              className="mt-5 w-full resize-y rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <p className="mt-2 text-right text-xs text-slate-500">
              {jobDescription.length} characters
            </p>
          </article>
        </section>

        {error && (
          <div
            role="alert"
            className="mx-auto mt-6 max-w-4xl rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm leading-6 text-red-200"
          >
            {error}
          </div>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={!canAnalyze || isAnalyzing}
            className="w-full rounded-2xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 sm:max-w-md"
          >
            {isAnalyzing
              ? "Analyzing Resume..."
              : "Analyze Resume Match"}
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={isAnalyzing}
            className="w-full rounded-2xl border border-slate-700 px-7 py-4 font-semibold text-slate-300 transition hover:border-slate-500 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Clear
          </button>
        </div>
        <section className="mt-12">
  {historyLoaded ? (
    <AtsHistoryPanel
      history={history}
      onHistoryChange={setHistory}
      onRestore={handleRestoreHistory}
    />
  ) : (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-7">
      <p className="text-sm text-slate-400">
        Loading saved ATS analyses...
      </p>
    </div>
  )}
</section>

        {!result && (
          <section className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "🎯",
                title: "Keyword Match",
                description:
                  "Compare skills and job-specific keywords.",
              },
              {
                icon: "📋",
                title: "Resume Structure",
                description:
                  "Detect ATS-friendly resume sections.",
              },
              {
                icon: "📈",
                title: "Achievement Quality",
                description:
                  "Measure action verbs and results.",
              },
              {
                icon: "✨",
                title: "AI Bullet Rewrite",
                description:
                  "Rewrite weak resume bullets using AI.",
              },
            ].map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
              >
                <p className="text-2xl">
                  {feature.icon}
                </p>

                <h2 className="mt-3 font-semibold text-white">
                  {feature.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {feature.description}
                </p>
              </article>
            ))}
          </section>
        )}

        {result && scoreStyle && (
          <section
            id="ats-results"
            className="mt-14 scroll-mt-8 space-y-6"
          >
            <article
              className={`rounded-3xl border ${scoreStyle.border} ${scoreStyle.background} p-7 text-center sm:p-10`}
            >
              <p
                className={`text-sm font-semibold uppercase tracking-[0.2em] ${scoreStyle.text}`}
              >
                Estimated ATS Match
              </p>

              <p className="mt-4 text-6xl font-bold text-white sm:text-7xl">
                {result.overallScore}

                <span className="text-2xl text-slate-400">
                  /100
                </span>
              </p>

              <p
                className={`mt-3 text-lg font-semibold ${scoreStyle.text}`}
              >
                {scoreStyle.label}
              </p>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400">
                This is an estimated resume-to-job
                alignment score and not a guaranteed
                employer ATS result.
              </p>
            </article>
<div className="flex flex-col justify-center gap-3 sm:flex-row">
  <button
    type="button"
    onClick={handleExportCurrentPdf}
    disabled={isExportingPdf}
    className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {isExportingPdf
      ? "Creating PDF..."
      : "Download ATS PDF Report"}
  </button>

  <button
    type="button"
    onClick={() => {
      window.print();

      sendGAEvent(
        "event",
        "ats_report_print",
        {
          overall_score:
            result.overallScore,
        }
      );
    }}
    disabled={isExportingPdf}
    className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
  >
    Print Results
  </button>
</div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ScoreCard
                label="Keywords"
                score={result.keywordScore}
              />

              <ScoreCard
                label="Skills"
                score={result.skillsScore}
              />

              <ScoreCard
                label="Experience"
                score={result.experienceScore}
              />

              <ScoreCard
                label="Structure"
                score={result.structureScore}
              />

              <ScoreCard
                label="Bullets"
                score={result.bulletScore}
              />

              <ScoreCard
                label="Achievements"
                score={result.achievementScore}
              />

              <ScoreCard
                label="Formatting"
                score={result.formattingScore}
              />

              <ScoreCard
                label="Readability"
                score={result.readabilityScore}
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6">
                <h2 className="text-xl font-bold text-emerald-300">
                  Matched Keywords
                </h2>

                <div className="mt-5 flex flex-wrap gap-2">
                  {result.matchedKeywords.length ===
                  0 ? (
                    <p className="text-sm text-slate-400">
                      No strong keyword matches were
                      found.
                    </p>
                  ) : (
                    result.matchedKeywords.map(
                      (keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200"
                        >
                          ✓ {keyword}
                        </span>
                      )
                    )
                  )}
                </div>
              </article>

              <article className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6">
                <h2 className="text-xl font-bold text-amber-300">
                  Missing Keywords
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Add these only when they truthfully
                  reflect your experience.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {result.missingKeywords.length ===
                  0 ? (
                    <p className="text-sm text-emerald-300">
                      No important job keywords are
                      missing.
                    </p>
                  ) : (
                    result.missingKeywords.map(
                      (keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-sm text-amber-200"
                        >
                          + {keyword}
                        </span>
                      )
                    )
                  )}
                </div>
              </article>
            </div>

            {result.missingItems.length > 0 && (
              <article className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="text-xl font-bold text-white">
                  Missing Skills by Category
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {result.missingItems.map((item) => (
                    <div
                      key={`${item.category}-${item.keyword}`}
                      className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                    >
                      <p className="font-semibold text-white">
                        {item.keyword}
                      </p>

                      <div className="mt-2 flex items-center justify-between gap-4 text-xs">
                        <span className="text-slate-400">
                          {getCategoryLabel(
                            item.category
                          )}
                        </span>

                        <span className="text-blue-300">
                          Weight {item.weight}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6">
                <h2 className="text-xl font-bold text-emerald-300">
                  Resume Sections Found
                </h2>

                <div className="mt-5 flex flex-wrap gap-2">
                  {result.foundSections.length ===
                  0 ? (
                    <p className="text-sm text-slate-400">
                      No recognized sections were
                      found.
                    </p>
                  ) : (
                    result.foundSections.map(
                      (section) => (
                        <span
                          key={section}
                          className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200"
                        >
                          ✓ {section}
                        </span>
                      )
                    )
                  )}
                </div>
              </article>

              <article className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6">
                <h2 className="text-xl font-bold text-red-300">
                  Missing Resume Sections
                </h2>

                <div className="mt-5 flex flex-wrap gap-2">
                  {result.missingSections.length ===
                  0 ? (
                    <p className="text-sm text-emerald-300">
                      All supported sections were
                      detected.
                    </p>
                  ) : (
                    result.missingSections.map(
                      (section) => {
                        const isRequired =
                          result.requiredMissingSections.includes(
                            section
                          );

                        return (
                          <span
                            key={section}
                            className={
                              isRequired
                                ? "rounded-full border border-red-500/40 bg-red-500/15 px-3 py-1 text-sm text-red-200"
                                : "rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-sm text-amber-200"
                            }
                          >
                            {isRequired
                              ? "Required: "
                              : "Optional: "}
                            {section}
                          </span>
                        );
                      }
                    )
                  )}
                </div>
              </article>
            </div>

            <article className="rounded-3xl border border-violet-500/30 bg-violet-500/10 p-6">
              <h2 className="text-xl font-bold text-violet-300">
                Achievement Analysis
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-violet-500/20 bg-slate-950/40 p-4">
                  <p className="text-sm text-slate-400">
                    Achievement Score
                  </p>

                  <p className="mt-2 text-3xl font-bold text-white">
                    {result.achievementScore}
                  </p>
                </div>

                <div className="rounded-2xl border border-violet-500/20 bg-slate-950/40 p-4">
                  <p className="text-sm text-slate-400">
                    Metrics Found
                  </p>

                  <p className="mt-2 text-3xl font-bold text-white">
                    {result.achievementMetrics}
                  </p>
                </div>

                <div className="rounded-2xl border border-violet-500/20 bg-slate-950/40 p-4">
                  <p className="text-sm text-slate-400">
                    Action Verbs Found
                  </p>

                  <p className="mt-2 text-3xl font-bold text-white">
                    {
                      result.achievementActionVerbs
                    }
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-cyan-500/30 bg-cyan-500/10 p-6">
              <h2 className="text-xl font-bold text-cyan-300">
                Formatting & Readability
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    label: "Word Count",
                    value: result.wordCount,
                  },
                  {
                    label: "Bullet Count",
                    value: result.bulletCount,
                  },
                  {
                    label: "Long Sentences",
                    value: result.longSentenceCount,
                  },
                  {
                    label: "Long Paragraphs",
                    value: result.longParagraphCount,
                  },
                  {
                    label: "First-Person Words",
                    value:
                      result.firstPersonPronounCount,
                  },
                  {
                    label: "Weak Phrases",
                    value: result.weakPhraseCount,
                  },
                  {
                    label: "Repeated Keywords",
                    value:
                      result.repeatedKeywordCount,
                  },
                  {
                    label: "Formatting Issues",
                    value:
                      result.formattingIssues.length,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-cyan-500/20 bg-slate-950/40 p-4"
                  >
                    <p className="text-sm text-slate-400">
                      {item.label}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 lg:grid-cols-3">
                <BooleanStatus
                  label="Professional email"
                  value={result.hasEmail}
                />

                <BooleanStatus
                  label="Phone number"
                  value={result.hasPhone}
                />

                <BooleanStatus
                  label="LinkedIn profile"
                  value={result.hasLinkedIn}
                />
              </div>
            </article>

            <article className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    ATS Formatting Issues
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Fix high-priority issues before
                    submitting your resume.
                  </p>
                </div>

                <span className="w-fit rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">
                  {result.formattingIssues.length}{" "}
                  Issues
                </span>
              </div>

              {result.formattingIssues.length ===
              0 ? (
                <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-emerald-300">
                  No major formatting issues were
                  detected.
                </div>
              ) : (
                <div className="mt-5 space-y-3">
                  {result.formattingIssues.map(
                    (issue) => {
                      const severity =
                        getSeverityClasses(
                          issue.severity
                        );

                      return (
                        <article
                          key={issue.id}
                          className={`rounded-2xl border p-5 ${severity.card}`}
                        >
                          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                            <div>
                              <h3 className="font-semibold text-white">
                                {issue.title}
                              </h3>

                              <p className="mt-2 text-sm leading-6 text-slate-400">
                                {issue.description}
                              </p>
                            </div>

                            <span
                              className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${severity.badge}`}
                            >
                              {severity.label}{" "}
                              Priority
                            </span>
                          </div>
                        </article>
                      );
                    }
                  )}
                </div>
              )}
            </article>

                     <article className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-xl font-bold text-white">
                Recommended Improvements
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Prioritize these actions before
                submitting your resume.
              </p>

              {result.recommendations.length === 0 ? (
                <p className="mt-5 text-sm text-emerald-300">
                  No major recommendations were
                  generated.
                </p>
              ) : (
                <ol className="mt-5 space-y-3 text-slate-300">
                  {result.recommendations.map(
                    (recommendation, index) => (
                      <li
                        key={`${index}-${recommendation}`}
                        className="flex gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-bold text-blue-300">
                          {index + 1}
                        </span>

                        <p className="leading-7">
                          {recommendation}
                        </p>
                      </li>
                    )
                  )}
                </ol>
              )}
            </article>

            <AiResumeCoach
              resumeText={resumeText}
              jobDescription={jobDescription}
              result={
                result as AtsHistoryAnalysisResult
              }
            />

            <AtsBulletRewriter
              jobDescription={jobDescription}
              missingKeywords={
                result.missingKeywords
              }
              defaultJobTitle=""
              onUseRewrite={(
                rewrittenBullet
              ) => {
                toast.success(
                  "Rewrite is ready to use.",
                  {
                    description:
                      rewrittenBullet,
                  }
                );
              }}
            />

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isAnalyzing
                  ? "Analyzing..."
                  : "Analyze Again"}
              </button>

              <button
                type="button"
                onClick={handleClear}
                disabled={isAnalyzing}
                className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-300 transition hover:border-slate-500 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Start New Analysis
              </button>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}