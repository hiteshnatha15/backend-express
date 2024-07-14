const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(401).json({
        success: false,
        message: "Kindly fill all the fields",
      });
    }
    let userDetails = await user.findOne({ email });
    if (userDetails) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    userDetails = await user.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(200).json({
      success: true,
      data: userDetails,
      message: "User created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create user",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Kindly fill all the fields",
      });
    }
    const userDetails = await user.findOne({ email });
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User do not exists",
      });
    }
    if (await bcrypt.compare(password, userDetails.password)) {
      const payload = {
        id: userDetails._id,
        email: userDetails.email,
        role: userDetails.role,
      };
      const token = jwt.sign(payload, process.env.JSON_TOKEN, {
        expiresIn: "2h",
      });
      userDetails.token = token;
      userDetails.password = undefined;
      const options = {
        expires: new Date(Date.now() + 30000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        data: userDetails,
        message: "Login Sucessfull",
        token: token,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Incorrect password entered",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to login",
      error: error,
    });
  }
};
