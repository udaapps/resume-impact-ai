import { NextResponse } from "next/server";

import {
  createApiRequestId,
  errorJson,
  logApiError,
} from "@/lib/server/apiLogger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function missingRequiredConfiguration(): string[] {
  const missing: string[] = [];

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    missing.push("NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    missing.push("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  }

  if (
    !process.env.SUPABASE_SECRET_KEY &&
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    missing.push("SUPABASE_SECRET_KEY_OR_SERVICE_ROLE_KEY");
  }

  if (!process.env.OPENAI_API_KEY) {
    missing.push("OPENAI_API_KEY");
  }

  return missing;
}

export async function GET(request: Request) {
  const requestId = createApiRequestId(request);
  const missing = missingRequiredConfiguration();

  if (missing.length > 0) {
    logApiError({
      route: "/api/health",
      method: "GET",
      requestId,
      statusCode: 503,
      error: new Error("Required production configuration is missing."),
      metadata: {
        missingKeys: missing,
      },
    });

    return errorJson({
      message: "Service configuration is incomplete.",
      code: "HEALTH_CONFIG_INCOMPLETE",
      status: 503,
      requestId,
    });
  }

  const response = NextResponse.json({
    status: "ok",
    service: "resume-impact-ai",
    environment:
      process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown",
    version:
      process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 12) ?? "local",
    timestamp: new Date().toISOString(),
    requestId,
  });

  response.headers.set("x-request-id", requestId);
  response.headers.set("Cache-Control", "no-store");

  return response;
}
