import axios from "axios";

// const API = axios.create({ baseURL: 'http://BACKEND-:5000/api/companies' });

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/companies`,
});

// Set token in all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or whatever key you use
  if (token) {
    config.headers.Authorization = token; // if using mock tokens like "token"
    // config.headers.Authorization = `Bearer ${token}`; // if using JWT
  }
  return config;
});

export const getCompany = () => API.get("/");
export const createCompany = (data) => API.post("/register", data);
export const updateCompany = (id, data) => API.patch(`/${id}`, data);
export const deleteCompany = (id) => API.delete(`/${id}`);
export default API;

// http://localhost:5002/companies/

// http://localhost:5002/companies/register

// http://192.168.18.154:5000/api/companies
