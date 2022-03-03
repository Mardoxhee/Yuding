const Meal = require("./../models/mealModel");
const APIfeatures = require("./../utils/apiFeatures");

exports.createMeal = async (req, res) => {
  try {
    const newMeal = await Meal.create(req.body);
    res.status(201).json({
      status: "meal created successfully",
      data: {
        newMeal,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      code: err.code,
      message: err.code,
    });
  }
};

exports.getAllMeals = async (req, res) => {
  try {
    const features = new APIfeatures(Meal.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const meals = await features.query;

    // const meal = await features.query;
    // Send response
    res.status(200).json({
      status: "Success",
      numberOfMeals: Meal.length,
      data: {
        meals,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getMealByAccount = async (req, res) => {
  try {
    const meal = await Meal.find({
      account: req.decoded.id,
    }).populate("account");
    res.status(200).json({
      status: "success",
      data: {
        meal,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getOneMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate("restaurant");
    res.status(200).json({
      status: "success",
      data: {
        meal,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      statusstatus: "success",
      data: {
        meal,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.deleteMeal = async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "meal deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "not found",
      message: err.message,
    });
  }
};
