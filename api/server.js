const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const csv = require('csv-parser');
const mongoose = require("mongoose");
const Passenger = require('./models/passengerModel.js');

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV, MONGODB_URI, SECRET_KEY } = process.env;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.locals.pretty = NODE_ENV !== "production";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connexion à MongoDB réussie");
})
.catch((error) => {
  console.error("Erreur de connexion à MongoDB :", error);
});

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

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});