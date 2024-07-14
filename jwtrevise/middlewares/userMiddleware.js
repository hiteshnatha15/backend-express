const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.test = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ");
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Please enter the token",
      });
    }
    try {
      const payload = await jwt.verify(token, process.env.JSON_TOKEN);
      console.log(payload);
      req.userDetails = payload;
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid token recieved",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in verifying token",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const role = req.userDetails.role;
    if (role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "You are not an admin",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in finding you are admin or not",
    });
  }
};

exports.isStudent = async (req, res, next) => {
  try {
    const role = req.userDetails.role;
    if (role !== "student") {
      return res.status(400).json({
        success: false,
        message: "You are not an student",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in finding you are student or not",
    });
  }
};
