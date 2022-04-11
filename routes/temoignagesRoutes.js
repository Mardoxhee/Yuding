const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("./../controllers/authController");
const {
  createTemoignage,
  getAllTemoignages,
  getOneTemoignage,
  updateTemoignage,
  deleteTemoignage,
  getTemoignageByAccount,
} = require("./../controllers/temoignageController");
// ordinary routes

router
  .route("/")
  .get(getAllTemoignages)
  .get(getTemoignageByAccount)
  .post(createTemoignage);
router
  .route("/:id")
  .get(getOneTemoignage)
  .patch(updateTemoignage)
  .delete(deleteTemoignage);

module.exports = router;
