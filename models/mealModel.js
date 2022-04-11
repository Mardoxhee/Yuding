const mongoose = require("mongoose");
const validator = require("validator");

const mealSchema = new mongoose.Schema({
  title: {
    unique: true,
    type: String,
    required: [true, "a Meal has imperatuvely a name"],
  },
  pictures: {
    type: String,
    required: [true, "must have some pictures"],
  },
  description: {
    type: String,
    required: [true, "a brief description of the Meal "],
  },

  mealType: {
    type: Array,
    Enum: ["Entree ", "Repas principal", "dessert", "offres special"],
    default: "Repas principal",
  },

  restaurant: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }],
  reservation: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
});

const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;
