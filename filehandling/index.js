const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
require("dotenv").config();
require("./configs/db").connectDB();
require("./configs/cloudinary").cloudinaryConnect();
const imageRoute = require("./routes/imageRoute");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(imageRoute);
