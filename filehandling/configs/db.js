const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(console.log("Database Connected"))
    .catch((error) => {
      console.error(error);
    });
};
