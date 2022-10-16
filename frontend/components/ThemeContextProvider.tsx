import Link from "next/link";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { ThemeContext, ThemeContextType } from "../hooks/theme";

interface Props {
  children: ReactNode;
}

const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<ThemeContextType["theme"]>("light");
  const changeTheme = (theme: ThemeContextType["theme"]) => setTheme(theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.dataset.theme = "halloween"
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.dataset.theme = "cupcake"
    };
  }, [theme]);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
