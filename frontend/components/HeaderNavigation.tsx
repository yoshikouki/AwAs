import Link from "next/link";
import useTheme from "../hooks/theme";
import { FaUserCircle, FaSignOutAlt, FaSun, FaMoon } from "react-icons/fa";
import { useUser } from "@auth0/nextjs-auth0";

const HeaderNavigation = () => {
  const themeCtx = useTheme();
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="sticky top-0 z-50 w-full backdrop-blur">
        <header className="navbar h-10 p-4">
          <div className="flex-1">
            <Link href="/">
              <a>
                <div className="text-2xl font-bold text-primary">FunCh</div>
              </a>
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
                      <a>
                        <div className="avatar">
                          <div className="w-6">
                            <FaUserCircle className="h-6 w-6" />
                          </div>
                        </div>
                      </a>
                    </Link>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu shadow rounded-box w-40"
                  >
                    <Link href="/settings">
                      <li>
                        <a>
                          <FaUserCircle className="h-4 w-4" />
                          Settings
                        </a>
                      </li>
                    </Link>
                    <Link href="/api/auth/logout">
                      <li>
                        <a>
                          <FaSignOutAlt className="h-4 w-4" />
                          Logout
                        </a>
                      </li>
                    </Link>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link href="/api/auth/login">
                  <a className="btn btn-ghost">Login</a>
                </Link>
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
