"use client";

import { FaCog, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

import Link from "next/link";
import { useAuth } from "../hooks/auth";

const HeaderProfile = () => {
  const { status, login, logout } = useAuth();

  const componentByStatus = {
    loading: <div className="btn-disabled btn">Loading</div>,
    authenticated: (
      <div className="dropdown-end dropdown-hover dropdown">
        <label tabIndex={0} className="btn-ghost btn">
          <Link href="/settings">
            <div className="avatar">
              <div className="w-6">
                <FaUserCircle className="h-6 w-6" />
              </div>
            </div>
          </Link>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu w-40 rounded bg-base-100 shadow-md"
        >
          <li>
            <Link href="/settings">
              <FaCog className="h-4 w-4" />
              Settings
            </Link>
          </li>
          <li>
            <button onClick={logout}>
              <FaSignOutAlt className="h-4 w-4" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    ),
    unauthenticated: (
      <button onClick={() => login()} className="btn-ghost btn" type="button">
        Login
      </button>
    ),
  };

  return componentByStatus[status];
};

export default HeaderProfile;
