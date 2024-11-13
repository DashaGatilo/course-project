// import axios from 'axios';
import { axiosClient as axios } from './axios';

// const API_URL = 'http://localhost:3000/api'; // Замените на URL вашего сервера

const questionService = {

    create: async (question_id, user_id, content) => {
        const response = await axios.post(`/answers`, {
            question_id, user_id, content
        });
        return response.data;
    },
    getByQuestionId: async (questionId) => {
        const response = await axios.get(`/answers/${questionId}`);
        return response.data;
    },
};

export default questionService;