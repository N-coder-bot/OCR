const express = require("express");
const app = express();
const PORT = 3000; //localhost for now.
app.get("/", (req, res) => {
  res.send("hi");
});
app.listen(PORT, () => {
  console.log("listening on port 3000");
});
