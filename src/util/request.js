import axios from "axios";
import config from "./config";

export const request = async (
  endpoint,
  method = "get",
  data = null,
  headers = {}
) => {
  const url = `${config.BASE_URL}${endpoint}`;

  // Get token from localStorage (or from Zustand if you want)
  const token = localStorage.getItem("token");

  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers, // custom headers can override if needed
      },
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error.response?.data || { error: "Something went wrong" };
  }
};
