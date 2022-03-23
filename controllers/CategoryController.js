const Category = require("./../models/categoryModel");
const APIfeatures = require("./../utils/apiFeatures");

exports.aliasTopCategories = (req, res, next) => {
  req.query.limit = "4";
  req.query.sort = "createdAt";
  req.query.fields = "categoryName";
  next();
};

exports.createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json({
      status: "Category created successfully",
      data: {
        newCategory,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      code: err.code,
      message:
        err.code === 11000
          ? "two Categories can not have the same name "
          : err.message,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const features = new APIfeatures(Category.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const categories = await features.query;

    // const Categorys = await features.query;
    // Send response
    res.status(200).json({
      status: "Success",
      numberOfCategories: categories.length,
      data: {
        categories,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getOneCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate([
      "restaurants",
    ]);
    res.status(200).json({
      numberOfRestaurants: restaurant.length,
      status: "success",
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const Category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      statusstatus: "success",
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Category deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "not found",
      message: err.message,
    });
  }
};
