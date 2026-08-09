import axios from "axios";

const api = axios.create({
  baseURL: "https://personal-calendar-backend-rjzx.onrender.com",
});

export default api;