import axios from "axios";
import http from "http";
import https from "https";
const axiosInstance = axios.create({
  baseURL: process.env.API_TOP_UP_URL || "http://localhost:3000", // Replace with your API base URL
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
