import { createContext, useContext } from "react"

export interface ThemeContextType {
    theme: "light" | "dark"
    changeTheme: (theme: this["theme"]) => void
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    changeTheme: (theme) => {},
});

const useTheme = () => useContext(ThemeContext);
export default useTheme
