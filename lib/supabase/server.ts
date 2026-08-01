import {
  createServerClient,
} from "@supabase/ssr";

import {
  cookies,
} from "next/headers";

function getSupabaseServerConfig() {
  const supabaseUrl =
    process.env
      .NEXT_PUBLIC_SUPABASE_URL;

  const supabasePublishableKey =
    process.env
      .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL environment variable."
    );
  }

  if (!supabasePublishableKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY environment variable."
    );
  }

  return {
    supabaseUrl,
    supabasePublishableKey,
  };
}

export async function createClient() {
  const cookieStore =
    await cookies();

  const {
    supabaseUrl,
    supabasePublishableKey,
  } = getSupabaseServerConfig();

  return createServerClient(
    supabaseUrl,
    supabasePublishableKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(
              ({
                name,
                value,
                options,
              }) => {
                cookieStore.set(
                  name,
                  value,
                  options
                );
              }
            );
          } catch {
            /*
             * Cookie updates may be unavailable
             * in read-only Server Components.
             * Route Handlers can normally write them.
             */
          }
        },
      },
    }
  );
}