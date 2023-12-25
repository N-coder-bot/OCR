const express = require("express");
const router = express.Router();

const {
  getAccessToken,
  createOcrRecord,
  editOcrRecord,
  getAllOcrRecords,
} = require("../controllers/userController");

// Route to get access token for the user.
// This token is necessary for being able to use Google Cloud Vision API.
router.get("/getAccessToken", getAccessToken);
// Route to create ocr record.
router.post("/createRecord", createOcrRecord);
//Route to edit ocr record.
router.put("/editRecord", editOcrRecord);
// Route to get all the ocr records.
router.get("/getAllRecords", getAllOcrRecords);
module.exports = router;
