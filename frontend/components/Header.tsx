import Link from "next/link";
import useTheme from "../hooks/theme";
import { FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
  const themeCtx = useTheme();
  const toggleTheme = () => {
    themeCtx.changeTheme(themeCtx.theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <header className="navbar">
        <div className="flex-1">
          <Link href="/">
            <a>
              <h1 className="text-2xl font-bold text-primary">
                FunCh
              </h1>
            </a>
          </Link>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost" onClick={toggleTheme}>
            {themeCtx.theme === "light" ? (
              <FaSun className="h-6 w-6" />
            ) : (
              <FaMoon className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
