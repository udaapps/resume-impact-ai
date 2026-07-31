import { NextResponse } from "next/server";

import {
  createClient,
} from "@/lib/supabase/server";

function getSafeRedirectPath(
  value: string | null
): string {
  if (
    value &&
    value.startsWith("/") &&
    !value.startsWith("//")
  ) {
    return value;
  }

  return "/dashboard";
}

export async function GET(
  request: Request
) {
  const requestUrl =
    new URL(request.url);

  const code =
    requestUrl.searchParams.get(
      "code"
    );

  const nextPath =
    getSafeRedirectPath(
      requestUrl.searchParams.get(
        "next"
      )
    );

  const origin =
    requestUrl.origin;

  if (!code) {
    const errorUrl =
      new URL(
        "/login",
        origin
      );

    errorUrl.searchParams.set(
      "error",
      "missing_auth_code"
    );

    return NextResponse.redirect(
      errorUrl
    );
  }

  try {
    const supabase =
      await createClient();

    const {
      error,
    } =
      await supabase.auth
        .exchangeCodeForSession(
          code
        );

    if (error) {
      console.error(
        "Supabase auth callback error:",
        error
      );

      const errorUrl =
        new URL(
          "/login",
          origin
        );

      errorUrl.searchParams.set(
        "error",
        "confirmation_failed"
      );

      return NextResponse.redirect(
        errorUrl
      );
    }

    const successUrl =
      new URL(
        nextPath,
        origin
      );

    successUrl.searchParams.set(
      "confirmed",
      "true"
    );

    return NextResponse.redirect(
      successUrl
    );
  } catch (error) {
    console.error(
      "Unexpected auth callback error:",
      error
    );

    const errorUrl =
      new URL(
        "/login",
        origin
      );

    errorUrl.searchParams.set(
      "error",
      "callback_failed"
    );

    return NextResponse.redirect(
      errorUrl
    );
  }
}