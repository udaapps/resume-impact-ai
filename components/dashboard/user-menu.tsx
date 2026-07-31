"use client";

import {
  ChevronDown,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

import {
  createClient,
} from "@/lib/supabase/client";

type UserMenuProps = {
  name: string;
  email: string;
};

function createInitials(
  name: string,
  email: string
): string {
  const normalizedName =
    name.trim();

  if (normalizedName) {
    const words =
      normalizedName
        .split(/\s+/)
        .filter(Boolean);

    return words
      .slice(0, 2)
      .map((word) =>
        word.charAt(0).toUpperCase()
      )
      .join("");
  }

  return (
    email
      .trim()
      .charAt(0)
      .toUpperCase() || "U"
  );
}

export default function UserMenu({
  name,
  email,
}: UserMenuProps) {
  const router = useRouter();

  const menuRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const [
    isSigningOut,
    setIsSigningOut,
  ] = useState(false);

  const initials =
    createInitials(name, email);

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  async function handleSignOut() {
    setIsSigningOut(true);

    try {
      const supabase =
        createClient();

      const {
        error,
      } =
        await supabase.auth.signOut({
          scope: "local",
        });

      if (error) {
        throw error;
      }

      toast.success(
        "Signed out successfully."
      );

      setIsOpen(false);

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error(
        "Sign-out error:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Unable to sign out.";

      toast.error(message);
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <button
        type="button"
        onClick={() =>
          setIsOpen(
            (current) => !current
          )
        }
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 p-1.5 pr-2 text-left transition hover:border-slate-600"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold text-white">
          {initials}
        </span>

        <span className="hidden min-w-0 xl:block">
          <span className="block max-w-[150px] truncate text-sm font-semibold text-white">
            {name}
          </span>

          <span className="block max-w-[150px] truncate text-xs text-slate-500">
            {email}
          </span>
        </span>

        <ChevronDown
          aria-hidden
          className={`hidden h-4 w-4 text-slate-500 transition xl:block ${
            isOpen
              ? "rotate-180"
              : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-72 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/40"
        >
          <div className="border-b border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-bold text-white">
                {initials}
              </span>

              <div className="min-w-0">
                <p className="truncate font-bold text-white">
                  {name}
                </p>

                <p className="mt-1 truncate text-xs text-slate-500">
                  {email}
                </p>
              </div>
            </div>
          </div>

          <div className="p-2">
            <Link
              href="/dashboard/settings"
              role="menuitem"
              onClick={() =>
                setIsOpen(false)
              }
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <Settings
                aria-hidden
                className="h-4 w-4"
              />

              Account Settings
            </Link>

            <Link
              href="/dashboard"
              role="menuitem"
              onClick={() =>
                setIsOpen(false)
              }
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <UserRound
                aria-hidden
                className="h-4 w-4"
              />

              My Dashboard
            </Link>
          </div>

          <div className="border-t border-slate-800 p-2">
            <button
              type="button"
              role="menuitem"
              onClick={
                handleSignOut
              }
              disabled={
                isSigningOut
              }
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut
                aria-hidden
                className="h-4 w-4"
              />

              {isSigningOut
                ? "Signing out..."
                : "Sign Out"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}