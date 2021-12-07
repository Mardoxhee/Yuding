const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require("./../controllers/authController");

const {
  getAllAccounts,
  createAccount,
  getAccount,
  updateAccount,
  deleteAccount,
} = require("./../controllers/acccountController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.route("/").get(getAllAccounts).post(createAccount);
router.patch("/resetPassword/:token", resetPassword);
router.route("/:id").get(getAccount).patch(updateAccount).delete(deleteAccount);

module.exports = router;
