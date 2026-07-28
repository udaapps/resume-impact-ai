"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-10 w-32 rounded-xl border border-slate-700 bg-slate-900"
        aria-hidden="true"
      />
    );
  }

  return (
    <select
      value={theme ?? "system"}
      onChange={(event) =>
        setTheme(event.target.value)
      }
      aria-label="Select theme"
      className="block h-10 w-32 rounded-xl border border-slate-600 bg-white px-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 dark:bg-slate-900 dark:text-white"
    >
      <option value="light">☀ Light</option>
      <option value="dark">🌙 Dark</option>
      <option value="system">💻 System</option>
    </select>
  );
}