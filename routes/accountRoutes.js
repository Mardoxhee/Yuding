const express = require("express");
const { protect } = require("./../controllers/authController");
const router = express.Router();
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require("./../controllers/authController");

const {
  getAllAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
} = require("./../controllers/acccountController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.route("/").get(protect, getAllAccounts);
router.patch("/resetPassword/:token", resetPassword);
router.route("/:id").get(getAccount).patch(updateAccount).delete(deleteAccount);

module.exports = router;
