import axios from "axios";
import { DEFAULT } from "constants";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8080/auth", // Main domain
  headers: {
    "Content-Type": "application/json",
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});
export const root = axios.create({
  baseURL: "http://localhost:8080", // Base URL for user endpoints
  headers: {
    "Content-Type": "application/json",
  },
});
root.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(DEFAULT.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
