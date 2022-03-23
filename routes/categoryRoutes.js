const express = require("express");
const router = express.Router();

const {
  createCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} = require("../controllers/categoryController");

router.route("/").get(getAllCategories).post(createCategory);
router
  .route("/:id")
  .get(getOneCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;
