const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("./../controllers/authController");
const cors = require("cors");

const {
  createRestaurant,
  getAllRestaurants,
  getOneRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantByAccount,
  getRestaurantByCategory,
} = require("./../controllers/restaurantController");

// ordinary routes
router.route("/").get(getAllRestaurants);
router.route("/").post(protect, createRestaurant);
router.route("/by-account").get(protect, getRestaurantByAccount);
router.route("/by-category/").get(getRestaurantByCategory);

router
  .route("/:id")
  .get(getOneRestaurant)
  .patch(protect, restrictTo, updateRestaurant)
  .delete(protect, restrictTo, deleteRestaurant);

module.exports = router;
