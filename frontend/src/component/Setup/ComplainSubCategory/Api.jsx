import axios from 'axios';

const API = axios.create({ baseURL: `${import.meta.env.VITE_API_URL}/api`});

// SubCategory endpoints
export const getSubCategories = (categoryId) => API.get(`/complaint-categories/${categoryId}/sub-cat/`);
export const createSubCategory = (categoryId, data) => API.post(`/complaint-categories/${categoryId}/sub-cat/register`, data);
export const getSubCategory = (categoryId, subCategoryId) => API.get(`/complaint-categories/${categoryId}/sub-cat/${subCategoryId}`);
export const updateSubCategory = (categoryId, subCategoryId, data) => API.patch(`/complaint-categories/${categoryId}/sub-cat/${subCategoryId}`, data);
export const deleteSubCategory = (categoryId, subCategoryId) => API.delete(`/complaint-categories/${categoryId}/sub-cat/${subCategoryId}`);

// http://localhost:5000/api/complaint-categories/683abe94ba63657cc76ab7f0/
// http://localhost:5000/api/complaint-categories/683abe94ba63657cc76ab7f0/sub-cat/register
// http://localhost:5000/api/complaint-categories/683abe94ba63657cc76ab7f0/



// export const getTypes = (categoryId, subCategoryId) => API.get(`/complaint-categories/${categoryId}/sub-cat/${subCategoryId}/type/`);

export default API;


// http://localhost:5000/api/complaint-categories/683962dbcadbbba61cd47a49/sub-cat/register