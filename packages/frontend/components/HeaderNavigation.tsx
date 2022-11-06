"use client";

import Link from "next/link";
import { FaMoon, FaSignOutAlt, FaSun, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../hooks/auth";
import useTheme from "../hooks/theme";

const HeaderNavigation = () => {
  const themeCtx = useTheme();
  const { user, isLoading, login, logout } = useAuth();

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
            ) : user ? (
              <>
                <div className="dropdown dropdown-hover dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost">
                    <Link href="/settings">
                      <div className="avatar">
                        <div className="w-6">
                          <FaUserCircle className="h-6 w-6" />
                        </div>
                      </div>
                    </Link>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu shadow rounded-box w-40"
                  >
                    <Link href="/settings">
                      <li>
                        <FaUserCircle className="h-4 w-4" />
                        Settings
                      </li>
                    </Link>
                    <li>
                      <a
                        onClick={logout}
                      >
                        <FaSignOutAlt className="h-4 w-4" />
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <a onClick={login} className="btn btn-ghost">
                  Login
                </a>
              </>
            )}
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
      </div>
    </>
  );
};

export default HeaderNavigation;
