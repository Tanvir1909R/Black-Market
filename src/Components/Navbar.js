import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authProvider } from "../contexts/UserContext";

const Navbar = () => {
  const { user, LogOut } = useContext(authProvider);
  const handleLogOut = () => {
    LogOut().then(() => {});
  };
  const menu = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
      {user?.email ? (
        <>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <button
              className="btn text-white rounded-lg"
              onClick={handleLogOut}
            >
              LogOut
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );
  return (
    <div className="p-1">
      <div className="navbar Container">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menu}
            </ul>
          </div>
          <Link to="/" className="text-3xl bo">
            BlackMarket
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{menu}</ul>
        </div>
        <div className="navbar-end lg:hidden">
        <label
          htmlFor="my-drawer-2"
          className="btn drawer-button lg:hidden"
        >
          D
        </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
