import HeaderProfile from "./HeaderProfile";
import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";

const HeaderNavigation = () => {
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
            <HeaderProfile />
            <ThemeToggleButton />
          </div>
        </header>
      </div>
    </>
  );
};

export default HeaderNavigation;
