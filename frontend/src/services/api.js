import axios from "axios";

const api = axios.create({
  baseURL: "https://personal-calendar-backend-rjzx.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically send login token with every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;