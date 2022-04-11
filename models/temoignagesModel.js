const mongoose = require("mongoose");
const validator = require("validator");

const temoignageSchema = new mongoose.Schema({
  role: {
    unique: true,
    type: String,
    required: [true, "a gategory has imperatuvely a name"],
  },
  temoignageContent: {
    type: String,
    required: [true, "Ajouter du contenu pour le temoigange"],
  },

  account: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
});

const Temoignage = mongoose.model("Temoignage", temoignageSchema);
module.exports = Temoignage;
