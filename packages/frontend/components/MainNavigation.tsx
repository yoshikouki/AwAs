"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiCoinStack } from "react-icons/bi";
import { FaHome } from "react-icons/fa";

const navigationItems = [
  {
    title: "Home",
    path: "/",
    icon: <FaHome className="h-6 w-6" />,
  },
  {
    title: "Assets",
    path: "/assets",
    icon: <BiCoinStack className="h-6 w-6" />,
  }
];

const MainNavigation = () => {
  const pathname = usePathname();
  const isCurrentPage = (path: string) => pathname === path;

  return (
    <>
      <div className="btm-nav sm:hidden">
        {navigationItems.map((item, i) => (
          <Link
            href={item.path}
            key={i}
            className={`${isCurrentPage(item.path) && "active"}`}
          >
            {item.icon}
          </Link>
        ))}
      </div>

      <div className="hidden sm:block fixed h-full z-20 lg:w-80 overflow-y-auto">
        <ul className="menu p-0 px-4 mt-12 lg:w-80 text-base-content">
          {navigationItems.map((item, i) => (
            <li key={i}>
              <Link
                href={item.path}
                className={`${isCurrentPage(item.path) && "active"}`}
              >
                {item.icon}
                <span className="hidden lg:inline">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MainNavigation;
