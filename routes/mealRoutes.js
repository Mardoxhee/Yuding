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
  getmealByRestaurant,
} = require("./../controllers/mealController");
// ordinary routes

router
  .route("/")
  .get(getAllMeals)
  .get(protect, getMealByAccount)
  .post(protect, createMeal);
router
  .route("/:id")
  .get(getOneMeal)
  .patch(protect, updateMeal)
  .delete(protect, deleteMeal);

module.exports = router;
