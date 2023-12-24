const User = require("../models/User");

const { GoogleAuth } = require("google-auth-library"); // Google library for Auth, via REST.
// Controller for getting Access Token inorder to use Google Cloud Vision API.
const getAccessToken = async (req, res) => {
  const auth = new GoogleAuth({
    keyFile: `./${process.env.SECRET_KEY_PATH}`, // Service account key file, stores info about public/private key.
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();

  // Return the access token to the client.
  res.json({ accessToken });
};
// Controller for creating an OCR record, from the data received.
const createOcrRecord = async (req, res) => {
  try {
    const record = req.body;
    const {
      identification_number,
      name,
      last_name,
      date_of_birth,
      date_of_issue,
      date_of_expiry,
    } = record;
    let status = "success";
    // If any of the details are not properly stored in the data, we consider that
    // as a failure.
    if (
      identification_number == undefined ||
      name == undefined ||
      last_name == undefined ||
      date_of_birth == undefined ||
      date_of_expiry == undefined ||
      date_of_issue == undefined
    ) {
      status = "failure"; // setting status of the record to failure.
      record.error = "Improper data entry"; // set the custom error message here.
    }
    record.status = status;
    record.timestamp = new Date();
    await User.create(record);
    res.json({ success: "success!" });
  } catch (error) {
    res.status(400).json({ error: "server error" });
  }
};
module.exports = { getAccessToken, createOcrRecord };
