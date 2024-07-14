const mongoose = require("mongoose");
require("dotenv").config();

function dbConnect() {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log("Error in database connection");
      console.error(error);
      process.exit(1);
    });
}
module.exports = dbConnect;