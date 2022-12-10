const express = require("express");
const router = express.Router();
const { protect } = require("./../controllers/authController");
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

router.route("/").get(getAllMeals).post(protect, createMeal);
router.route("/by-account").get(protect, getMealByAccount);
router
  .route("/:id")
  .get(getOneMeal)
  .patch(protect, updateMeal)
  .delete(protect, deleteMeal);

module.exports = router;
