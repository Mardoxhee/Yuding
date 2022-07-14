const Restaurant = require("./../models/restaurantModel");
const APIfeatures = require("./../utils/apiFeatures");

exports.aliasTopRestaurants = (req, res, next) => {
  req.query.limit = "4";
  req.query.sort = "createdAt";
  req.query.fields = "restaurantName,category, country";
  next();
};
exports.createRestaurant = async (req, res) => {
  console.log("raquest data vaues", req.body);
  try {
    const bodies = req.body;
    bodies.account = req.decoded.id;

    const newRestaurant = await Restaurant.create(bodies);
    res.status(201).json({
      status: "Restaurant created successfully",

      newRestaurant,
    });
  } catch (err) {
    res.json({
      status: "failed",
      code: err.code,
      message: err.message,
    });
  }
};

exports.getRestaurantsLength = async (req, res) => {
  try {
    const restaurantsLength = await Restaurant.find();
    res.status(200).json({
      status: "Success",
      numberOfRestuarants: restaurantsLength.length,
      // numberOfPages: restaurants.length / 20,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getAllRestaurants = async (req, res) => {
  try {
    const features = new APIfeatures(Restaurant.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const restaurants = await features.query.populate("category");

    // const restaurants = await features.query;
    // Send response
    res.status(200).json({
      status: "Success",
      numberOfRestuarants: restaurants.length,
      // numberOfPages: restaurants.length / 20,
      restaurants,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getRestaurantByAccount = async (req, res) => {
  try {
    const restaurant = await Restaurant.find({
      account: req.decoded.id,
    }).populate("account", "reservations");

    res.status(200).json({
      status: "success",

      restaurant,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getRestaurantByCategory = async (req, res) => {
  try {
    const features = new APIfeatures(Restaurant.find(), req.query).filter();
    const restaurants = await features.query.populate("category");
    res.status(200).json({
      status: "success",
      numberOfRestaurants: restaurants.length,

      restaurants,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getOneRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate([
      "account",
      "category",
    ]);

    res.status(200).json({
      status: "success",

      restaurant,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      statusstatus: "success",
      restaurant,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "restaurant deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "not found",
      message: err.message,
    });
  }
};
