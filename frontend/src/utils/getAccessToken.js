import axios from "axios";
import { origin } from "./origin";
// Fetching token from the backend server.
export const getAccessToken = async () => {
  const response = await axios.get(`${origin}/user/getAccessToken`);
  return response.data.accessToken.token;
};
