"use client";

import {
  type ReactNode,
  useEffect,
  useState,
} from "react";

import SaasHeader from "@/components/dashboard/saas-header";
import SaasSidebar from "@/components/dashboard/saas-sidebar";

type DashboardUser = {
  name: string;
  email: string;
};

type SaasShellProps = {
  children: ReactNode;

  user?: DashboardUser;

  /*
   * Temporary backward compatibility.
   * Existing pages using userName/userEmail
   * will continue to compile.
   */
  userName?: string;
  userEmail?: string;

  title?: string;
  description?: string;

  contentClassName?: string;
};

const DEFAULT_USER: DashboardUser = {
  name: "Resume Impact User",
  email: "",
};

export default function SaasShell({
  children,

  user,

  userName,
  userEmail,

  contentClassName = "",
}: SaasShellProps) {
  const [
    mobileSidebarOpen,
    setMobileSidebarOpen,
  ] = useState(false);

  const resolvedUser: DashboardUser = {
    name:
      user?.name ||
      userName ||
      DEFAULT_USER.name,

    email:
      user?.email ||
      userEmail ||
      DEFAULT_USER.email,
  };

  useEffect(() => {
    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setMobileSidebarOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        <SaasSidebar
          mobileOpen={
            mobileSidebarOpen
          }
          onMobileClose={() =>
            setMobileSidebarOpen(false)
          }
        />

        <div className="min-w-0 flex-1">
          <SaasHeader
            onOpenSidebar={() =>
              setMobileSidebarOpen(true)
            }
            user={resolvedUser}
          />

          <main
            className={`min-h-[calc(100vh-5rem)] bg-slate-950 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 ${contentClassName}`}
          >
            <div className="mx-auto w-full max-w-[1600px]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}