const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("./../controllers/authController");

// juste un petit commentaire pour faire le push

const {
  createRestaurant,
  getAllRestaurants,
  getOneRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantByAccount,
} = require("./../controllers/restaurantController");

// ordinary routes
router.route("/all").get(getAllRestaurants);
router
  .route("/")
  .get(protect, getRestaurantByAccount)
  .post(protect, createRestaurant);
router
  .route("/:id")
  .get(getOneRestaurant)
  .patch(protect, updateRestaurant)
  .delete(protect, deleteRestaurant);

module.exports = router;
