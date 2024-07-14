const express = require("express");
const router = express.Router();
const {
  localImageUpload,
  cloudUpload,
} = require("../controllers/imageController");

router.post("/localimageupload", localImageUpload);
router.post("/cloudupload", cloudUpload);

module.exports = router;
