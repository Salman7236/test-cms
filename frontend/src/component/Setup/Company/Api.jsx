import axios from 'axios';

// const API = axios.create({ baseURL: 'http://BACKEND-:5000/api/companies' }); 

const API = axios.create({ baseURL:`${import.meta.env.VITE_API_URL}/api/companies` });


export const getCompany = () => API.get('/');
export const createCompany = (data) => API.post('/register', data);
export const updateCompany = (id, data) => API.patch(`/${id}`, data);
export const deleteCompany = (id) => API.delete(`/${id}`);
export default API;



// http://localhost:5002/companies/

// http://localhost:5002/companies/register

// http://192.168.18.154:5000/api/companies