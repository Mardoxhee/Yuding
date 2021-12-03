const express = require("express");
const accountRouter = require("./Routes/accountRoutes");
const app = express();

app.use(express.json());

// Routes

app.use("/api/accounts", accountRouter);

module.exports = app;
