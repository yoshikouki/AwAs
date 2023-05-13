"use client";

import { FaMoon, FaSun } from "react-icons/fa";

import useTheme from "../hooks/theme";

export default function ThemeToggleButton() {
  const themeCtx = useTheme();
  return (
    <button
      onClick={themeCtx.toggleTheme}
      className="btn-ghost btn-square btn"
      type="button"
    >
      {themeCtx.theme === "light" ? (
        <FaSun className="h-6 w-6" />
      ) : (
        <FaMoon className="h-6 w-6" />
      )}
    </button>
  );
}
