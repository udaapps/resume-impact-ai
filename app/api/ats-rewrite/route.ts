import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RewriteTone =
  | "professional"
  | "technical"
  | "executive"
  | "entry-level";

type RewriteStyle =
  | "ats-friendly"
  | "achievement-focused"
  | "star-method"
  | "concise";

type AtsRewriteRequest = {
  bullet?: unknown;
  jobTitle?: unknown;
  jobDescription?: unknown;
  missingKeywords?: unknown;
  tone?: unknown;
  style?: unknown;
};

type RewriteResult = {
  originalBullet: string;
  rewrittenBullet: string;
  alternatives: string[];
  keywordsUsed: string[];
  improvementSummary: string;
};

const MAX_BULLET_LENGTH = 1200;
const MAX_JOB_TITLE_LENGTH = 120;
const MAX_JOB_DESCRIPTION_LENGTH = 6000;
const MAX_KEYWORDS = 12;

const REWRITE_TONES: RewriteTone[] = [
  "professional",
  "technical",
  "executive",
  "entry-level",
];

const REWRITE_STYLES: RewriteStyle[] = [
  "ats-friendly",
  "achievement-focused",
  "star-method",
  "concise",
];

function cleanText(
  value: unknown,
  maximumLength: number
): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .trim()
    .slice(0, maximumLength);
}

function cleanStringArray(
  value: unknown,
  maximumItems: number,
  maximumItemLength: number
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const cleaned = value
    .filter(
      (item): item is string =>
        typeof item === "string"
    )
    .map((item) =>
      cleanText(item, maximumItemLength)
    )
    .filter(Boolean);

  return [...new Set(cleaned)].slice(
    0,
    maximumItems
  );
}

function isRewriteTone(
  value: unknown
): value is RewriteTone {
  return REWRITE_TONES.includes(
    value as RewriteTone
  );
}

function isRewriteStyle(
  value: unknown
): value is RewriteStyle {
  return REWRITE_STYLES.includes(
    value as RewriteStyle
  );
}

function buildInstructions(): string {
  return `
You are an expert resume-writing assistant.

Rewrite one resume bullet so it is:
- truthful
- concise
- ATS-friendly
- achievement-focused
- natural and human-sounding
- suitable for recruiter review

Rules:
1. Never invent numbers, percentages, revenue, team size, responsibilities, tools, qualifications, or achievements.
2. Preserve the candidate's original meaning.
3. Only use a supplied keyword when the original bullet or job context supports it.
4. Start the rewritten bullet with a strong action verb.
5. Avoid first-person pronouns.
6. Avoid weak phrases such as "responsible for", "worked on", "helped with", and "duties included".
7. Prefer one clear sentence.
8. Do not use markdown.
9. Return only the requested structured response.
`.trim();
}

function buildUserPrompt(params: {
  bullet: string;
  jobTitle: string;
  jobDescription: string;
  missingKeywords: string[];
  tone: RewriteTone;
  style: RewriteStyle;
}): string {
  const {
    bullet,
    jobTitle,
    jobDescription,
    missingKeywords,
    tone,
    style,
  } = params;

  return `
Rewrite the following resume bullet.

Original bullet:
${bullet}

Target job title:
${jobTitle || "Not provided"}

Target job description:
${jobDescription || "Not provided"}

Potential ATS keywords:
${
  missingKeywords.length > 0
    ? missingKeywords.join(", ")
    : "None provided"
}

Requested tone:
${tone}

Requested style:
${style}

Important:
- Do not invent measurable results.
- If no metric is provided, improve clarity and impact without adding one.
- Return one primary rewrite and exactly three useful alternatives.
- Report only keywords actually used in the rewrite.
`.trim();
}

function normalizeResult(
  parsed: unknown,
  originalBullet: string
): RewriteResult {
  if (
    typeof parsed !== "object" ||
    parsed === null
  ) {
    throw new Error(
      "The AI returned an invalid structured response."
    );
  }

  const value = parsed as Record<
    string,
    unknown
  >;

  const rewrittenBullet = cleanText(
    value.rewrittenBullet,
    700
  );

  const alternatives = cleanStringArray(
    value.alternatives,
    3,
    700
  );

  const keywordsUsed = cleanStringArray(
    value.keywordsUsed,
    MAX_KEYWORDS,
    80
  );

  const improvementSummary = cleanText(
    value.improvementSummary,
    500
  );

  if (!rewrittenBullet) {
    throw new Error(
      "The AI did not return a usable rewritten bullet."
    );
  }

  return {
    originalBullet,
    rewrittenBullet,
    alternatives,
    keywordsUsed,
    improvementSummary:
      improvementSummary ||
      "Improved the action language, clarity, relevance, and ATS-friendly phrasing without inventing new facts.",
  };
}

function safelyParseJson(
  outputText: string
): unknown {
  const cleaned = outputText
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (
      firstBrace >= 0 &&
      lastBrace > firstBrace
    ) {
      return JSON.parse(
        cleaned.slice(
          firstBrace,
          lastBrace + 1
        )
      );
    }

    throw new Error(
      "The AI returned text that could not be parsed as JSON."
    );
  }
}

function getErrorDetails(error: unknown): {
  status: number;
  message: string;
  code?: string;
  type?: string;
} {
  let status = 500;
  let message =
    "Unknown AI rewrite error.";
  let code: string | undefined;
  let type: string | undefined;

  if (error instanceof Error) {
    message = error.message;
  }

  if (
    typeof error === "object" &&
    error !== null
  ) {
    const record = error as Record<
      string,
      unknown
    >;

    if (typeof record.status === "number") {
      status = record.status;
    }

    if (typeof record.message === "string") {
      message = record.message;
    }

    if (typeof record.code === "string") {
      code = record.code;
    }

    if (typeof record.type === "string") {
      type = record.type;
    }

    if (
      typeof record.error === "object" &&
      record.error !== null
    ) {
      const nestedError =
        record.error as Record<
          string,
          unknown
        >;

      if (
        typeof nestedError.message ===
        "string"
      ) {
        message = nestedError.message;
      }

      if (
        typeof nestedError.code === "string"
      ) {
        code = nestedError.code;
      }

      if (
        typeof nestedError.type === "string"
      ) {
        type = nestedError.type;
      }
    }
  }

  return {
    status:
      status >= 400 && status <= 599
        ? status
        : 500,
    message,
    code,
    type,
  };
}

export async function POST(
  request: Request
) {
  try {
    const apiKey =
      process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error(
        "ATS rewrite configuration error: OPENAI_API_KEY is missing."
      );

      return NextResponse.json(
        {
          error:
            "The AI rewrite service is not configured.",
        },
        { status: 500 }
      );
    }

    let body: AtsRewriteRequest;

    try {
      body =
        (await request.json()) as AtsRewriteRequest;
    } catch {
      return NextResponse.json(
        {
          error:
            "The request body must contain valid JSON.",
        },
        { status: 400 }
      );
    }

    const bullet = cleanText(
      body.bullet,
      MAX_BULLET_LENGTH
    );

    const jobTitle = cleanText(
      body.jobTitle,
      MAX_JOB_TITLE_LENGTH
    );

    const jobDescription = cleanText(
      body.jobDescription,
      MAX_JOB_DESCRIPTION_LENGTH
    );

    const missingKeywords =
      cleanStringArray(
        body.missingKeywords,
        MAX_KEYWORDS,
        80
      );

    const tone: RewriteTone =
      isRewriteTone(body.tone)
        ? body.tone
        : "professional";

    const style: RewriteStyle =
      isRewriteStyle(body.style)
        ? body.style
        : "achievement-focused";

    if (!bullet) {
      return NextResponse.json(
        {
          error:
            "A resume bullet is required.",
        },
        { status: 400 }
      );
    }

    if (bullet.length < 12) {
      return NextResponse.json(
        {
          error:
            "Please enter a more detailed resume bullet.",
        },
        { status: 400 }
      );
    }

    const client = new OpenAI({
      apiKey,
    });

   const response =
  await client.responses.create({
    model:
      process.env.OPENAI_MODEL ||
      "gpt-5-mini",

    instructions:
      buildInstructions(),

    input: buildUserPrompt({
      bullet,
      jobTitle,
      jobDescription,
      missingKeywords,
      tone,
      style,
    }),

    reasoning: {
      effort: "low",
    },

    text: {
      format: {
        type: "json_schema",
        name: "ats_resume_rewrite",
        description:
          "A truthful ATS-friendly resume bullet rewrite with alternatives and improvement details.",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            rewrittenBullet: {
              type: "string",
            },
            alternatives: {
              type: "array",
              items: {
                type: "string",
              },
              minItems: 3,
              maxItems: 3,
            },
            keywordsUsed: {
              type: "array",
              items: {
                type: "string",
              },
            },
            improvementSummary: {
              type: "string",
            },
          },
          required: [
            "rewrittenBullet",
            "alternatives",
            "keywordsUsed",
            "improvementSummary",
          ],
        },
      },
    },

    max_output_tokens: 3000,
  });
    if (response.status === "failed") {
      console.error(
        "ATS rewrite response failed:",
        response
      );

      throw new Error(
        "The AI rewrite request failed."
      );
    }

    if (response.status === "incomplete") {
  const reason =
    response.incomplete_details?.reason ??
    "unknown";

  console.error(
    "ATS rewrite response incomplete:",
    {
      reason,
      usage: response.usage,
      responseId: response.id,
    }
  );

  throw new Error(
    `The AI rewrite response was incomplete: ${reason}.`
  );
}

    const outputText =
      response.output_text?.trim();

    if (!outputText) {
      console.error(
        "ATS rewrite empty response:",
        response
      );

      throw new Error(
        "The AI returned an empty rewrite response."
      );
    }

    const parsed =
      safelyParseJson(outputText);

    const result = normalizeResult(
      parsed,
      bullet
    );

    return NextResponse.json(
      result,
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    const details =
      getErrorDetails(error);

    console.error(
      "ATS rewrite full error:",
      error
    );

    return NextResponse.json(
      {
        error: details.message,

        ...(process.env.NODE_ENV ===
        "development"
          ? {
              debug: {
                status: details.status,
                code: details.code,
                type: details.type,
              },
            }
          : {}),
      },
      {
        status: details.status,
        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      }
    );
  }
}