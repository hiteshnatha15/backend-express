const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const upload = require("./routes/FileRoutes");
require("./configs/cloudinary").cloudinaryConnect();
require("./configs/database").connect();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(upload);
