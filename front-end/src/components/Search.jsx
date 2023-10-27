import React from 'react';
import axios from 'axios';
import { mean, std } from 'mathjs';

const Search = ({ onSearch, setFilters, filters, handleAverageUpdate, handleStdDeviationUpdate }) => {
  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:8000/statistics', filters);
      onSearch(response.data);

      const ageValues = response.data
      .map((passenger) => passenger.Age)
      .filter((age) => age != null);
      const averageAge = mean(ageValues);
      const stdDeviationAge = std(ageValues);

      handleAverageUpdate(averageAge);
      handleStdDeviationUpdate(stdDeviationAge);
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
    }
  };

  return (
    <div class="search-container">
      <div class="search-form-container">
        <h1 class="search-heading">Recherche des survivants du Titanic</h1>
        <div class="search-form-group">
          <label for="search-gender">Sexe :</label>
          <input
            type="text"
            class="search-form-control"
            id="search-gender"
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          />
        </div>
        <div class="search-form-group">
          <label for="search-age">Âge :</label>
          <input
            type="text"
            class="search-form-control"
            id="search-age"
            value={filters.age}
            onChange={(e) => setFilters({ ...filters, age: e.target.value })}
          />
        </div>
        <div class="search-form-group">
          <label for="search-class">Classe :</label>
          <input
            type="text"
            class="search-form-control"
            id="search-class"
            value={filters.class}
            onChange={(e) => setFilters({ ...filters, class: e.target.value })}
          />
        </div>
        <button onClick={handleSearch} class="search-button">Analyser</button>
      </div>
    </div>
  );
};

export default Search;
