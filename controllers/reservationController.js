const Reservation = require("./../models/reservationModel");
const APIfeatures = require("./../utils/apiFeatures");
const moment = require("moment");
const sendMail = require("./../utils/email");
const sendSms = require("./../utils/sms");

exports.createReservation = async (req, res) => {
  try {
    let currentDate = moment();
    console.log(currentDate.toString());
    const reservationDate = req.body.date;
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
      await sendMail({
        to: newReservation.emailClient,
        subject: `M. ${newReservation.nomduClient} ${newReservation.prenomClient}, You have booked successfully !`,
        html: `<p>Thank you for using Yuding Platform  !</p> <p> You have booked ${newReservation.nbrePlaces} places for the date : ${newReservation.date}  at ${newReservation.restaurant.restaurantName} restaurant. we are honored to receive you in our restaurant !</p><p> The manager. </p>`,
      })
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error.response.body);
        });
      await sendSms({
        to: newReservation.phoneNumber,
        body: `Thank you for using Yuding Platform  !  You have booked ${newReservation.nbrePlaces} places for the date : ${newReservation.date}  at ${newReservation.restaurant.restaurantName} restaurant. we are honored to receive you in our restaurant ! The manager.  `,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      code: err.code,
      message: err.message,
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
      numberOfReserations: Reservation.length,
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
    const features = new APIfeatures(
      Reservation.find({
        account: req.decoded.id,
      }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const reservations = await features.query;
    res.status(200).json({
      status: "success",
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

exports.getOneReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate([
      "restaurant",
      "meal",
    ]);
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
