const mongoose = require("mongoose");
const validator = require("validator");

const restaurantSchema = new mongoose.Schema({
  restaurantName: {
    unique: true,
    type: String,
    required: [true, "a restaurant has imperatuvely a name"],
  },
  image: {
    type: String,
    // required: [true, "must have a picture to bring front"],
  },
  coverPicture: {
    type: String,
    // required: [true, "must have one cover picture"],
  },
  description: {
    type: String,
    required: [true, "a brief description of the restaurant "],
  },
  menuDescription: {
    type: String,
    required: [
      true,
      "a brief description of the menu you propose is important ",
    ],
  },
  openTime: {
    type: Date,
    required: [true, "mention this"],
  },
  closeTime: {
    type: Date,
    required: [true, "mention this"],
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
  pays: {
    type: String,
    defaultValue: "mixte",
  },
  prixMoyen: { type: Number, required: [true, "must put this information"] },
  reduction: {
    type: Number,
    defaultValue: 20,
  },

  isRecommanded: { type: Boolean, default: false },
  map: { type: String },
  pictures: { type: String },
  account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  reservation: { type: mongoose.Schema.Types.ObjectId, ref: "Reservation" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
