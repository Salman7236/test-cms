import axios from "axios";

const API = axios.create({ baseURL: `${import.meta.env.VITE_API_URL}/api` });

// const API = axios.create({ baseURL:"http://192.168.18.154:5000/api" });

// src/config.js or anywhere in React
// const apiUrl = import.meta.env.VITE_API_URL;
// const appName = import.meta.env.VITE_APP_NAME;

// Set token in all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or whatever key you use
  if (token) {
    config.headers.Authorization = token; // if using mock tokens like "token"
    // config.headers.Authorization = `Bearer ${token}`; // if using JWT
  }
  return config;
});

export const getUsers = () => API.get("/users/");
export const createUser = (data) => API.post("/users/register", data);
export const updateUser = (id, data) => API.patch(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);

export default API;

// http://localhost:5001/api/users/usersdata

// http://192.168.18.154:5000/api/users
