const express = require("express");
const app = express();
const AccountRouter = require("./Routes/accountRoutes");
const RestaurantRouter = require("./Routes/restaurantRoutes");
const AppError = require("./utils/appError");
app.use(express.json());

// Routes

app.use("/api/accounts", AccountRouter);
app.use("/api/restaurants", RestaurantRouter);

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
