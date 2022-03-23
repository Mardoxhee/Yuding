const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("./../controllers/authController");
const {
  createReservation,
  getAllReservations,
  getOneReservation,
  updateReservation,
  deleteReservation,
  getReservationByAccount,
} = require("./../controllers/reservationController");
// ordinary routes
router.route("/all").get(getAllReservations);
router.route("/").get(getReservationByAccount).post(createReservation);
router
  .route("/:id")
  .get(getOneReservation)
  .patch(updateReservation)
  .delete(deleteReservation);

module.exports = router;
