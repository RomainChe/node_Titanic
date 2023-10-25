import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ onSearch }) => {
  const [filters, setFilters] = useState({ gender: '', age: '', class: '' });

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:8000/statistics', filters); // Assurez-vous que l'URL correspond à votre route
      onSearch(response.data); // Appel de la fonction onSearch pour passer les résultats à la page de résultats
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
    }
  };

  return (
    <div>
      <h1>Recherche des survivants du Titanic</h1>
      <div>
        <label>Sexe : </label>
        <input
          type="text"
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
        />
      </div>
      <div>
        <label>Âge : </label>
        <input
          type="text"
          value={filters.age}
          onChange={(e) => setFilters({ ...filters, age: e.target.value })}
        />
      </div>
      <div>
        <label>Classe : </label>
        <input
          type="text"
          value={filters.class}
          onChange={(e) => setFilters({ ...filters, class: e.target.value })}
        />
      </div>
      <button onClick={handleSearch}>Analyser</button>
    </div>
  );
};

export default Search;
