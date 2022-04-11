const Temoignage = require("./../models/temoignagesModel");
const APIfeatures = require("./../utils/apiFeatures");

exports.createTemoignage = async (req, res) => {
  try {
    const newTemoignage = await Temoignage.create(req.body);
    res.status(201).json({
      status: "temoignage created successfully",
      newTemoignage,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      code: err.code,
      message: err.code,
    });
  }
};

exports.getAllTemoignages = async (req, res) => {
  try {
    const features = new APIfeatures(Temoignage.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const temoignages = await features.query.populate("account");

    // const Temoignage = await features.query;
    // Send response
    res.status(200).json({
      status: "Success",
      numberOfTemoignages: Temoignage.length,
      temoignages,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getTemoignageByAccount = async (req, res) => {
  try {
    const temoignage = await Temoignage.find({
      account: req.decoded.id,
    }).populate("account");
    res.status(200).json({
      status: "success",
      temoignage,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getOneTemoignage = async (req, res) => {
  try {
    const temoignage = await Temoignage.findById(req.params.id).populate(
      "account"
    );
    res.status(200).json({
      status: "success",
      temoignage,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.updateTemoignage = async (req, res) => {
  try {
    const temoignage = await Temoignage.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      statusstatus: "success",
      temoignage,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.deleteTemoignage = async (req, res) => {
  try {
    await Temoignage.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "temoignage deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "not found",
      message: err.message,
    });
  }
};
