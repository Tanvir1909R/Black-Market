import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { authProvider } from "../contexts/UserContext";
import { FaMobileAlt } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { BiLogOut, BiLogIn } from "react-icons/bi";

const Navbar = () => {
  const { user, LogOut } = useContext(authProvider);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    LogOut().then(() => {});
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="Container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div
              className={`p-2 rounded-xl transition-all duration-300 ${
                isScrolled
                  ? "bg-orange-500 text-white"
                  : "bg-orange-500/10 text-orange-500"
              } group-hover:bg-orange-500 group-hover:text-white`}
            >
              <FaMobileAlt className="text-xl" />
            </div>
            <span
              className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? "text-gray-800" : "text-gray-800"
              }`}
            >
              Phone<span className="text-orange-500">Market</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user?.email ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                    location.pathname.includes("/dashboard")
                      ? "bg-orange-500 text-white"
                      : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                  }`}
                >
                  <MdDashboard />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogOut}
                  className="ml-2 px-5 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
                >
                  <BiLogOut />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="ml-2 px-5 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-all duration-300 flex items-center gap-2"
              >
                <BiLogIn />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Dashboard Drawer Toggle - Only on dashboard pages */}
            {location.pathname.includes("/dashboard") && (
              <label
                htmlFor="my-drawer-2"
                className="p-2 bg-orange-500 text-white rounded-lg cursor-pointer hover:bg-orange-600 transition-colors"
              >
                <MdDashboard className="text-xl" />
              </label>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                mobileMenuOpen
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {mobileMenuOpen ? (
                <HiX className="text-2xl" />
              ) : (
                <HiMenuAlt3 className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-96 mt-4" : "max-h-0"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user?.email ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    location.pathname.includes("/dashboard")
                      ? "bg-orange-500 text-white"
                      : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <BiLogOut />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 bg-orange-500 text-white rounded-xl font-medium text-center hover:bg-orange-600 transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
