import Link from "next/link";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { ThemeContext, ThemeContextType } from "../hooks/theme";

interface Props {
  children: ReactNode;
}

const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<ThemeContextType["theme"]>("light");
  const changeTheme = (theme: ThemeContextType["theme"]) => setTheme(theme);

  const reflectDocument = useCallback((th: ThemeContextType["theme"]) => {
    th === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, []);

  useEffect(() => {
    reflectDocument(theme);
  }, [theme, reflectDocument]);
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
