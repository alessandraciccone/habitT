import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-amber-200 px-4 py-3 shadow-md w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div
            className="text-xl sm:text-2xl font-bold text-pink-400 font-serif"
            style={{ fontFamily: "Pacifico, cursive" }}
          >
            Piccoli Ritmi
          </div>
          <button
            className="sm:hidden p-2 focus:outline-none ml-2"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 text-pink-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {/* Center: Plant image */}
        <div className="flex justify-center w-full sm:w-auto my-2 sm:my-0">
          <img
            src="/Plant.png"
            alt="Plant"
            className="h-8 w-8 sm:h-12 sm:w-12 mx-2 sm:mx-4"
          />
        </div>
        {/* Right: Nav links */}
        <ul
          className={`flex-col sm:flex-row flex sm:flex space-y-2 sm:space-y-0 sm:space-x-6 items-center justify-center ${
            menuOpen ? "flex" : "hidden"
          } sm:flex`}
        >
          <li>
            <Link
              to="/"
              className="text-orange-300 hover:text-orange-600 transition-colors"
            >
              Registrazione
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-orange-300 hover:text-orange-600 transition-colors"
            >
              Login
            </Link>
          </li>
          <li>
            <a
              href="#habits"
              className="text-orange-300 hover:text-orange-600 transition-colors"
            >
              Abitudini
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
