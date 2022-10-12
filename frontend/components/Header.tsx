import Link from "next/link"

const Header = () => {
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
      </header>
    </>
  )
}

export default Header
