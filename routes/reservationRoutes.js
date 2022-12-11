const express = require("express");
const router = express.Router();
const { protect } = require("./../controllers/authController");

const {
  createReservation,
  getAllReservations,
  getOneReservation,
  updateReservation,
  deleteReservation,
  getReservationByAccount,
} = require("./../controllers/reservationController");
// ordinary routes
router.route("/all/").get(getAllReservations);
router.route("/").post(createReservation);
router.route("/by-account").get(protect, getReservationByAccount);

router
  .route("/:id")
  .get(getOneReservation)
  .patch(updateReservation)
  .delete(deleteReservation);

module.exports = router;
