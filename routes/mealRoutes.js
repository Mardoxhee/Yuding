const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("./../controllers/authController");
const {
  createMeal,
  getAllMeals,
  getOneMeal,
  updateMeal,
  deleteMeal,
  getMealByAccount,
} = require("./../controllers/mealController");
// ordinary routes

router.route("/").get(getAllMeals).get(getMealByAccount).post(createMeal);
router.route("/:id").get(getOneMeal).patch(updateMeal).delete(deleteMeal);

module.exports = router;
