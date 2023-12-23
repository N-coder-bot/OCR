const { GoogleAuth } = require("google-auth-library"); // Google library for Auth, via REST.
// Controller for getting Access Token inorder to use Google Cloud Vision API.
const getAccessToken = async (req,res) => {
    const auth = new GoogleAuth({
      keyFile: `./${process.env.SECRET_KEY_PATH}`, // Service account key file, stores info about public/private key.
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });
  
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
  
    // Return the access token to the client.
    res.json({ accessToken });
}
module.exports = {getAccessToken};