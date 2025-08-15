// FILE: src/components/SearchBar.js

import React from 'react';
import './SearchBar.css'; // Import the new CSS file

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  // Use the new CSS classes
  <div className="search-bar-container">
    <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input
      type="text"
      placeholder="Search for medicines..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="search-input" // Use the new CSS class
    />
  </div>
);

export default SearchBar;