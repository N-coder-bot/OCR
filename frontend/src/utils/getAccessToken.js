import axios from "axios";
// Fetching token from the backend server.
export const getAccessToken = async () => {
  const response = await axios.get("http://localhost:3000/user/getAccessToken");
  return response.data.accessToken.token;
};
