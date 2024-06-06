import React, { useState } from "react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto flex justify-between items-center py-4">
        <a href="#" className="text-white text-xl font-bold">
          Brand
        </a>
        <div
          className={
            "md:flex md:items-center" + (showMenu ? " block" : " hidden")
          }
        >
          <a href="/" className="text-gray-300 mx-4 hover:text-white">
            Home
          </a>
          <a href="/about" className="text-gray-300 mx-4 hover:text-white">
            About
          </a>
          <a href="#" className="text-gray-300 mx-4 hover:text-white">
            Services
          </a>
          <a href="#" className="text-gray-300 mx-4 hover:text-white">
            Contact
          </a>
        </div>
        <div className="md:hidden">
          {/* Mobile menu button */}
          <button
            className="text-gray-300 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {showMenu ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              )}
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
