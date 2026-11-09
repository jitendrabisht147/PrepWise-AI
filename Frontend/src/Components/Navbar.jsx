import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoMdClose } from 'react-icons/io'

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#howitworks' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const closeMenu = () => setIsOpen(false)

  // Switch the navbar style once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu with Escape
  useEffect(() => {
    const onKeyDown = (e) => e.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const solid = scrolled || isOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full border-b transition-all duration-300 ${
        solid
          ? 'border-slate-200 bg-white/90 shadow-sm backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="flex h-20 max-w-[1400px] mx-auto items-center justify-between px-5">
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold text-purple-600 tracking-tight"
        >
          PrepWise-AI
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-10 text-base font-bold" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-slate-700 text-lg hover:text-purple-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Login Button */}
        <div className="hidden lg:flex items-center">
          <Link
            to="/login"
            className="text-base font-semibold bg-black hover:scale-105 transition-all duration-200 text-white px-8 py-2 rounded-lg"
          >
            Login
          </Link>
        </div>

        {/* Hamburger / Close Icon (Mobile & Tablet) */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="lg:hidden text-2xl text-slate-800 p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
        >
          {isOpen ? <IoMdClose className="text-2xl" /> : <RxHamburgerMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        id="mobile-menu"
        className={`lg:hidden w-full overflow-hidden border-t border-slate-100 transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'invisible max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 pt-4 pb-6 text-base font-semibold">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={closeMenu}
                className="block text-slate-700 hover:text-purple-600 py-1 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
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
  )
}

export default Navbar