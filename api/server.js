const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const csv = require('csv-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour analyser les données CSV
const data = [];
fs.createReadStream('train.csv')
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');
  });

// Définissez les routes pour afficher les statistiques
app.get('/', (req, res) => {
  res.send('Welcome to the Titanic Passenger Statistics App');
});

// Route pour afficher les statistiques des survivants
app.get('/statistics', (req, res) => {
  // Code pour calculer les statistiques en fonction des critères demandés (sexe, âge, classe)
  // Exemple : Vous pouvez utiliser la méthode `filter` pour filtrer les survivants en fonction de différents critères.

  // Exemple : Filtrer les survivants en fonction de la classe
  const survivorsByClass = {
    firstClass: data.filter((passenger) => passenger.Pclass === '1' && passenger.Survived === '1').length,
    secondClass: data.filter((passenger) => passenger.Pclass === '2' && passenger.Survived === '1').length,
    thirdClass: data.filter((passenger) => passenger.Pclass === '3' && passenger.Survived === '1').length,
  };

  // Exemple : Filtrer les survivants en fonction du sexe
  const survivorsBySex = {
    male: data.filter((passenger) => passenger.Sex === 'male' && passenger.Survived === '1').length,
    female: data.filter((passenger) => passenger.Sex === 'female' && passenger.Survived === '1').length,
  };

  // Exemple : Calculer la moyenne d'âge des survivants
  const survivorsAges = data
    .filter((passenger) => passenger.Survived === '1' && !isNaN(passenger.Age))
    .map((passenger) => parseFloat(passenger.Age));
  const averageAgeOfSurvivors = survivorsAges.reduce((acc, age) => acc + age, 0) / survivorsAges.length;

  // Rendu des statistiques au format JSON
  const statistics = {
    survivorsByClass,
    survivorsBySex,
    averageAgeOfSurvivors,
  };

  res.json(statistics);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});