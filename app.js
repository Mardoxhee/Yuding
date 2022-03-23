const express = require("express");
const app = express();
const AccountRouter = require("./routes/accountRoutes");
const RestaurantRouter = require("./routes/restaurantRoutes");
const ReservationRouter = require("./routes/reservationRoutes");
const MealRouter = require("./routes/mealRoutes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const CategoryRouter = require("./routes/categoryRoutes");
var cors = require("cors");

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
// app.use("/category", cors(corsOptions), CategoryRouter);
app.use("/reservations/all", cors(corsOptions), ReservationRouter);
app.use("/accounts", cors(corsOptions), AccountRouter);
app.use("/restaurants", cors(corsOptions), RestaurantRouter);
app.use("/reservations", cors(corsOptions), ReservationRouter);
app.use("/meals", cors(corsOptions), MealRouter);
app.use(cors());
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
var corsOptions = {
  origin: "http://localhost:8081/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = app;
