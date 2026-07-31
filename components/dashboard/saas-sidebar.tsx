"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  FileSearch,
  FileText,
  GitCompareArrows,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type SaasSidebarProps = {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

type SidebarItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;
  badge?: string;
};

const PRIMARY_ITEMS: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "ATS Resume Checker",
    href: "/ats-resume-checker",
    icon: FileSearch,
  },
  {
    label: "AI Bullet Rewriter",
    href: "/ats-resume-checker#ats-bullet-rewriter-title",
    icon: Sparkles,
  },
  {
    label: "Resume History",
    href: "/ats-resume-checker#ats-history-title",
    icon: History,
  },
  {
    label: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
  label: "Compare Reports",
  href: "/dashboard/compare",
  icon: GitCompareArrows,
},
];

const SECONDARY_ITEMS: SidebarItem[] = [
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

function isItemActive(
  pathname: string,
  href: string
): boolean {
  const cleanHref = href.split("#")[0];

  if (cleanHref === "/dashboard") {
    return pathname === "/dashboard";
  }

  return pathname.startsWith(cleanHref);
}

function SidebarLink({
  item,
  collapsed,
  onNavigate,
}: {
  item: SidebarItem;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const active = isItemActive(
    pathname,
    item.href
  );

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      className={
        active
          ? "group flex items-center gap-3 rounded-xl border border-blue-500/30 bg-blue-500/15 px-3 py-3 text-blue-100 shadow-sm shadow-blue-950/30 transition"
          : "group flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-slate-400 transition hover:border-slate-700 hover:bg-slate-800/70 hover:text-white"
      }
    >
      <span
        className={
          active
            ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300"
            : "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-slate-500 transition group-hover:text-slate-200"
        }
      >
        <Icon
          aria-hidden
          className="h-5 w-5"
        />
      </span>

      {!collapsed && (
        <>
          <span className="min-w-0 flex-1 truncate text-sm font-semibold">
            {item.label}
          </span>

          {item.badge && (
            <span className="rounded-full border border-slate-700 bg-slate-950 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
}

export default function SaasSidebar({
  mobileOpen = false,
  onMobileClose,
}: SaasSidebarProps) {
  const [collapsed, setCollapsed] =
    useState(false);

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const savedValue =
        window.localStorage.getItem(
          "resume-impact-ai-sidebar-collapsed"
        );

      if (savedValue === "true") {
        setCollapsed(true);
      }
    } catch (error) {
      console.error(
        "Unable to read sidebar preference:",
        error
      );
    }
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    try {
      window.localStorage.setItem(
        "resume-impact-ai-sidebar-collapsed",
        String(collapsed)
      );
    } catch (error) {
      console.error(
        "Unable to save sidebar preference:",
        error
      );
    }
  }, [collapsed, mounted]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        originalOverflow;
    };
  }, [mobileOpen]);

  const sidebarWidthClass =
    useMemo(
      () =>
        collapsed
          ? "lg:w-[88px]"
          : "lg:w-[288px]",
      [collapsed]
    );

  function handleSignOut() {
    window.location.href = "/";
  }

  const sidebarContent = (
    <aside
      className={`flex h-full flex-col border-r border-slate-800 bg-[#08101f] text-white ${sidebarWidthClass}`}
    >
      <div
        className={
          collapsed
            ? "flex h-20 items-center justify-center border-b border-slate-800 px-3"
            : "flex h-20 items-center justify-between border-b border-slate-800 px-5"
        }
      >
        <Link
          href="/dashboard"
          onClick={onMobileClose}
          className="flex min-w-0 items-center gap-3"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-950/40">
            <Sparkles
              aria-hidden
              className="h-5 w-5 text-white"
            />
          </span>

          {!collapsed && (
            <span className="min-w-0">
              <span className="block truncate text-base font-bold tracking-tight text-white">
                Resume Impact AI
              </span>

              <span className="mt-0.5 block truncate text-xs text-slate-500">
                Career optimization suite
              </span>
            </span>
          )}
        </Link>

        <button
          type="button"
          onClick={onMobileClose}
          className="rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-400 transition hover:text-white lg:hidden"
          aria-label="Close sidebar"
        >
          <X
            aria-hidden
            className="h-5 w-5"
          />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <nav
          aria-label="Primary navigation"
          className="space-y-2"
        >
          {!collapsed && (
            <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">
              Workspace
            </p>
          )}

          {PRIMARY_ITEMS.map((item) => (
            <SidebarLink
              key={item.href}
              item={item}
              collapsed={collapsed}
              onNavigate={onMobileClose}
            />
          ))}
        </nav>

        <div className="my-5 border-t border-slate-800" />

        <nav
          aria-label="Secondary navigation"
          className="space-y-2"
        >
          {!collapsed && (
            <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">
              Manage
            </p>
          )}

          {SECONDARY_ITEMS.map((item) => (
            <SidebarLink
              key={item.href}
              item={item}
              collapsed={collapsed}
              onNavigate={onMobileClose}
            />
          ))}
        </nav>

        {!collapsed && (
          <div className="mt-6 rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 to-blue-500/10 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                <Sparkles
                  aria-hidden
                  className="h-4 w-4"
                />
              </span>

              <div>
                <p className="text-sm font-bold text-white">
                  Premium workspace
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Unlock cloud history, advanced
                  reports, unlimited AI rewrites
                  and resume progress tracking.
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/settings"
              onClick={onMobileClose}
              className="mt-4 block rounded-xl bg-violet-600 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-violet-500"
            >
              View Premium
            </Link>
          </div>
        )}
      </div>

      <div className="border-t border-slate-800 p-3">
        <button
          type="button"
          onClick={handleSignOut}
          title={collapsed ? "Back to home" : undefined}
          className="flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-left text-slate-400 transition hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-300"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900">
            <LogOut
              aria-hidden
              className="h-5 w-5"
            />
          </span>

          {!collapsed && (
            <span className="text-sm font-semibold">
              Back to Home
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() =>
            setCollapsed(
              (current) => !current
            )
          }
          className="mt-2 hidden w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm font-semibold text-slate-400 transition hover:border-blue-500 hover:text-white lg:flex"
          aria-label={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
        >
          {collapsed ? (
            <ChevronRight
              aria-hidden
              className="h-5 w-5"
            />
          ) : (
            <>
              <ChevronLeft
                aria-hidden
                className="h-5 w-5"
              />

              <span>
                Collapse Sidebar
              </span>
            </>
          )}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden h-screen shrink-0 lg:block">
        {sidebarContent}
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <button
            type="button"
            onClick={onMobileClose}
            aria-label="Close navigation overlay"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <div className="relative h-full w-[88%] max-w-[320px] shadow-2xl shadow-black/60">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

export function SaasSidebarMobileButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-blue-500 hover:text-white lg:hidden"
      aria-label="Open navigation menu"
    >
      <Menu
        aria-hidden
        className="h-5 w-5"
      />
    </button>
  );
}