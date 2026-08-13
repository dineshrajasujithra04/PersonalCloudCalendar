import axios from "axios";

const api = axios.create({
  baseURL: "https://personal-calendar-backend-rjzx.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});


/*
   Add JWT token automatically
   to every protected request.
*/
api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    console.log(
      "Sending token:",
      token ? "YES" : "NO"
    );

    if (token) {

      config.headers = config.headers || {};

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


/*
   Handle authentication errors.
*/
api.interceptors.response.use(
  (response) => {

    return response;
  },

  (error) => {

    if (error.response?.status === 401) {

      console.log(
        "Authentication failed:",
        error.response.data
      );

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");

      alert(
        "Your login session has expired. Please login again."
      );

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);


export default api;