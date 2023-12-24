const express = require("express");
const router = express.Router();

const {
  getAccessToken,
  createOcrRecord,
  editOcrRecord,
} = require("../controllers/userController");

// Route to get access token for the user.
// This token is necessary for being able to use Google Cloud Vision API.
router.get("/getAccessToken", getAccessToken);
// Route to create ocr record.
router.post("/createRecord", createOcrRecord);
//Route to edit ocr record.
router.put("/editRecord", editOcrRecord);
module.exports = router;
