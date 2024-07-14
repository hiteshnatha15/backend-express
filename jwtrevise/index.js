const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./configs/db");
const PORT = process.env.PORT || 4500;
const userRoute = require("./routes/userRoute");
const cookieParser = require("cookie-parser");

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(`<h1>Home Page</h1>`);
});

connectDB();

app.use(userRoute);
