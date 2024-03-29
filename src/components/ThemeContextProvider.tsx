"use client";

import { ReactNode, useEffect, useState } from "react";
import { ThemeContext, ThemeContextType } from "../hooks/theme";

interface Props {
  children: ReactNode;
}

const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<ThemeContextType["theme"]>("light");

  const changeTheme = (theme: ThemeContextType["theme"]) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.dataset.theme = "halloween";
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.dataset.theme = "cupcake";
      localStorage.theme = "light";
    }
    setTheme(theme);
  };

  const toggleTheme = () => {
    changeTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const hadPreferenceForDark =
      !("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (localStorage.theme === "dark" || hadPreferenceForDark) {
      changeTheme("dark");
    } else {
      changeTheme("light");
    }
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
