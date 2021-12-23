const Reservation = require("./../models/ReservationModel");
const APIfeatures = require("./../utils/apiFeatures");
const moment = require("moment");

exports.createReservation = async (req, res) => {
  try {
    let currentDate = moment();
    console.log(currentDate.toString());
    reservationDate = req.body.date;
    if (moment(reservationDate).isBefore(currentDate)) {
      res.status(400).json({
        status: "bad date",
      });
    } else {
      const newReservation = await Reservation.create(req.body);
      res.status(201).json({
        status: "Reservation created successfully",
        data: {
          newReservation,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      code: err.code,
      message: err.code,
    });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const features = new APIfeatures(Reservation.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const reservations = await features.query;

    // const reservation = await features.query;
    // Send response
    res.status(200).json({
      status: "Success",
      numberOfRestuarants: Reservation.length,
      data: {
        reservations,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getReservationByAccount = async (req, res) => {
  try {
    const reservation = await Reservation.find({
      account: req.decoded.id,
    }).populate("account");
    res.status(200).json({
      status: "success",
      data: {
        reservation,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getOneReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate(
      "restaurant"
    );
    res.status(200).json({
      status: "success",
      data: {
        reservation,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
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
        reservation,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Reservation deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "not found",
      message: err.message,
    });
  }
};
