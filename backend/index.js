const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config();

//connect to mongodb.
require("./config/database");

const PORT = 3000; //localhost for now.

const corsOptions = {
  // cross origin allowed.
  origin: ["http://localhost:5173", "https://ocr-nine-sable.vercel.app"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json()); // For allowing body parsing.

const userRouters = require("./routes/user");
const operationRouters = require("./routes/operation");

app.use("/user", userRouters); // using user routes.
app.use("/operation", operationRouters); // using operation routes.

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
