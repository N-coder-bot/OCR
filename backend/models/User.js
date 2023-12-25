const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Defining User Schema.
const userSchema = new Schema(
  {
    identification_number: { type: String },
    name: { type: String },
    last_name: { type: String },
    date_of_birth: { type: String },
    date_of_issue: { type: String },
    date_of_expiry: { type: String },
    status: { type: String }, // Whether the OCR process was success or failure.
    error: { type: String }, // Error message, if any.
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
