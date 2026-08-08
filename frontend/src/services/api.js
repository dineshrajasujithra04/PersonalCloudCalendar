import axios from "axios";

const api = axios.create({
  baseURL: "https://personal-calendar-backend-rjzx.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;