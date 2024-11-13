// import axios from 'axios';
import { axiosClient as axios } from './axios';

// const API_URL = 'http://localhost:3000/api'; // Замените на URL вашего сервера

const questionService = {
  getAllQuestions: async () => {
    const response = await axios.post(`/questions-1`);
    return response.data;
  },
  getQuestionById: async (id) => {
    const response = await axios.get(`/questions/${id}`);
    return response.data;
  },
  createQuestion: async (question) => {
    const response = await axios.post(`/questions`, question);
    return response.data;
  },
  updateQuestion: async (id, updatedQuestion) => {
    const response = await axios.put(`/questions/${id}`, updatedQuestion);
    return response.data;
  },
  deleteQuestion: async (id) => {
    const response = await axios.delete(`/questions/${id}`);
    return response.data;
  },
  createAnswer: async (questionId, content) => {
    const response = await axios.post(`/answers`, {
      question_id: questionId,
      content,
    });
    return response.data;
  },
};

export default questionService;