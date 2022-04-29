const mongoose = require("mongoose");
const validator = require("validator");

const reservationSchema = new mongoose.Schema({
  nomduClient: {
    type: String,
    required: [true, "provide your nama please"],
  },
  prenomClient: {
    type: String,
    required: [true, "provide your lastname please"],
  },
  emailClient: {
    type: String,
    validate: [validator.isEmail, "please provide a valid mail"],
  },
  phoneNumber: {
    type: String,
    required: [true, "provide your phone number"],
  },
  date: {
    type: Date,
    required: [true, "must have a date"],
  },
  time: {
    type: Date,
    required: [true, "precise time"],
  },

  nbrePlaces: {
    type: Number,
    required: [true, " precise the number of places that must be reserved"],
  },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  meal: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meal" }],
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
