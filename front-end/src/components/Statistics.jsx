import React, { useState } from 'react';
import axios from 'axios';
import Search from './Search';
import Results from './Results.jsx';

const Statistics = () => {
  const [filters, setFilters] = useState({ gender: '', age: '', class: '' });
  const [searchResults, setSearchResults] = useState(null);
  const [average, setAverage] = useState(0);
  const [stdDeviation, setStdDeviation] = useState(0);

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
    setAverage(0);
    setStdDeviation(0);
  };

  const handleAverageUpdate = (newAverage) => {
    setAverage(newAverage);
  };

  const handleStdDeviationUpdate = (newStdDeviation) => {
    setStdDeviation(newStdDeviation);
  };

  return (
    <div>
      <div>
        {searchResults ? (
          <Results average={average} stdDeviation={stdDeviation} results={searchResults} onReset={handleReset} filters={filters}/>
        ) : (
          <Search onSearch={handleSearch} setFilters={setFilters} filters={filters} handleAverageUpdate={handleAverageUpdate} handleStdDeviationUpdate={handleStdDeviationUpdate} />
        )}
      </div>
    </div>
  );
};

export default Statistics;
