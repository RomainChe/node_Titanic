const getStatistics = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur est survenue lors du rendu.");
  }
};

module.exports = { getStatistics };