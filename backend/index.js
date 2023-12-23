const express = require("express");
const app = express();
const PORT = 3000; //localhost for now.
const { GoogleAuth } = require("google-auth-library");
app.get("/", async (req, res) => {
  const projectId = "round-bruin-409011";

  const auth = new GoogleAuth({
    keyFile: "./round-bruin-409011-be988ad9e258.json", //service account key file
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  const client = await auth.getClient();

  const accessToken = await client.getAccessToken();

  // Return the access token to the client
  res.json({ accessToken });
});
app.listen(PORT, () => {
  console.log("listening on port 3000");
});
