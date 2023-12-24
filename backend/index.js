const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config();

//connect to mongodb.
require("./config/database");

const PORT = 3000; //localhost for now.

const corsOptions = {
  // cross origin allowed.
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));

const userRouters = require("./routes/user");
app.use("/user", userRouters); // using user routes.

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
