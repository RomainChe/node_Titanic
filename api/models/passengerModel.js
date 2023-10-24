const mongoose = require('mongoose');
const Passenger = require('./models/passengerModel.js');

const passengerSchema = new mongoose.Schema({
  Pclass: String,
  Survived: String,
  Name: String,
});

const Passenger = mongoose.model('Passenger', passengerSchema);

module.exports = Passenger;