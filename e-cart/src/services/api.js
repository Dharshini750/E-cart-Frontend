// import axios from 'axios';

// const API_URL = 'http://localhost:5000';

// const getproducts = () => axios.get(`${API_URL}/products/all`)
// const addproduct = (product) => axios.post(`${API_URL}/products/addproduct`, product)
// export { getproducts, addproduct };

// const registerUser = (userData) => axios.post(`${API_URL}/api/users/signup`, userData);

// const loginUser = (userData) => axios.post(`${API_URL}/api/users/login`, userData);
// export { registerUser ,loginUser};

import axios from 'axios';

const API_URL = 'http://localhost:5000';
const getproducts = () => axios.get(`${API_URL}/products/all`);
const addproduct = (product) => axios.post(`${API_URL}/products/addproduct`, product);
const deleteProduct = (productId) => axios.delete(`${API_URL}/products/delete/${productId}`);
const updateProductStock = (productId, newStock) => axios.put(`${API_URL}/products/update/${productId}`, { stock: newStock });
export { getproducts, addproduct, deleteProduct, updateProductStock,};

const registerUser = (userData) => axios.post(`${API_URL}/api/users/signup`, userData);
const loginUser = (userData) => axios.post(`${API_URL}/api/users/login`, userData);
export { registerUser ,loginUser};

