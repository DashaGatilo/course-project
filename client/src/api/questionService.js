import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Замените на URL вашего сервера

const questionService = {
  getAllQuestions: async () => {
    const response = await axios.get(`${API_URL}/questions`);
    return response.data;
  },
  getQuestionById: async (id) => {
    const response = await axios.get(`${API_URL}/questions/${id}`);
    return response.data;
  },
  createQuestion: async (question) => {
    const response = await axios.post(`${API_URL}/questions`, question);
    return response.data;
  },
  updateQuestion: async (id, updatedQuestion) => {
    const response = await axios.put(`${API_URL}/questions/${id}`, updatedQuestion);
    return response.data;
  },
  deleteQuestion: async (id) => {
    const response = await axios.delete(`${API_URL}/questions/${id}`);
    return response.data;
  },
  createAnswer: async (questionId, content) => {
    const response = await axios.post(`${API_URL}/answers`, {
      question_id: questionId,
      content,
    });
    return response.data;
  },
};

export default questionService;