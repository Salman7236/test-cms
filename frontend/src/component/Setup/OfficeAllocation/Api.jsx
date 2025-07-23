import axios from "axios";

// const API = axios.create({ baseURL: 'http://localhost:5003/api' });

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

// Office endpoints
export const getOfficesAllocation = () => API.get("/office-alloc/");
export const createOfficeAllocation = (data) =>
  API.post("/office-alloc/register", data);
export const updateOfficeAllocation = (id, data) =>
  API.patch(`/office-alloc/${id}`, data);
export const deleteOfficeAllocation = (id) => API.delete(`/office-alloc/${id}`);

export default API;

// http://localhost:5003/api/officealloc/getofficealloc

// http://localhost:5003/api/officealloc/register

// /api/officealloc/683188573281d7990594abab

// http://localhost:5000/api/office-alloc

// http://localhost:5000/api/office-alloc/register
