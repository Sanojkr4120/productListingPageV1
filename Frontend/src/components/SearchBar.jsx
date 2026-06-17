import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ onSearchChange }) => {
  return (
    <div className="relative w-full max-w-md group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
        <FiSearch size={18} />
      </div>
      <input
        type="text"
        placeholder="Search for products..."
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all"
      />
    </div>
  );
};

export default SearchBar;
