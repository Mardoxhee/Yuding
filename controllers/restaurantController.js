const Restaurant = require("./../models/restaurantModel");
const APIfeatures = require("./../utils/apiFeatures");

exports.aliasTopRestaurants = (req, res, next) => {
  req.query.limit = "4";
  req.query.sort = "createdAt";
  req.query.fields = "restaurantName,categorie, country";
  next();
};
exports.createRestaurant = async (req, res) => {
  try {
    const bodies = req.body;
    bodies.account = req.decoded.id;
    console.log("decoded:", req);

    const newRestaurant = await Restaurant.create(bodies);
    res.status(201).json({
      status: "Restaurant created successfully",
      data: {
        newRestaurant,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      code: err.code,
      message:
        err.code === 11000
          ? "two restaurants can not have the same name "
          : err.message,
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
      data: {
        restaurants,
      },
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
    }).populate("account");

    res.status(200).json({
      status: "success",
      data: {
        restaurant,
      },
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
      data: {
        restaurants,
      },
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
      "reservation",
      "account",
    ]);

    res.status(200).json({
      status: "success",
      data: {
        restaurant,
      },
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
      data: {
        restaurant,
      },
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
