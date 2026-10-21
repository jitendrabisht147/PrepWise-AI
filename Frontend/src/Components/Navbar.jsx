import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="  h-20 z-20  top-0 w-full">
      <div className="flex justify-between items-center h-full max-w-[1400px] mx-auto px-5">
        
        {/* Brand Logo */}
        <Link to="/" onClick={closeMenu} className="text-2xl font-bold text-purple-600 tracking-tight">
          PrepWise-AI
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-10 text-base font-bold">
          <a href="#home" className="text-slate-700 text-lg hover:text-purple-600 transition-colors">
            Home
          </a>
          <a href="#features" className="text-slate-700 text-lg hover:text-purple-600 transition-colors">
            Features
          </a>
          <a href="#howitworks" className="text-slate-700 text-lg hover:text-purple-600 transition-colors">
            How it works
          </a>
        </nav>

        {/* Desktop Login Button */}
        <div className="hidden lg:flex  items-center">
          <Link 
            to="/login" 
            className=" text-base font-semibold bg-black hover:scale-105 transition-all duration-200  text-white px-8 py-2 rounded-lg"
          >
           Login
          </Link>
        </div>

        {/* Hamburger / Close Icon (Mobile & Tablet) */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          className="lg:hidden text-2xl text-slate-800 p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
        >
          {isOpen ? <IoMdClose className="text-2xl" /> : <RxHamburgerMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Drawer / Dropdown */}
      <div
        className={`lg:hidden bg-white border-b border-slate-100 shadow-xl w-full transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 pt-4 pb-6 text-base font-semibold">
          <li>
            <a 
              href="#home" 
              onClick={closeMenu}
              className="block text-slate-700 hover:text-purple-600 py-1 transition-colors"
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#features" 
              onClick={closeMenu}
              className="block text-slate-700 hover:text-purple-600 py-1 transition-colors"
            >
              Features
            </a>
          </li>
          <li>
            <a 
              href="#howitworks" 
              onClick={closeMenu}
              className="block text-slate-700 hover:text-purple-600 py-1 transition-colors"
            >
              How it works
            </a>
          </li>
          <li className="pt-2 border-t border-slate-100">
            <Link
              to="/login"
              onClick={closeMenu}
              className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;