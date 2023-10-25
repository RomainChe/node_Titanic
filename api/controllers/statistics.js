const Passenger = require('../models/passengerModel.js')

const getStatistics = async (req, res) => {
  const { gender, age, passengerClass } = req.body;

  const query = {}; 

  if (gender) {
    query.Sex = gender;
  }
  if (age) {
    query.Age = parseFloat(age); 
  }
  if (passengerClass) {
    query.Pclass = parseInt(passengerClass); 
  }

  try {
    const statistics = await Passenger.find(query);
    res.json(statistics);
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur est survenue lors du rendu.");
  }
};

module.exports = { getStatistics };
