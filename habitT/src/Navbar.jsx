import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-amber-200 px-4 py-3 flex justify-between items-center shadow-md">
      <div
        className="text-2xl  text-blackfont-serif"
        style={{ fontFamily: "Pacifico, cursive" }}
      >
        Piccoli Ritmi
      </div>
      <ul className="flex space-x-6">
        <li>
          <a
            href="#registrazione"
            className="text-orange-300 hover:text-orange-600 transition-colors"
          >
            Registrazione
          </a>
        </li>
        <li>
          <a
            href="#login"
            className="text-orange-300 hover:text-orange-600 transition-colors"
          >
            Login
          </a>
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
    </nav>
  );
};

export default Navbar;
