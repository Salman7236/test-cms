import axios from "axios";

// const API = axios.create({ baseURL: 'http://BACKEND-SERVER:5000/api' });

const API = axios.create({ baseURL: `${import.meta.env.VITE_API_URL}/api` });

// Set token in all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or whatever key you use
  if (token) {
    config.headers.Authorization = token; // if using mock tokens like "token"
    // config.headers.Authorization = `Bearer ${token}`; // if using JWT
  }
  return config;
});

export const getUserType = () => API.get("/user-types");
export const createUserType = (data) => API.post("/user-types/register", data);
// export const updateUserType = (id, data) => API.patch(`/${id}`, data);
// export const deleteUserType = (id) => API.delete(`/${id}`);
export const updateUserType = (id, data) =>
  API.patch(`/user-types/${id}`, data);
export const deleteUserType = (id) => API.delete(`/user-types/${id}`);
export default API;

// http://localhost:5001/api/usertype/register

// http://192.168.18.154:5000/api/user-types
