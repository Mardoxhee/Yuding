const express = require("express");
const router = express.Router();
const { protect } = require("./../controllers/authController");

const {
  createCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} = require("./../controllers/categoryController");

router.route("/").get(getAllCategories).post(protect, createCategory);
router
  .route("/:id")
  .get(getOneCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;
