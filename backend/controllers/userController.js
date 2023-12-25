const User = require("../models/User");

const { GoogleAuth } = require("google-auth-library"); // Google library for Auth, via REST.
// Getting Access Token inorder to use Google Cloud Vision API.
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
// Creating an OCR record, from the data received.
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
      status = "failed"; // setting status of the record to failure.
      record.error = "Improper data entry"; // set the custom error message here.
    }
    record.status = status;
    record.timestamp = new Date();
    let user = await User.create(record);
    res.json({ user: user });
  } catch (error) {
    res.status(400).json({ error: "server error" });
  }
};

// Edit the record.
const editOcrRecord = async (req, res) => {
  let updatedRecord = req.body;
  await User.findByIdAndUpdate(updatedRecord._id, updatedRecord);
  res.json({ success: "success" });
};

// Fetch all the records. 0-> all records, 1-> success records only, 2-> failed records only., 3-> timestamp asc.
const getAllOcrRecords = async (req, res) => {
  let filter = req.params.filter;
  let records;
  if (filter == 0)
    records = await User.find({}).sort({
      createdAt: "asc",
    });
  // fetch all records.
  else if (filter == 1)
    records = await User.find({ status: "success" }).sort({
      createdAt: "asc",
    });
  // success records only.
  else if (filter == 2)
    records = await User.find({ status: "failed" }).sort({
      createdAt: "asc",
    });
  // failed records only.
  else records = await User.find({}).sort({ createdAt: "desc" }); // last record first.
  res.json({ records });
};

// Delete a record.
const deleteOcrRecord = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send("success");
};
module.exports = {
  getAccessToken,
  createOcrRecord,
  editOcrRecord,
  getAllOcrRecords,
  deleteOcrRecord,
};
