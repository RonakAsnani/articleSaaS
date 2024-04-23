import axios from "axios";
import Cookies from "js-cookie";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/", // Your API base URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (request) => {
    const token = Cookies.get("token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default api;
