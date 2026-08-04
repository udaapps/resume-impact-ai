"use client";

import {
  Bell,
  ChevronRight,
  FileSearch,
  Menu,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import {
  FormEvent,
  useMemo,
  useState,
} from "react";

import UserMenu from "@/components/dashboard/user-menu";

type DashboardUser = {
  name: string;
  email: string;
};

type SaasHeaderProps = {
  onOpenSidebar: () => void;

  user?: DashboardUser;
};

type PageDetails = {
  title: string;
  description: string;
  breadcrumbs: string[];
};

const DEFAULT_USER: DashboardUser = {
  name: "Resume Impact User",
  email: "",
};

function getPageDetails(
  pathname: string
): PageDetails {
  if (
    pathname === "/dashboard" ||
    pathname === "/dashboard/"
  ) {
    return {
      title: "Dashboard",
      description:
        "Track ATS performance, recent activity, resume progress, and saved reports.",
      breadcrumbs: ["Dashboard"],
    };
  }

  if (
    pathname.startsWith(
      "/dashboard/analytics"
    )
  ) {
    return {
      title: "Analytics",
      description:
        "Review ATS trends, keyword gaps, score history, and resume improvement activity.",
      breadcrumbs: [
        "Dashboard",
        "Analytics",
      ],
    };
  }

  if (
    pathname.startsWith(
      "/dashboard/reports"
    )
  ) {
    return {
      title: "Reports Center",
      description:
        "Review saved ATS reports and export professional PDF documents.",
      breadcrumbs: [
        "Dashboard",
        "Reports",
      ],
    };
  }

  if (
    pathname.startsWith(
      "/dashboard/compare"
    )
  ) {
    return {
      title: "Compare Reports",
      description:
        "Compare two resume analyses and identify score improvements and remaining gaps.",
      breadcrumbs: [
        "Dashboard",
        "Compare",
      ],
    };
  }

  if (
    pathname.startsWith(
      "/dashboard/settings"
    )
  ) {
    return {
      title: "Settings",
      description:
        "Manage your account, workspace preferences, security, and premium plan.",
      breadcrumbs: [
        "Dashboard",
        "Settings",
      ],
    };
  }

  return {
    title: "Dashboard",
    description:
      "Manage your ResumeClimb AI workspace.",
    breadcrumbs: ["Dashboard"],
  };
}

export default function SaasHeader({
  onOpenSidebar,
  user = DEFAULT_USER,
}: SaasHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [
    searchValue,
    setSearchValue,
  ] = useState("");

  const [
    notificationsOpen,
    setNotificationsOpen,
  ] = useState(false);

  const pageDetails = useMemo(
    () => getPageDetails(pathname),
    [pathname]
  );

  function handleSearch(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const normalizedSearch =
      searchValue
        .trim()
        .toLowerCase();

    if (!normalizedSearch) {
      return;
    }

    if (
      normalizedSearch.includes(
        "analytic"
      )
    ) {
      router.push(
        "/dashboard/analytics"
      );
      return;
    }

    if (
      normalizedSearch.includes(
        "report"
      ) ||
      normalizedSearch.includes(
        "pdf"
      )
    ) {
      router.push(
        "/dashboard/reports"
      );
      return;
    }

    if (
      normalizedSearch.includes(
        "compare"
      )
    ) {
      router.push(
        "/dashboard/compare"
      );
      return;
    }

    if (
      normalizedSearch.includes(
        "setting"
      ) ||
      normalizedSearch.includes(
        "account"
      )
    ) {
      router.push(
        "/dashboard/settings"
      );
      return;
    }

    if (
      normalizedSearch.includes(
        "resume"
      ) ||
      normalizedSearch.includes(
        "ats"
      ) ||
      normalizedSearch.includes(
        "analysis"
      )
    ) {
      router.push(
        "/ats-resume-checker"
      );
      return;
    }

    router.push("/dashboard");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      <div className="flex min-h-20 items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-blue-500 hover:text-white lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu
            aria-hidden
            className="h-5 w-5"
          />
        </button>

        <div className="min-w-0 flex-1">
          <nav
            aria-label="Breadcrumb"
            className="hidden items-center gap-2 text-xs text-slate-500 sm:flex"
          >
            {pageDetails.breadcrumbs.map(
              (
                breadcrumb,
                index
              ) => {
                const isLast =
                  index ===
                  pageDetails
                    .breadcrumbs
                    .length -
                    1;

                return (
                  <div
                    key={`${breadcrumb}-${index}`}
                    className="flex items-center gap-2"
                  >
                    {index > 0 && (
                      <ChevronRight
                        aria-hidden
                        className="h-3.5 w-3.5 text-slate-700"
                      />
                    )}

                    <span
                      className={
                        isLast
                          ? "font-medium text-slate-300"
                          : "text-slate-500"
                      }
                    >
                      {breadcrumb}
                    </span>
                  </div>
                );
              }
            )}
          </nav>

          <div className="mt-1">
            <h1 className="truncate text-lg font-bold tracking-tight text-white sm:text-xl">
              {pageDetails.title}
            </h1>

            <p className="mt-1 hidden truncate text-sm text-slate-500 lg:block">
              {
                pageDetails.description
              }
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSearch}
          className="hidden min-w-0 flex-1 justify-center xl:flex"
        >
          <div className="relative w-full max-w-md">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            />

            <input
              type="search"
              value={searchValue}
              onChange={(event) =>
                setSearchValue(
                  event.target.value
                )
              }
              placeholder="Search tools, reports, analytics..."
              aria-label="Search dashboard"
              className="h-11 w-full rounded-xl border border-slate-800 bg-slate-900 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </form>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/ats-resume-checker"
            className="hidden items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500 md:inline-flex"
          >
            <FileSearch
              aria-hidden
              className="h-4 w-4"
            />

            New Analysis
          </Link>

          <Link
            href="/ats-resume-checker#ats-bullet-rewriter-title"
            title="AI Bullet Rewriter"
            aria-label="Open AI Bullet Rewriter"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-violet-500 hover:text-violet-300"
          >
            <Sparkles
              aria-hidden
              className="h-5 w-5"
            />
          </Link>

          <Link
            href="/dashboard/settings"
            title="Settings"
            aria-label="Open settings"
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-slate-600 hover:text-white sm:inline-flex"
          >
            <Settings
              aria-hidden
              className="h-5 w-5"
            />
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setNotificationsOpen(
                  (current) =>
                    !current
                )
              }
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-slate-600 hover:text-white"
              aria-label="Open notifications"
              aria-expanded={
                notificationsOpen
              }
            >
              <Bell
                aria-hidden
                className="h-5 w-5"
              />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-slate-900" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-72 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/40">
                <div className="border-b border-slate-800 px-4 py-3">
                  <p className="font-bold text-white">
                    Notifications
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Your latest workspace
                    updates
                  </p>
                </div>

                <div className="p-3">
                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3">
                    <p className="text-sm font-semibold text-blue-200">
                      Resume workspace
                      ready
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Run a new ATS
                      analysis to update
                      your reports and
                      analytics.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <UserMenu
            name={
              user.name ||
              "Resume Impact User"
            }
            email={user.email}
          />
        </div>
      </div>
    </header>
  );
}