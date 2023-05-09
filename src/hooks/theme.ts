import { createContext, useContext } from "react";

export interface ThemeContextType {
  theme: "light" | "dark";
  changeTheme: (theme: this["theme"]) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeTheme: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
});

const useTheme = () => useContext(ThemeContext);
export default useTheme;
