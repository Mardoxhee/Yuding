const express = require("express");
const router = express.Router();
const { protect } = require("./../controllers/authController");

const {
  createRestaurant,
  getAllRestaurants,
  getOneRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantByAccount,
  getRestaurantByCategory,
  getRestaurantsLength,
} = require("./../controllers/restaurantController");

// ordinary routes
router.route("/").get(getAllRestaurants);
router.route("/").post(protect, createRestaurant);
router.route("/length").get(getRestaurantsLength);
router.route("/by-account").get(protect, getRestaurantByAccount);
router.route("/by-category/").get(getRestaurantByCategory);

router
  .route("/:id")
  .get(getOneRestaurant)
  .patch(protect, updateRestaurant)
  .delete(protect, deleteRestaurant);

module.exports = router;
