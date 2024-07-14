const cloudinary = require("cloudinary").v2;
const files = require("../models/imageModel");
require("dotenv").config();
exports.localImageUpload = async (req, res) => {
  try {
    const image = req.files.image;
    const path =
      __dirname + "/assets/" + Date.now() + `.${image.name.split(".")[1]}`;
    image.mv(path, (error) => {
      if (error) {
        console.error(error);
        return res.status(400).json({
          success: false,
          message: "Unable to upload file",
        });
      }
    });
    res.status(200).json({
      success: true,
      message: "File Uploaded successsfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to upload file",
    });
  }
};

exports.cloudUpload = async (req, res) => {
  try {
    const image = req.files.image;
    const { email } = req.body;
    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "hitesh",
    });
    const dbResult = await files.create({ imageUrl: result.secure_url, email });
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      imageUrl: result.secure_url,
    });
    console.log(dbResult);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to upload file",
    });
  }
};

//AWS-SQS,SNS