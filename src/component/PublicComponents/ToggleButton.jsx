'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
    >
      {isDark ? (
        <>
          <FaSun />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <FaMoon />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
}