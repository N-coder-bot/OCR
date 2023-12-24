const express = require("express");
const router = express.Router();

const {
  getAccessToken,
  createOcrRecord,
} = require("../controllers/userController");

// Route to get access token for the user.
// This token is necessary for being able to use Google Cloud Vision API.
router.get("/getAccessToken", getAccessToken);
// Route to create ocr record.
router.post("/createRecord", createOcrRecord);
module.exports = router;
