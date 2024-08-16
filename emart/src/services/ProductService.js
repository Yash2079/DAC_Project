import axios from "axios";

const API_URL = 'http://localhost:8080/api/products';

export const getAllProducts = async () => {
    return await axios.get(API_URL);
};



export const getProductById = async (id) => {
    return await axios.get(`${API_URL}/${id}`).then((response)=>response.json());
};

export const createProduct = async (product) => {
    return await axios.post(API_URL, product);
};

export const deleteProduct = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};
