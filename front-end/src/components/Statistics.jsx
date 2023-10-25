import React, { useState } from 'react';
import axios from 'axios';
import Search from './Search';
import Results from './Results.jsx';

const Statistics = () => {
  const [filters, setFilters] = useState({ gender: '', age: '', class: '' });
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:8000/statistics', filters);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
    }
  };

  const handleReset = () => {
    setSearchResults(null);
    setFilters({ gender: '', age: '', class: '' });
  };

  return (
    <div>
      <div>
        {searchResults ? (
          <Results results={searchResults} onReset={handleReset} />
        ) : (
          <Search onSearch={handleSearch} />
        )}
      </div>
    </div>
  );
};

export default Statistics;
