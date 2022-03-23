const mongoose = require("mongoose");
const validator = require("validator");

const categorySchema = new mongoose.Schema({
  categoryName: {
    unique: true,
    type: String,
    required: [true, "a gategory has imperatuvely a name"],
  },
  categoryICone: {
    type: String,
    required: [true, "a category has to have imperatively an icone"],
  },

  restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }],
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
