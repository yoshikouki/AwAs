import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome, FaNewspaper, FaSearch } from "react-icons/fa";

const MainNavigation = () => {
  const router = useRouter();
  const isCurrentPage = (path: string) => router.pathname === path;

  return (
    <>
      <div className="btm-nav">
        <Link href="/">
          <a className={`${isCurrentPage("/") && "active"}`}>
            <FaHome className="h-6 w-6" />
          </a>
        </Link>
        <Link href="/news">
          <a className={`${isCurrentPage("/news") && "active"}`}>
            <FaNewspaper className="h-6 w-6" />
          </a>
        </Link>
        <Link href="/search">
          <a className={`${isCurrentPage("/search") && "active"}`}>
            <FaSearch className="h-6 w-6" />
          </a>
        </Link>
      </div>
    </>
  );
};

export default MainNavigation;
