const mongoose = require("mongoose");
require("dotenv").config();

async function connectDb() {
  await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => {
      console.error(error);
    });
}
module.exports = connectDb;
