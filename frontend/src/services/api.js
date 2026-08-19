import axios from "axios";

const api = axios.create({
  baseURL: "https://personal-calendar-backend-rjzx.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token ONLY to requests that already have a logged-in token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log(
      "Request:",
      config.url,
      "Sending token:",
      token ? "YES" : "NO"
    );

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,

  (error) => {
    const requestURL = error.config?.url;

    console.log("API ERROR:", requestURL);
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);

    // IMPORTANT:
    // Do NOT call this "session expired" for login.
    if (
      error.response?.status === 401 &&
      requestURL !== "/login"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");

      alert("Session expired. Please login again.");

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;