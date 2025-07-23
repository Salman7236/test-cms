import axios from "axios";

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

// SubCategory endpoints
export const getSubCategories = (categoryId) =>
  API.get(`/complaint-categories/${categoryId}/sub-cat/`);
export const createSubCategory = (categoryId, data) =>
  API.post(`/complaint-categories/${categoryId}/sub-cat/register`, data);
export const getSubCategory = (categoryId, subCategoryId) =>
  API.get(`/complaint-categories/${categoryId}/sub-cat/${subCategoryId}`);
export const updateSubCategory = (categoryId, subCategoryId, data) =>
  API.patch(
    `/complaint-categories/${categoryId}/sub-cat/${subCategoryId}`,
    data
  );
export const deleteSubCategory = (categoryId, subCategoryId) =>
  API.delete(`/complaint-categories/${categoryId}/sub-cat/${subCategoryId}`);

// http://localhost:5000/api/complaint-categories/683abe94ba63657cc76ab7f0/
// http://localhost:5000/api/complaint-categories/683abe94ba63657cc76ab7f0/sub-cat/register
// http://localhost:5000/api/complaint-categories/683abe94ba63657cc76ab7f0/

// export const getTypes = (categoryId, subCategoryId) => API.get(`/complaint-categories/${categoryId}/sub-cat/${subCategoryId}/type/`);

export default API;

// http://localhost:5000/api/complaint-categories/683962dbcadbbba61cd47a49/sub-cat/register
