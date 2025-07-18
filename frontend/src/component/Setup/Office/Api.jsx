import axios from 'axios';

// const API = axios.create({ baseURL: 'http://192.168.18.154:5000/api' }); 

const API = axios.create({ baseURL:`${import.meta.env.VITE_API_URL}/api/offices` });


// Office endpoints
export const getOffices = () => API.get('/');
export const createOffice = (data) => API.post('/register', data);
export const updateOffice = (id, data) => API.patch(`/${id}`, data);
export const deleteOffice = (id) => API.delete(`/${id}`);


export default API;

// http://localhost:5003/api/offices/register

// 192.168.18.154:5000

// http://192.168.18.154:5000/api/offices


// http://localhost:5000/api/offices/683ac8f23bda2497e95a783e