const express = require("express");
const router = express.Router();

const {getAccessToken} = require("../controllers/userController");

// Route to get access token for the user.
// This token is necessary for being able to use Google Cloud Vision API.
router.get("/getAccessToken",getAccessToken);
module.exports = router;