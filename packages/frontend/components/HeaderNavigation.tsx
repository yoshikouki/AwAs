"use client";

import Link from "next/link";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAuth } from "../hooks/auth";
import useTheme from "../hooks/theme";
import HeaderProfile from "./HeaderProfile";

const HeaderNavigation = () => {
  const themeCtx = useTheme();
  const { isAuthenticated, isLoading, login, logout } = useAuth();

  return (
    <>
      <div className="sticky top-0 z-50 w-full backdrop-blur">
        <header className="navbar h-10 p-4">
          <div className="flex-1">
            <Link href="/">
              <div className="text-2xl font-bold text-primary">AwAs</div>
            </Link>
          </div>
          <div className="flex-none">
            {isLoading ? (
              <div className="btn btn-disabled">Loading</div>
            ) : isAuthenticated ? (
              <HeaderProfile logout={logout} />
            ) : (
              <>
                <a onClick={login} className="btn btn-ghost">
                  Login
                </a>
              </>
            )}
            <button className="btn btn-square btn-ghost" onClick={themeCtx.toggleTheme}>
              {themeCtx.theme === "light" ? (
                <FaSun className="h-6 w-6" />
              ) : (
                <FaMoon className="h-6 w-6" />
              )}
            </button>
          </div>
        </header>
      </div>
    </>
  );
};

export default HeaderNavigation;
