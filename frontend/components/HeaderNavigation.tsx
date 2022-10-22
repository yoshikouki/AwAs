import Link from "next/link";
import useTheme from "../hooks/theme";
import { useRouter } from "next/router";
import { FaHome, FaNewspaper, FaSearch, FaSun, FaMoon } from "react-icons/fa";

const HeaderNavigation = () => {
  const themeCtx = useTheme();
  const router = useRouter();
  const isCurrentPage = (path: string) => router.pathname === path;

  return (
    <>
      <header className="navbar h-10">
        <div className="flex-1">
          <Link href="/">
            <a>
              <h1 className="text-2xl font-bold text-primary">FunCh</h1>
            </a>
          </Link>
        </div>
        <div className="flex-none">
          <button
            className="btn btn-square btn-ghost"
            onClick={themeCtx.toggleTheme}
          >
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

export default HeaderNavigation;
