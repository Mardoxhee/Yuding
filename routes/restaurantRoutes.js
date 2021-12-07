const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("./../controllers/authController");

const {
  createRestaurant,
  getAllRestaurants,
  getOneRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getTopRestaurants,
} = require("./../controllers/RestaurantController");

// ordinary routes

router.route("/").get(getAllRestaurants).post(createRestaurant);
router
  .route("/:id")
  .get(getOneRestaurant)
  .patch(updateRestaurant)
  .delete(protect, deleteRestaurant);

module.exports = router;
