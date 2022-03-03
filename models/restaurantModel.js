const mongoose = require("mongoose");
const validator = require("validator");

const restaurantSchema = new mongoose.Schema({
  restaurantName: {
    unique: true,
    type: String,
    required: [true, "a restaurant has imperatuvely a name"],
  },
  coverPicture: {
    type: String,
    required: [true, "must have one cover picture"],
  },
  description: {
    type: String,
    required: [true, "a brief description of the restaurant "],
  },
  openTime: {
    type: Date,
    // required: [true, "mention this"],
  },
  closeTime: {
    type: Date,
    // required: [true, "mention this"],
  },
  adress: {
    type: [
      {
        street: { type: String },
        number: { type: Number },
        township: { type: String },
        quater: { type: String },
        reference: { type: String },
      },
    ],
  },
  nbrPlaces: {
    type: Number,
    required: [true, "must put this information"],
  },
  category: {
    type: String,
    default: "classic",
    enum: [
      "cafeteria",
      "steak-house",
      "sandwicherie",
      "classic",
      "vegetarien",
      "diétetiques",
      "fast-food",
      "snack",
      "hamburgerie",
    ],
  },
  map: { type: String },
  pictures: { type: String },
  account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  reservation: { type: mongoose.Schema.Types.ObjectId, ref: "Reservation" },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
