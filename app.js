const express = require("express");
const app = express();
const AccountRouter = require("./routes/accountRoutes");
const RestaurantRouter = require("./routes/restaurantRoutes");
const ReservationRouter = require("./routes/reservationRoutes");
const MealRouter = require("./routes/mealRoutes");
const TemoignageRouter = require("./routes/temoignagesRoutes");
const CategoryRouter = require("./routes/categoryRoutes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.get("/", function (req, res) {
  res.send(
    "Welcome on Yuding platform APi ========== copy this link to read the documenation of this api ======================== https://docs.google.com/document/d/1qo06FtuJOP4jzVf2ewAspeEGRnIJEly3b4ZzpQ7tGxg/edit?usp=sharing"
  );
});
app.use("/category", cors(corsOptions), CategoryRouter);
app.use("/accounts", cors(corsOptions), AccountRouter);
app.use("/restaurants", cors(corsOptions), RestaurantRouter);
app.use("/reservations", cors(corsOptions), ReservationRouter);
app.use("/meals", cors(corsOptions), MealRouter);
app.use("/temoignages", cors(corsOptions), TemoignageRouter);
app.use(cors());

module.exports = app;
