import { FaCog, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

import Link from "next/link";

interface Props {
  logout: () => void;
}

const HeaderProfile = ({ logout }: Props) => {
  return (
    <>
      <div className="dropdown dropdown-end dropdown-hover">
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
