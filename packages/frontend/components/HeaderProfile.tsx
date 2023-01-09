"use client";

import Link from "next/link";
import { FaCog, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useRestGet } from "../hooks/rest-api";
import { ProfileResponse } from "../types/api";

interface Props {
  logout: () => void;
}

const HeaderProfile = ({ logout }: Props) => {
  const { data: profile } = useRestGet<ProfileResponse>("/v1/profile", true);

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
            <span>{profile?.name || "(no name)"}</span>
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
