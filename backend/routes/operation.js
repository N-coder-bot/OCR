const express = require("express");
const router = express.Router();

const { createOp, getOps } = require("../controllers/operationController");

// Create an operation.
router.post("/createOp", createOp);
// Get all operations.
router.get("/getOps", getOps);

module.exports = router;
