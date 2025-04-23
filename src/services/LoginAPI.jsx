import axios from "axios";

// Set base URL for your Laravel API
const API = axios.create({
  baseURL: "http://localhost:8000/api", // Change to match your Laravel setup
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve the JWT token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
  }
  return config;
});

// Export API instance for global usage
export default API;

// Register API call
export const register = (data) => {
  return API.post("/auth/register", data); // Laravel expects `auth/register` as per your controller
};

// Login API call
export const login = async (credentials) => {
  return API.post("/auth/login", credentials); // Laravel expects `auth/login` as per your controller
};

export const fetchUser = async () => {
  try {
    const response = await API.get("/auth/user"); // Laravel's route for fetching authenticated user
    return response.data; // Return user data
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Handle error
  }
};
