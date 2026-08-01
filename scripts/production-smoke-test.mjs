#!/usr/bin/env node

const inputUrl = process.argv[2] ?? process.env.TEST_BASE_URL;

if (!inputUrl) {
  console.error(
    "Usage: node scripts/production-smoke-test.mjs https://your-site.vercel.app"
  );
  process.exit(1);
}

const baseUrl = inputUrl.replace(/\/$/, "");
const authCookie = process.env.SMOKE_TEST_COOKIE?.trim();
const failures = [];

async function check({ name, path, expectedStatus, validate, authenticated }) {
  const headers = {
    Accept: "application/json, text/html;q=0.9",
  };

  if (authenticated && authCookie) {
    headers.Cookie = authCookie;
  }

  const startedAt = Date.now();

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "GET",
      headers,
      redirect: "follow",
    });

    const durationMs = Date.now() - startedAt;
    const contentType = response.headers.get("content-type") ?? "";
    const body = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    const statusMatches = response.status === expectedStatus;
    const validationMatches = validate ? validate(body, response) : true;
    const passed = statusMatches && validationMatches;

    console.log(
      `${passed ? "PASS" : "FAIL"}  ${name}  status=${response.status}  ${durationMs}ms`
    );

    if (!passed) {
      failures.push({
        name,
        expectedStatus,
        actualStatus: response.status,
        body:
          typeof body === "string"
            ? body.slice(0, 300)
            : JSON.stringify(body).slice(0, 300),
      });
    }
  } catch (error) {
    console.log(`FAIL  ${name}  request error`);
    failures.push({ name, error: String(error) });
  }
}

await check({
  name: "Public home page",
  path: "/",
  expectedStatus: 200,
});

await check({
  name: "Health endpoint",
  path: "/api/health",
  expectedStatus: 200,
  validate: (body) =>
    typeof body === "object" && body !== null && body.status === "ok",
});

if (authCookie) {
  await check({
    name: "Authenticated analytics status",
    path: "/api/analytics-insights",
    expectedStatus: 200,
    authenticated: true,
    validate: (body) =>
      typeof body === "object" && body !== null && "usage" in body,
  });

  await check({
    name: "Authenticated analytics history",
    path: "/api/analytics-insights/history?page=1&pageSize=5&sort=newest",
    expectedStatus: 200,
    authenticated: true,
    validate: (body) =>
      typeof body === "object" && body !== null && Array.isArray(body.items),
  });
} else {
  await check({
    name: "Analytics API rejects anonymous access",
    path: "/api/analytics-insights",
    expectedStatus: 401,
  });

  await check({
    name: "History API rejects anonymous access",
    path: "/api/analytics-insights/history?page=1&pageSize=5",
    expectedStatus: 401,
  });
}

if (failures.length > 0) {
  console.error("\nProduction smoke test failed:");
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}

console.log("\nAll production smoke tests passed.");
console.log(
  authCookie
    ? "Authenticated API checks were included."
    : "Authenticated generation/export/delete actions still require the manual QA checklist."
);
