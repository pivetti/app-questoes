"use client";

import { useEffect, useState } from "react";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo noturno"}
      title={isDark ? "Modo claro" : "Modo noturno"}
      className={`h-10 rounded-md border border-slate-300 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 ${
        compact ? "w-10 px-0" : "px-4"
      }`}
    >
      {compact ? (isDark ? "C" : "E") : isDark ? "Claro" : "Escuro"}
    </button>
  );
}
