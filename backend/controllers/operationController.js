const Operation = require("../models/Operation");

// create an operation.
const createOp = async (req, res) => {
  let op = await Operation.create(req.body);
  res.json({ op });
};

// get all operations.
const getOps = async (req, res) => {
  let ops = await Operation.find({}).sort({ createdAt: "asc" });
  res.json({ ops });
};

module.exports = { createOp, getOps };
