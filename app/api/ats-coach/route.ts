import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ScoreBreakdown = {
  overallScore?: number;
  keywordScore?: number;
  skillsScore?: number;
  experienceScore?: number;
  structureScore?: number;
  bulletScore?: number;
  achievementScore?: number;
  formattingScore?: number;
  readabilityScore?: number;
};

type AtsCoachRequest = {
  resumeText?: string;
  jobDescription?: string;

  result?: ScoreBreakdown & {
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
};

type CoachPriority = {
  rank: number;
  title: string;
  reason: string;
  action: string;
  expectedImpact: "high" | "medium" | "low";
  relatedScore: string;
};

type KeywordAction = {
  keyword: string;
  status:
    | "use-if-true"
    | "already-present"
    | "not-recommended";
  placement: string;
  guidance: string;
};

type BulletAction = {
  originalIdea: string;
  problem: string;
  improvementDirection: string;
  exampleFramework: string;
};

type SectionAction = {
  section: string;
  status:
    | "missing"
    | "weak"
    | "present";
  action: string;
};

type AtsCoachResponse = {
  source: "ai" | "local";
  readiness: {
    level:
      | "strong"
      | "good"
      | "developing"
      | "not-ready";
    score: number;
    message: string;
  };

  executiveSummary: string;

  biggestBlockers: string[];

  priorities: CoachPriority[];

  keywordPlan: KeywordAction[];

  bulletPlan: BulletAction[];

  sectionPlan: SectionAction[];

  sevenDayPlan: Array<{
    day: number;
    title: string;
    task: string;
  }>;

  finalChecklist: string[];

  safetyNotice: string;
};

const COACH_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    readiness: {
      type: "object",
      additionalProperties: false,
      properties: {
        level: {
          type: "string",
          enum: [
            "strong",
            "good",
            "developing",
            "not-ready",
          ],
        },
        score: {
          type: "number",
          minimum: 0,
          maximum: 100,
        },
        message: {
          type: "string",
        },
      },
      required: [
        "level",
        "score",
        "message",
      ],
    },

    executiveSummary: {
      type: "string",
    },

    biggestBlockers: {
      type: "array",
      items: {
        type: "string",
      },
      maxItems: 5,
    },

    priorities: {
      type: "array",
      maxItems: 6,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          rank: {
            type: "number",
          },
          title: {
            type: "string",
          },
          reason: {
            type: "string",
          },
          action: {
            type: "string",
          },
          expectedImpact: {
            type: "string",
            enum: [
              "high",
              "medium",
              "low",
            ],
          },
          relatedScore: {
            type: "string",
          },
        },
        required: [
          "rank",
          "title",
          "reason",
          "action",
          "expectedImpact",
          "relatedScore",
        ],
      },
    },

    keywordPlan: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          keyword: {
            type: "string",
          },
          status: {
            type: "string",
            enum: [
              "use-if-true",
              "already-present",
              "not-recommended",
            ],
          },
          placement: {
            type: "string",
          },
          guidance: {
            type: "string",
          },
        },
        required: [
          "keyword",
          "status",
          "placement",
          "guidance",
        ],
      },
    },

    bulletPlan: {
      type: "array",
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          originalIdea: {
            type: "string",
          },
          problem: {
            type: "string",
          },
          improvementDirection: {
            type: "string",
          },
          exampleFramework: {
            type: "string",
          },
        },
        required: [
          "originalIdea",
          "problem",
          "improvementDirection",
          "exampleFramework",
        ],
      },
    },

    sectionPlan: {
      type: "array",
      maxItems: 8,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          section: {
            type: "string",
          },
          status: {
            type: "string",
            enum: [
              "missing",
              "weak",
              "present",
            ],
          },
          action: {
            type: "string",
          },
        },
        required: [
          "section",
          "status",
          "action",
        ],
      },
    },

    sevenDayPlan: {
      type: "array",
      minItems: 7,
      maxItems: 7,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          day: {
            type: "number",
          },
          title: {
            type: "string",
          },
          task: {
            type: "string",
          },
        },
        required: [
          "day",
          "title",
          "task",
        ],
      },
    },

    finalChecklist: {
      type: "array",
      maxItems: 10,
      items: {
        type: "string",
      },
    },

    safetyNotice: {
      type: "string",
    },
  },

  required: [
    "readiness",
    "executiveSummary",
    "biggestBlockers",
    "priorities",
    "keywordPlan",
    "bulletPlan",
    "sectionPlan",
    "sevenDayPlan",
    "finalChecklist",
    "safetyNotice",
  ],
} as const;

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
    Math.min(100, Math.round(value))
  );
}

function cleanString(
  value: unknown,
  maximumLength = 300
): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, maximumLength);
}

function cleanStringArray(
  value: unknown,
  maximumItems = 20,
  maximumItemLength = 100
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string"
    )
    .map((item) =>
      cleanString(
        item,
        maximumItemLength
      )
    )
    .filter(Boolean)
    .filter(
      (item, index, items) =>
        items.indexOf(item) === index
    )
    .slice(0, maximumItems);
}

function createReadiness(
  score: number
): AtsCoachResponse["readiness"] {
  if (score >= 80) {
    return {
      level: "strong",
      score,
      message:
        "Your resume has strong alignment with the target role. Complete a final accuracy and formatting review before applying.",
    };
  }

  if (score >= 60) {
    return {
      level: "good",
      score,
      message:
        "Your resume has a good foundation, but several targeted improvements could strengthen its job match.",
    };
  }

  if (score >= 40) {
    return {
      level: "developing",
      score,
      message:
        "Your resume needs focused keyword, structure, and achievement improvements before submission.",
    };
  }

  return {
    level: "not-ready",
    score,
    message:
      "Your resume currently has limited alignment with the target role and should be revised before applying.",
  };
}

function createLocalCoach(
  body: AtsCoachRequest
): AtsCoachResponse {
  const result = body.result ?? {};

  const overallScore =
    clampScore(result.overallScore);

  const missingKeywords =
    cleanStringArray(
      result.missingKeywords,
      10
    );

  const matchedKeywords =
    cleanStringArray(
      result.matchedKeywords,
      10
    );

  const missingSections =
    cleanStringArray(
      result.requiredMissingSections ??
        result.missingSections,
      8
    );

  const existingRecommendations =
    cleanStringArray(
      result.recommendations,
      8,
      250
    );

  const priorities: CoachPriority[] = [];

  if (
    clampScore(result.keywordScore) <
    70
  ) {
    priorities.push({
      rank: priorities.length + 1,
      title:
        "Improve relevant keyword alignment",
      reason:
        missingKeywords.length > 0
          ? `Important job terms are not clearly represented, including ${missingKeywords
              .slice(0, 5)
              .join(", ")}.`
          : "The keyword match score is below the recommended level.",
      action:
        "Review each missing term and add it naturally only where it accurately represents your real experience.",
      expectedImpact: "high",
      relatedScore: "Keyword score",
    });
  }

  if (
    missingSections.length > 0 ||
    clampScore(
      result.structureScore
    ) < 70
  ) {
    priorities.push({
      rank: priorities.length + 1,
      title:
        "Strengthen resume structure",
      reason:
        missingSections.length > 0
          ? `Important sections need attention: ${missingSections.join(
              ", "
            )}.`
          : "The current section structure may be difficult for ATS systems or recruiters to scan.",
      action:
        "Use conventional headings such as Professional Summary, Skills, Work Experience, Education, and Projects.",
      expectedImpact: "high",
      relatedScore: "Structure score",
    });
  }

  if (
    clampScore(
      result.achievementScore
    ) < 70 ||
    clampScore(result.bulletScore) <
      70
  ) {
    priorities.push({
      rank: priorities.length + 1,
      title:
        "Convert duties into achievements",
      reason:
        "Some experience statements may describe responsibilities without clearly showing outcomes or impact.",
      action:
        "Start bullets with strong action verbs and add truthful scope, results, quantities, percentages, or time savings where available.",
      expectedImpact: "high",
      relatedScore:
        "Bullet and achievement scores",
    });
  }

  if (
    clampScore(
      result.formattingScore
    ) < 75
  ) {
    priorities.push({
      rank: priorities.length + 1,
      title:
        "Resolve ATS formatting issues",
      reason:
        "Formatting checks indicate issues that may reduce machine readability.",
      action:
        "Use a simple single-column layout, standard headings, readable fonts, and avoid text boxes, icons, or complex tables.",
      expectedImpact: "medium",
      relatedScore: "Formatting score",
    });
  }

  if (
    clampScore(
      result.readabilityScore
    ) < 75
  ) {
    priorities.push({
      rank: priorities.length + 1,
      title:
        "Improve recruiter readability",
      reason:
        "Some content may be too dense, long, repetitive, or difficult to scan quickly.",
      action:
        "Shorten long sentences, remove weak phrases, and keep bullets focused on one clear contribution.",
      expectedImpact: "medium",
      relatedScore: "Readability score",
    });
  }

  if (priorities.length === 0) {
    priorities.push({
      rank: 1,
      title:
        "Complete a final accuracy review",
      reason:
        "The main ATS categories already show good performance.",
      action:
        "Verify dates, contact information, job titles, keywords, metrics, grammar, and factual accuracy before applying.",
      expectedImpact: "medium",
      relatedScore: "Overall score",
    });
  }

  const keywordPlan: KeywordAction[] = [
    ...missingKeywords.map(
      (keyword) => ({
        keyword,
        status:
          "use-if-true" as const,
        placement:
          "Skills, Professional Summary, or relevant Work Experience bullet",
        guidance:
          "Add this keyword only where it accurately reflects work you have genuinely performed.",
      })
    ),

    ...matchedKeywords
      .slice(0, 4)
      .map((keyword) => ({
        keyword,
        status:
          "already-present" as const,
        placement:
          "Keep it in the most relevant existing section",
        guidance:
          "Retain this term, but avoid unnecessary repetition or keyword stuffing.",
      })),
  ].slice(0, 10);

  const sectionPlan: SectionAction[] =
    missingSections.length > 0
      ? missingSections.map(
          (section) => ({
            section,
            status:
              "missing" as const,
            action:
              `Add a clearly labeled ${section} section using truthful and role-relevant information.`,
          })
        )
      : [
          {
            section:
              "Professional Summary",
            status:
              "present" as const,
            action:
              "Keep it concise and align it with the target role without making unsupported claims.",
          },
          {
            section: "Skills",
            status:
              "present" as const,
            action:
              "Prioritize relevant hard skills and remove unrelated or outdated items.",
          },
          {
            section:
              "Work Experience",
            status:
              "present" as const,
            action:
              "Lead with achievements and measurable outcomes rather than generic duties.",
          },
        ];

  const biggestBlockers = priorities
    .slice(0, 4)
    .map((priority) => priority.title);

  return {
    source: "local",

    readiness:
      createReadiness(overallScore),

    executiveSummary:
      existingRecommendations[0] ??
      `Your estimated ATS score is ${overallScore}/100. Focus first on the highest-impact keyword, structure, achievement, and formatting improvements.`,

    biggestBlockers,

    priorities,

    keywordPlan,

    bulletPlan: [
      {
        originalIdea:
          "A responsibility-focused experience statement",
        problem:
          "It may explain what you were assigned to do without showing the value or outcome.",
        improvementDirection:
          "Use Action + Task + Method + Result. Include metrics only when they are factual.",
        exampleFramework:
          "Improved [process or system] by [action and method], resulting in [truthful outcome or measurable impact].",
      },
      {
        originalIdea:
          "A bullet containing a weak phrase such as responsible for",
        problem:
          "Weak openings reduce clarity and make achievements less visible.",
        improvementDirection:
          "Replace weak phrases with a specific action verb that accurately describes your contribution.",
        exampleFramework:
          "[Action verb] [specific work] using [relevant skill or tool] to achieve [truthful result].",
      },
    ],

    sectionPlan,

    sevenDayPlan: [
      {
        day: 1,
        title:
          "Verify the target role",
        task:
          "Highlight the most important responsibilities, skills, tools, and qualifications in the job description.",
      },
      {
        day: 2,
        title:
          "Review keyword gaps",
        task:
          "Check every missing keyword and mark whether it truthfully represents your experience.",
      },
      {
        day: 3,
        title:
          "Improve resume sections",
        task:
          "Add missing required sections and use conventional ATS-friendly headings.",
      },
      {
        day: 4,
        title:
          "Rewrite weak bullets",
        task:
          "Rewrite the weakest experience bullets using strong action verbs and truthful outcomes.",
      },
      {
        day: 5,
        title:
          "Add measurable impact",
        task:
          "Add accurate percentages, quantities, time savings, scope, or business results where evidence exists.",
      },
      {
        day: 6,
        title:
          "Fix formatting",
        task:
          "Check contact details, spacing, headings, dates, font consistency, and ATS-safe layout.",
      },
      {
        day: 7,
        title:
          "Final quality review",
        task:
          "Proofread the resume, confirm factual accuracy, run a new ATS analysis, and compare the result.",
      },
    ],

    finalChecklist: [
      "Contact information is complete and correct.",
      "The target job title is reflected naturally where appropriate.",
      "Important skills appear only when they are truthful.",
      "Work experience bullets begin with strong action verbs.",
      "Metrics and achievements are accurate and defensible.",
      "Required resume sections use standard headings.",
      "Formatting is simple, consistent, and ATS friendly.",
      "Spelling, grammar, dates, and job titles have been reviewed.",
      "The resume is tailored to this role without keyword stuffing.",
      "The final document has been reviewed by the applicant before use.",
    ],

    safetyNotice:
      "Never add a skill, tool, qualification, metric, responsibility, or achievement that does not accurately represent your real background.",
  };
}

function extractJson(
  output: string
): unknown {
  const trimmed = output.trim();

  if (!trimmed) {
    throw new Error(
      "The AI coach returned an empty response."
    );
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    const withoutFences = trimmed
      .replace(
        /^```(?:json)?\s*/i,
        ""
      )
      .replace(/\s*```$/i, "")
      .trim();

    return JSON.parse(withoutFences);
  }
}

function isCoachResponse(
  value: unknown
): value is Omit<
  AtsCoachResponse,
  "source"
> {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const candidate =
    value as Record<
      string,
      unknown
    >;

  return (
    typeof candidate.executiveSummary ===
      "string" &&
    Array.isArray(
      candidate.biggestBlockers
    ) &&
    Array.isArray(
      candidate.priorities
    ) &&
    Array.isArray(
      candidate.keywordPlan
    ) &&
    Array.isArray(
      candidate.bulletPlan
    ) &&
    Array.isArray(
      candidate.sectionPlan
    ) &&
    Array.isArray(
      candidate.sevenDayPlan
    ) &&
    Array.isArray(
      candidate.finalChecklist
    ) &&
    typeof candidate.safetyNotice ===
      "string" &&
    typeof candidate.readiness ===
      "object" &&
    candidate.readiness !== null
  );
}

export async function POST(
  request: Request
) {
  let body: AtsCoachRequest;

  try {
    body =
      (await request.json()) as AtsCoachRequest;
  } catch {
    return NextResponse.json(
      {
        error:
          "Invalid JSON request body.",
      },
      {
        status: 400,
      }
    );
  }

  const resumeText = cleanString(
    body.resumeText,
    15_000
  );

  const jobDescription =
    cleanString(
      body.jobDescription,
      12_000
    );

  if (
    resumeText.length < 100 ||
    jobDescription.length < 100
  ) {
    return NextResponse.json(
      {
        error:
          "Please provide at least 100 characters for both the resume and job description.",
      },
      {
        status: 400,
      }
    );
  }

  if (!body.result) {
    return NextResponse.json(
      {
        error:
          "ATS analysis results are required before generating coaching advice.",
      },
      {
        status: 400,
      }
    );
  }

  const localCoach =
    createLocalCoach(body);

  const apiKey =
    process.env.OPENAI_API_KEY;

  /*
   * The local coach keeps the feature usable
   * when the API key, billing, or AI service is
   * temporarily unavailable.
   */
  if (!apiKey) {
    return NextResponse.json(
      localCoach
    );
  }

  try {
    const client = new OpenAI({
      apiKey,
    });

    const resultForPrompt = {
      overallScore: clampScore(
        body.result.overallScore
      ),

      keywordScore: clampScore(
        body.result.keywordScore
      ),

      skillsScore: clampScore(
        body.result.skillsScore
      ),

      experienceScore: clampScore(
        body.result.experienceScore
      ),

      structureScore: clampScore(
        body.result.structureScore
      ),

      bulletScore: clampScore(
        body.result.bulletScore
      ),

      achievementScore: clampScore(
        body.result.achievementScore
      ),

      formattingScore: clampScore(
        body.result.formattingScore
      ),

      readabilityScore: clampScore(
        body.result.readabilityScore
      ),

      matchedKeywords:
        cleanStringArray(
          body.result
            .matchedKeywords,
          20
        ),

      missingKeywords:
        cleanStringArray(
          body.result
            .missingKeywords,
          20
        ),

      foundSections:
        cleanStringArray(
          body.result
            .foundSections,
          15
        ),

      missingSections:
        cleanStringArray(
          body.result
            .missingSections,
          15
        ),

      requiredMissingSections:
        cleanStringArray(
          body.result
            .requiredMissingSections,
          15
        ),

      recommendations:
        cleanStringArray(
          body.result
            .recommendations,
          10,
          300
        ),

      formattingIssues:
        Array.isArray(
          body.result
            .formattingIssues
        )
          ? body.result.formattingIssues
              .slice(0, 10)
              .map((issue) => ({
                title:
                  cleanString(
                    issue.title,
                    100
                  ),
                description:
                  cleanString(
                    issue.description,
                    250
                  ),
                severity:
                  cleanString(
                    issue.severity,
                    20
                  ),
              }))
          : [],

      achievementCount:
        clampScore(
          body.result
            .achievementCount
        ),

      achievementMetrics:
        clampScore(
          body.result
            .achievementMetrics
        ),

      achievementActionVerbs:
        clampScore(
          body.result
            .achievementActionVerbs
        ),

      wordCount:
        clampScore(
          body.result.wordCount
        ),

      bulletCount:
        clampScore(
          body.result.bulletCount
        ),

      weakPhraseCount:
        clampScore(
          body.result
            .weakPhraseCount
        ),

      longSentenceCount:
        clampScore(
          body.result
            .longSentenceCount
        ),

      longParagraphCount:
        clampScore(
          body.result
            .longParagraphCount
        ),

      hasEmail:
        Boolean(
          body.result.hasEmail
        ),

      hasPhone:
        Boolean(
          body.result.hasPhone
        ),

      hasLinkedIn:
        Boolean(
          body.result.hasLinkedIn
        ),
    };

    const response =
      await client.responses.create({
        model:
          process.env
            .OPENAI_COACH_MODEL ??
          "gpt-5",

        instructions: `
You are the Resume Impact AI Coach.

Your task is to produce practical, prioritized, truthful resume coaching based only on the supplied resume, job description, and ATS analysis.

Critical safety and quality rules:

1. Never invent employment history, qualifications, technologies, skills, certifications, metrics, percentages, responsibilities, or achievements.
2. Missing keywords must be described as "use only if true" unless they are clearly supported by the resume.
3. Do not promise interviews, hiring results, or compatibility with every ATS.
4. Do not rewrite the entire resume.
5. Focus on specific next actions that could improve clarity, relevance, ATS readability, and recruiter review.
6. Prioritize the highest-impact blockers first.
7. When suggesting bullet improvements, provide frameworks or directions rather than invented results.
8. Use concise professional English.
9. The seven-day plan must contain exactly seven entries, numbered 1 through 7.
10. Return only the requested structured response.
        `.trim(),

        input: `
TARGET JOB DESCRIPTION:
${jobDescription}

CURRENT RESUME:
${resumeText}

ATS ANALYSIS:
${JSON.stringify(
  resultForPrompt,
  null,
  2
)}

Create a personalized ATS coaching plan that:
- explains the current readiness level;
- identifies the biggest blockers;
- ranks the most important improvements;
- provides truthful keyword-placement guidance;
- identifies bullet improvement opportunities without inventing facts;
- provides a section improvement plan;
- creates a practical seven-day action plan;
- ends with a final application checklist and accuracy notice.
        `.trim(),

        text: {
          format: {
            type: "json_schema",
            name: "ats_coach_response",
            strict: true,
            schema: COACH_SCHEMA,
          },
        },
      });

    const parsed = extractJson(
      response.output_text
    );

    if (!isCoachResponse(parsed)) {
      console.error(
        "Invalid ATS coach response:",
        parsed
      );

      return NextResponse.json(
        localCoach
      );
    }

    return NextResponse.json({
      source: "ai",
      ...parsed,
    } satisfies AtsCoachResponse);
  } catch (error) {
    console.error(
      "ATS coach API error:",
      error
    );

    /*
     * Return a useful deterministic plan rather
     * than breaking the complete ATS page.
     */
    return NextResponse.json(
      localCoach
    );
  }
}