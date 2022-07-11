const mongoose = require("mongoose");
const validator = require("validator");

const mealSchema = new mongoose.Schema({
  title: {
    unique: true,
    type: String,
    required: [true, "a Meal has imperatuvely a name"],
  },
  description: {
    type: String,
    required: [true, "a brief description of the Meal "],
  },
  price: { type: Number, required: [true, "put a minimal price"] },
  mealType: {
    type: Array,
    Enum: ["Entree ", "Repas principal", "dessert", "offres special"],
    default: "Repas principal",
  },
  status: { type: Boolean, default: false },
  account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  reservation: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
});

const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;
