import axios from "axios";
import config from "./config";

export const request = async (
  endpoint,
  method = "get",
  data = null,
  headers = {}
) => {
  const url = `${config.BASE_URL}${endpoint}`;

  const token = localStorage.getItem("token");

  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);

    if (error.response) {
      // 🛠️ When backend responds with an error (4xx, 5xx)
      const message =
        error.response.data.message ||
        error.response.data.error ||
        "Something went wrong on server.";

      throw new Error(message);
    } else if (error.request) {
      // 🚫 No response from server (maybe offline)
      throw new Error(
        "No response from server. Please check your internet connection."
      );
    } else {
      // 🛠️ Unknown error
      throw new Error("Unexpected error occurred.");
    }
  }
};
