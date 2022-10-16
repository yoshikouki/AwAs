import Link from "next/link";
import useTheme from "../hooks/theme";

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
              <h1>FunCh</h1>
            </a>
          </Link>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost" onClick={toggleTheme}>
            {themeCtx.theme === "light" ? "🌞" : "🌙"}
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
