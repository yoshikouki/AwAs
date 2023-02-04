"use client";

import Link from "next/link";
import { FaCog, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useProfile } from "../hooks/profile";

interface Props {
  logout: () => void;
}

const HeaderProfile = ({ logout }: Props) => {
  const { profile, error, isLoading } = useProfile();
  const displayName = error ? "Error" : (isLoading || !profile) ? "Loading" : profile.name;

  return (
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
        <ul tabIndex={0} className="dropdown-content menu rounded w-40 shadow-md bg-base-100">
          <li className="menu-title py-1">
            <span>{displayName}</span>
          </li>
          <li>
            <Link href="/settings">
              <FaCog className="h-4 w-4" />
              Settings
            </Link>
          </li>
          <li>
            <a onClick={logout}>
              <FaSignOutAlt className="h-4 w-4" />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HeaderProfile;
