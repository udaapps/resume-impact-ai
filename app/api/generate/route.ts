import OpenAI from "openai";
import { NextResponse } from "next/server";

type GenerateRequest = {
  jobTitle?: string;
  experienceLevel?: string;
  resumeStyle?: string;
  responsibility?: string;
  achievement?: string;
  metric?: string;
};

type AtsAnalysis = {
  score: number;
  rating: string;
  strengths: string[];
  suggestions: string[];
};

type GenerateResponse = {
  bullets: string[];
  atsAnalysis: AtsAnalysis;
};

function cleanValue(value?: string) {
  return value?.trim() ?? "";
}

function isValidGenerateResponse(
  value: unknown
): value is GenerateResponse {
  if (!value || typeof value !== "object") {
    return false;
  }

  const result = value as Partial<GenerateResponse>;

  return (
    Array.isArray(result.bullets) &&
    result.bullets.length === 3 &&
    result.bullets.every(
      (bullet) =>
        typeof bullet === "string" &&
        bullet.trim().length > 0
    ) &&
    !!result.atsAnalysis &&
    typeof result.atsAnalysis === "object" &&
    typeof result.atsAnalysis.score === "number" &&
    result.atsAnalysis.score >= 0 &&
    result.atsAnalysis.score <= 100 &&
    typeof result.atsAnalysis.rating === "string" &&
    Array.isArray(result.atsAnalysis.strengths) &&
    result.atsAnalysis.strengths.every(
      (item) => typeof item === "string"
    ) &&
    Array.isArray(result.atsAnalysis.suggestions) &&
    result.atsAnalysis.suggestions.every(
      (item) => typeof item === "string"
    )
  );
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "OPENAI_API_KEY was not found. Check your .env.local file and restart the server.",
        },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey,
    });

    const body =
      (await request.json()) as GenerateRequest;

    const jobTitle = cleanValue(body.jobTitle);

    const experienceLevel =
      cleanValue(body.experienceLevel) || "Mid Level";

    const resumeStyle =
      cleanValue(body.resumeStyle) || "ATS Optimized";

    const responsibility =
      cleanValue(body.responsibility);

    const achievement =
      cleanValue(body.achievement);

    const metric =
      cleanValue(body.metric);

    if (!jobTitle || !responsibility) {
      return NextResponse.json(
        {
          error:
            "Job title and responsibility are required.",
        },
        { status: 400 }
      );
    }

    if (
      jobTitle.length > 100 ||
      experienceLevel.length > 50 ||
      resumeStyle.length > 50 ||
      responsibility.length > 800 ||
      achievement.length > 400 ||
      metric.length > 100
    ) {
      return NextResponse.json(
        {
          error:
            "One or more provided fields are too long.",
        },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert resume writer and ATS optimization specialist.

Create exactly 3 professional resume bullet points and analyze their ATS quality.

User information:

Job title: ${jobTitle}
Experience level: ${experienceLevel}
Resume style: ${resumeStyle}
Responsibility: ${responsibility}
Achievement or result: ${
      achievement || "Not provided"
    }
Metric or number: ${metric || "Not provided"}

Resume bullet rules:

- Create exactly 3 different resume bullet points.
- Start each bullet with a different strong past-tense action verb.
- Write natural, professional English.
- Match the vocabulary and responsibility level to the selected experience level.
- Follow the selected resume style.
- Focus on impact, outcomes, efficiency, leadership, contribution, or business value.
- Use the supplied metric only when it was provided.
- Never invent tools, software, percentages, revenue, team sizes, responsibilities, or achievements.
- Keep each bullet between 18 and 32 words.
- Avoid repeating the same sentence structure.
- Avoid first-person pronouns.
- Do not add numbering or bullet symbols inside the strings.

Experience-level guidance:

- Entry Level: emphasize skills, learning, contribution, reliability, and potential.
- Mid Level: emphasize ownership, execution, collaboration, and measurable outcomes.
- Senior Level: emphasize ownership, technical depth, mentoring, strategy, and business impact.
- Manager: emphasize team leadership, process improvement, decisions, and delivery.
- Director: emphasize strategy, cross-functional leadership, organizational outcomes, and business value.
- Executive: emphasize enterprise leadership, transformation, growth, governance, and strategic results.

Resume-style guidance:

- ATS Optimized: use clear job-relevant terminology without keyword stuffing.
- Professional: use polished and balanced business language.
- Results Focused: emphasize outcomes and measurable impact.
- Leadership: emphasize ownership, collaboration, decisions, and team impact.
- Executive: emphasize strategy, organizational leadership, and business value.
- Technical: emphasize systems, processes, technical execution, efficiency, quality, and performance.
- Concise: use shorter sentences while preserving impact.

ATS analysis rules:

- Score the three generated bullets together from 0 to 100.
- Evaluate action verbs, clarity, measurable impact, readability, ATS-friendly wording, relevance, repetition, and sentence length.
- Do not claim that the score guarantees success with a real applicant tracking system.
- Rating must be one of:
  "Needs Improvement"
  "Fair"
  "Good"
  "Very Good"
  "Excellent"
- Return 3 to 5 concise strengths.
- Return 2 to 4 practical suggestions.
- Suggestions must not ask the user to invent experience or false achievements.
- If no metric was supplied, it is acceptable to suggest adding a truthful measurable result where available.
`;

    const response =
      await openai.responses.create({
        model: "gpt-4o-mini",
        input: prompt,
        text: {
          format: {
            type: "json_schema",
            name: "resume_bullets_with_ats_analysis",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                bullets: {
                  type: "array",
                  minItems: 3,
                  maxItems: 3,
                  items: {
                    type: "string",
                  },
                },
                atsAnalysis: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    score: {
                      type: "integer",
                      minimum: 0,
                      maximum: 100,
                    },
                    rating: {
                      type: "string",
                      enum: [
                        "Needs Improvement",
                        "Fair",
                        "Good",
                        "Very Good",
                        "Excellent",
                      ],
                    },
                    strengths: {
                      type: "array",
                      minItems: 3,
                      maxItems: 5,
                      items: {
                        type: "string",
                      },
                    },
                    suggestions: {
                      type: "array",
                      minItems: 2,
                      maxItems: 4,
                      items: {
                        type: "string",
                      },
                    },
                  },
                  required: [
                    "score",
                    "rating",
                    "strengths",
                    "suggestions",
                  ],
                },
              },
              required: [
                "bullets",
                "atsAnalysis",
              ],
            },
          },
        },
      });

    const output = response.output_text.trim();

    if (!output) {
      return NextResponse.json(
        {
          error:
            "The AI returned an empty response. Please try again.",
        },
        { status: 502 }
      );
    }

    let parsedOutput: unknown;

    try {
      parsedOutput = JSON.parse(output);
    } catch {
      console.error(
        "Invalid AI JSON response:",
        output
      );

      return NextResponse.json(
        {
          error:
            "The AI returned invalid JSON. Please try again.",
        },
        { status: 502 }
      );
    }

    if (!isValidGenerateResponse(parsedOutput)) {
      console.error(
        "Invalid AI response structure:",
        parsedOutput
      );

      return NextResponse.json(
        {
          error:
            "The AI response did not contain valid bullets and ATS analysis.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      bullets: parsedOutput.bullets.map(
        (bullet) => bullet.trim()
      ),
      atsAnalysis: {
        score: parsedOutput.atsAnalysis.score,
        rating:
          parsedOutput.atsAnalysis.rating.trim(),
        strengths:
          parsedOutput.atsAnalysis.strengths.map(
            (item) => item.trim()
          ),
        suggestions:
          parsedOutput.atsAnalysis.suggestions.map(
            (item) => item.trim()
          ),
      },
    });
  } catch (error) {
    console.error(
      "Resume generation error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unable to generate resume bullets.";

    return NextResponse.json(
      {
        error: message,
        code: "generation_error",
      },
      { status: 500 }
    );
  }
}