import { createHash, randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

type ApiLogMetadata = Record<string, unknown>;

type ApiErrorLogInput = {
  route: string;
  method: string;
  requestId: string;
  statusCode: number;
  error: unknown;
  userId?: string | null;
  metadata?: ApiLogMetadata;
};

type ErrorJsonInput = {
  message: string;
  code: string;
  status: number;
  requestId: string;
};

function sanitizeMessage(value: string): string {
  return value
    .replace(/Bearer\s+[A-Za-z0-9._~+/=-]+/gi, "Bearer [REDACTED]")
    .replace(/sk-[A-Za-z0-9_-]{12,}/g, "sk-[REDACTED]")
    .replace(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, "[JWT_REDACTED]")
    .slice(0, 1000);
}

function userHash(userId?: string | null): string | null {
  if (!userId) {
    return null;
  }

  return createHash("sha256").update(userId).digest("hex").slice(0, 12);
}

function errorDetails(error: unknown) {
  if (error instanceof Error) {
    const candidate = error as Error & { code?: unknown };

    return {
      name: error.name,
      message: sanitizeMessage(error.message || "Unknown error"),
      code:
        typeof candidate.code === "string" ||
        typeof candidate.code === "number"
          ? candidate.code
          : null,
      stack:
        process.env.NODE_ENV === "production"
          ? null
          : sanitizeMessage(error.stack ?? ""),
    };
  }

  return {
    name: "UnknownError",
    message: sanitizeMessage(String(error)),
    code: null,
    stack: null,
  };
}

export function createApiRequestId(request: Request): string {
  const suppliedId = request.headers.get("x-request-id")?.trim();

  if (suppliedId) {
    return suppliedId.slice(0, 128);
  }

  return randomUUID();
}

export function logApiError(input: ApiErrorLogInput): void {
  const payload = {
    timestamp: new Date().toISOString(),
    level: "error",
    event: "api_error",
    service: "resume-impact-ai",
    environment:
      process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown",
    deploymentId: process.env.VERCEL_DEPLOYMENT_ID ?? null,
    commitSha: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 12) ?? null,
    route: input.route,
    method: input.method,
    requestId: input.requestId,
    statusCode: input.statusCode,
    userHash: userHash(input.userId),
    error: errorDetails(input.error),
    metadata: input.metadata ?? null,
  };

  console.error(JSON.stringify(payload));
}

export function errorJson(input: ErrorJsonInput): NextResponse {
  const response = NextResponse.json(
    {
      error: input.message,
      code: input.code,
      requestId: input.requestId,
    },
    {
      status: input.status,
    }
  );

  response.headers.set("x-request-id", input.requestId);
  response.headers.set("Cache-Control", "no-store");

  return response;
}
