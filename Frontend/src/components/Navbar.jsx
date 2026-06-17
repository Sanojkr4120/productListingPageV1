import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import SearchBar from './SearchBar';

const Navbar = ({ cartCount, onCartClick, onSearchChange }) => {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tighter">
              SSK<span className="text-blue-600">BYTES</span>
            </h1>
          </div>

          {/* Desktop Search Bar - Hidden on mobile, shown on md+ */}
          <div className="hidden md:flex flex-1 justify-center max-w-lg">
            <SearchBar onSearchChange={onSearchChange} />
          </div>

          {/* Cart & Desktop Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={onCartClick}
              className="relative p-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all group"
            >
              <FiShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm animate-fade-in animate-zoom-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Exclusive to Mobile layout, shown below main row */}
        <div className="md:hidden pb-4">
          <SearchBar onSearchChange={onSearchChange} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
