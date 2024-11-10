// import axios from 'axios';
import { axiosClient as axios } from './axios';

// const API_URL = 'http://localhost:3000/api'; // Замените на URL вашего сервера

const categoryService = {
  getAllCategories: async () => {
    const response = await axios.get(`/categories`);
    return response.data;
  },
  getCategoryById: async (id) => {
    const response = await axios.get(`/categories/${id}`);
    return response.data;
  },
  createCategory: async (name) => {
    const response = await axios.post(`/categories`, { name });
    return response.data;
  },
  updateCategory: async (id, name) => {
    const response = await axios.put(`/categories/${id}`, { name });
    return response.data;
  },
  deleteCategory: async (id) => {
    const response = await axios.delete(`/categories/${id}`);
    return response.data;
  },
};

export default categoryService;