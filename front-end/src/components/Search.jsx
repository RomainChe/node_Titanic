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
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="text-center p-4 rounded shadow">
        <h1 className="mb-4">Recherche des survivants du Titanic</h1>
        <div className="form-group mb-3">
          <label htmlFor="gender">Sexe :</label>
          <input
            type="text"
            className="form-control"
            id="gender"
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="age">Âge :</label>
          <input
            type="text"
            className="form-control"
            id="age"
            value={filters.age}
            onChange={(e) => setFilters({ ...filters, age: e.target.value })}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="class">Classe :</label>
          <input
            type="text"
            className="form-control"
            id="class"
            value={filters.class}
            onChange={(e) => setFilters({ ...filters, class: e.target.value })}
          />
        </div>
        <button onClick={handleSearch} className="btn btn-primary mt-3">Analyser</button>
      </div>
    </div>
  );
};

export default Search;
