const fileSchema = require("../models/File");
const cloundinary = require("cloudinary").v2;
//height se reduce krenge 
//pre and post middleware kya hote h
exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log(file);
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log(path);

    file.mv(path, (error) => {
      console.error(error);
    });
    res.json({
      success: true,
      message: "Local file uploaded successfully",
    });
  } catch (error) {
    console.error(error);
  }
};

function isFileTypeSupported(type, supportedFiles) {
  return supportedFiles.includes(type);
}

async function uploadFileToCloundinary(file, folder) {
  const { options } = folder;
  return await cloundinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;

    const supportedFiles = ["jpeg", "jpg", "png"];
    const type = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(type, supportedFiles)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }
    const response = await uploadFileToCloundinary(file, "codehelp");
    const fileData = await fileSchema.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    console.log(fileData);
    res.status(200).json({
      success: true,
      message: "Db me ho gya save",
      image_url: response.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

