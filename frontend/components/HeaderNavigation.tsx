import Link from "next/link";
import useTheme from "../hooks/theme";
import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
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
                <h1 className="text-2xl font-bold text-primary">FunCh</h1>
              </a>
            </Link>
          </div>
          <div className="flex-none">
            {isLoading ? (
              <>Loading</>
            ) : user ? (
              <>
                <Link href="/settings">
                  <a>
                    <FaUserCircle className="h-6 w-6" />
                  </a>
                </Link>
                <Link href="/api/auth/logout">
                  <a>Logout</a>
                </Link>
              </>
            ) : (
              <>
                <Link href="/api/auth/login">
                  <a>Login</a>
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
