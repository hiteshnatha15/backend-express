const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();
const fileSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

//here doc is document

fileSchema.post("save", async function (doc) {
  try {
    console.log(doc);
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      auth: { user: "natharajni1@gmail.com", pass: "jljo kyaa yniq dqcj" },
    });
    let info = await transporter.sendMail({
      from: process.env.user,
      to: doc.email,
      subject: "New file uploaded in Cloudinary",
      html: `<h1>Cloudinary link</h1><br><p>${doc.imageUrl}</p>`,
    });
    console.log("info", info);
  } catch (error) {
    console.error(error);
  }
});

module.exports = mongoose.model("files", fileSchema);
