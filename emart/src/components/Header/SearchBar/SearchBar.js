// src/components/SearchBar/SearchBar.jsx
import React, { useState } from 'react';
import './searchbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);
    onSearch(searchQuery);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log('Search query:', query);
    // Add your search logic here
  };

  return (
    <form className="search-bar-form" onSubmit={handleSearch}>
      <input
        type="text"
        className="search-bar-input"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button type="submit" className="search-bar-button">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
}

export default SearchBar;
