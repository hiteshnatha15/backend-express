const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/userController");
const { test, isStudent, isAdmin } = require("../middlewares/userMiddleware");
router.post("/signup", signup);
router.post("/login", login);
router.get("/test", test, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Token verified",
  });
});
router.get("/admin", test, isAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Token verified",
  });
});
router.get("/admin", test, isAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Token verified",
  });
});
router.get("/student", test, isStudent, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Token verified",
  });
});
module.exports = router;
