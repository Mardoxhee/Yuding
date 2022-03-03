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
router.route("/").get(getAllRestaurants);
router.route("/").post(protect, createRestaurant);
router
  .route("/:id")
  .get(protect, getRestaurantByAccount)
  .get(getOneRestaurant)
  .patch(protect, updateRestaurant)
  .delete(protect, deleteRestaurant);

module.exports = router;
