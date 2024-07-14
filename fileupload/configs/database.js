const { default: mongoose } = require("mongoose");
const mongoo = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
};
