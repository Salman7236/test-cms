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
export const getCategory = () => API.get("/complaint-categories/");
// export const createCategory = (data) => API.post('/complaint-categories/register/', data);

export const createCategory = (data) =>
  API.post("/complaint-categories/register", {
    category: data.name, // Map 'name' to 'category'
    trsTime: new Date(),
  });
// export const updateCategory = (id, data) => API.patch(`/complaint-categories/${id}`, data);

export const updateCategory = (id, data) =>
  API.patch(`/complaint-categories/${id}`, {
    category: data.name,
    trsTime: new Date(),
  });

export const deleteCategory = (id) => API.delete(`/complaint-categories/${id}`);

export default API;
