const express = require("express");
const app = express();
const AccountRouter = require("./routes/accountRoutes");
const RestaurantRouter = require("./routes/restaurantRoutes");
const ReservationRouter = require("./routes/reservationRoutes");
const MealRouter = require("./routes/mealRoutes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// const AppError = require("./utils/appError");
app.use(express.json());

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "yuding API",
      description:
        "la plus grande plateforme d'exploration et de réservation des restaurants à Kinshasa",
      contact: {
        name: "mardochée LUVIKI",
        email: "MardoxheeLuviki@gmail.com",
      },
      servers: "http:127.0.0.1:3000",
    },
  },
  apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/**
 * @swagger
 * /restaurants/all:
 *  get:
 *      description : get all restaurants figuring in the yuding platform
 *      responses :
 *        '200':
 *          description : successfull !
 */
app.use("/reservations/all", ReservationRouter);
app.use("/restaurants/all", RestaurantRouter);
app.use("/api/accounts", AccountRouter);
app.use("/api/restaurants", RestaurantRouter);
// app.use("/api/reservations", ReservationRouter);
app.use("/api/meals", MealRouter);

// Error test
// app.all("*", (req, res, next) => {
//   next(new AppError(`can't find ${req.originalUrl} on this server !`, 404));
// });
// Error handling function definitaion
// app.use((err, req, res, next) => {
//   res.statusCode = err.statusConde || 500;
//   err.status = err.status || "error";

//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
// });

module.exports = app;
