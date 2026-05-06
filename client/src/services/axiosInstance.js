import axios from "axios";

const getToken = () => localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://api.mantraexim.com",
});

// 🔹 Request Interceptor (Add Token Before Sending Request)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔹 Response Interceptor (Handle Errors Globally)
axiosInstance.interceptors.response.use(
  (response) => response, // Pass successful responses
  (error) => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
      console.error("Unauthorized! Redirecting to login...");
      window.location.href = "/"; // Redirect to login if token is invalid
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
