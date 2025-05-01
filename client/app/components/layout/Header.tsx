import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { MenuIcon, XIcon, ChevronDownIcon } from 'lucide-react';
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="bg-navy-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
              <img src="https://placehold.co/100x100/002D62/FFFFFF?text=GOV" alt="Government Seal" className="h-8 w-8 rounded-full" />
            </div>
            <div>
              <Link to="/" className="font-bold text-xl">
                Tariff Relief Program
              </Link>
              <div className="text-xs text-gray-300">
                U.S. Department of Commerce
              </div>
            </div>
          </div>
          {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "text-blue-400 py-2" : "hover:text-blue-200 py-2"}
            >
              Home
            </NavLink>
            <NavLink 
              to="/program-information" 
              className={({ isActive }) => isActive ? "text-blue-400 py-2" : "hover:text-blue-200 py-2"}
            >
              Program Info
            </NavLink>
            <NavLink 
              to="/estimate" 
              className={({ isActive }) => isActive ? "text-blue-400 py-2" : "hover:text-blue-200 py-2"}
            >
              Grant Calculator
            </NavLink>
            <NavLink 
              to="/application/individual" 
              className={({ isActive }) => isActive ? "text-blue-400 py-2" : "hover:text-blue-200 py-2"}
            >
              Individual Application
            </NavLink>
            <NavLink 
              to="/application/business" 
              className={({ isActive }) => isActive ? "text-blue-400 py-2" : "hover:text-blue-200 py-2"}
            >
              Business Application
            </NavLink>
            <NavLink 
              to="/faq" 
              className={({ isActive }) => isActive ? "text-blue-400 py-2" : "hover:text-blue-200 py-2"}
            >
              FAQ
            </NavLink>
            <NavLink 
              to="/news" 
              className={({ isActive }) => isActive ? "text-blue-400 py-2" : "hover:text-blue-200 py-2"}
            >
              News
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => isActive ? "text-blue-400 py-2" : "hover:text-blue-200 py-2"}
            >
              Contact
            </NavLink>
            </nav>
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && <nav className="md:hidden mt-4 pb-4 space-y-3">
          <Link to="/" className="block hover:text-blue-200 py-2">
            Home
          </Link>
          <Link to="/program-information" className="block hover:text-blue-200 py-2">
            Program Info
          </Link>
          <Link to="/estimate" className="block hover:text-blue-200 py-2">
            Grant Calculator
          </Link>
          <Link to="/application/individual" className="block hover:text-blue-200 py-2">
            Grant Application for Individuals
          </Link>
          <Link to="/application/business" className="block hover:text-blue-200 py-2">
            Grant Application for SME's
          </Link>
          <Link to="/faq" className="block hover:text-blue-200 py-2">
            FAQ
          </Link>
          <Link to="/news" className="block hover:text-blue-200 py-2">
            News
          </Link>
          <Link to="/contact" className="block hover:text-blue-200 py-2">
            Contact
          </Link>
        </nav>}
      </div>
    </header>
  );
};