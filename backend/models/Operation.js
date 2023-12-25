const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const OperationSchema = new Schema(
  {
    id: { type: mongoose.ObjectId, ref: "User" },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Operation", OperationSchema);
