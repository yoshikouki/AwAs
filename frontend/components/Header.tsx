import Link from "next/link"
import useTheme from '../hooks/theme';

const Header = () => {
  const themeCtx = useTheme();
  const toggleTheme = () => {
    themeCtx.changeTheme(themeCtx.theme === "light" ? "dark" : "light")
  }

  return (
    <>
      <header className="header">
        <Link href="/">
          <a>
            <h1>
              FunCh
            </h1>
          </a>
        </Link>
        <button onClick={toggleTheme}>Change mode</button>
      </header>
    </>
  )
}

export default Header
