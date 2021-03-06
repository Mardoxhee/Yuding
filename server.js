const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

// localdatabase
// const DB = 'mongodb://localhost:27017/projets-test'

// hosted database connexion config

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// database connexion

mongoose
  .connect(DB, { useNewUrlParser: true })
  .then((connexion) => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

//  Port configuration

// const port = process.env.PORT || 3000;
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
