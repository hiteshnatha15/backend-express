const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); //mongoose is also known as ODM Library

app.use(bodyParser.json());
app.listen(3000, () => {
  console.log("Server Created");
});

mongoose
  .connect("mongodb://localhost:27017/myDatabase")
  .then(() => {
    console.log("connection sucessfull");
  })
  .catch(() => {
    console.log(error);
  });

app.get("/", (request, response) => {
  response.send("hello jee");
});

app.post("/api/cars", (req, res) => {
  const { name, brand } = req.body;
  console.log(name);
  console.log(brand);
  res.send("car sent sucessfully");
});
