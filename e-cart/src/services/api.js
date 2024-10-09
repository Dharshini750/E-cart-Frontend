import axios from 'axios';

const API_URL = 'http://localhost:5000';

const getproducts = () => axios.get(`${API_URL}/products/all`)
const addproduct = (product) => axios.post(`${API_URL}/products/addproduct`, product)
export { getproducts, addproduct };

const registerUser = (userData) => axios.post(`${API_URL}/api/users/signup`, userData);

const loginUser = (userData) => axios.post(`${API_URL}/api/users/login`, userData);
export { registerUser ,loginUser};