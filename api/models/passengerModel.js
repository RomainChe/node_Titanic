const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  PassengerId: Number,
  Survived: Number,
  Pclass: Number,
  Name: String,
  Sex: String,
  Age: Number,
  SibSp: Number,
  Parch: Number,
  Ticket: String,
  Fare: Number,
  Cabin: String,
  Embarked: String,
});

const Passenger = mongoose.model('Passenger', passengerSchema);

module.exports = Passenger;