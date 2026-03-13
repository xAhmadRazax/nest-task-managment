import React from "react";
import { Link } from "react-router";

const NavLinks = () => {
  return (
    <nav>
      <ul className="flex gap-6">
        <li>
          <Link
            to="/login"
            className="text-emerald-800 hover:text-emerald-900 transition-all font-medium"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="bg-white/10 border border-white/20 backdrop:md text-emerald-800 hover:bg-white/20 px-4 py-2 transition-all rounded-3xl font-medium"
          >
            Take control of your day
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavLinks;
