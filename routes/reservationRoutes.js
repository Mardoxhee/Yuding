const express = require("express");
const router = express.Router();

const {
  createReservation,
  getAllReservations,
  getOneReservation,
  updateReservation,
  deleteReservation,
  getReservationByRestaurant,
} = require("./../controllers/reservationController");
// ordinary routes

router
  .route("/")
  .get(getAllReservations)
  .get(protect, getReservationByRestaurant)
  .post(protect, createReservation);
router
  .route("/:id")
  .get(protect, getOneReservation)
  .patch(protect, updateReservation)
  .delete(protect, deleteReservation);
