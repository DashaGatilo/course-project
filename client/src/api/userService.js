// import axios from 'axios';
import { axiosClient as axios } from './axios';

// const API_URL = 'http://localhost:3000/api'; // Замените на URL вашего сервера

const userService = {
    getAll: async () => {
        const response = await axios.post(`/user/all`);
        return response.data;
    },

    delete: async (id) => {
        const response = await axios.delete(`/user/${id}`);
        return response.data;
    },

};

export default userService;