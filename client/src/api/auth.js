import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Замените на URL вашего сервера

const auth = {
  register: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { username, password });
      return response.data;
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      throw error; // Перебросьте ошибку
    }
  },

  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      return response.data;
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      throw error; // Перебросьте ошибку
    }
  },

  // Метод для восстановления пароля
  forgotPassword: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      return response.data;
    } catch (error) {
      console.error('Ошибка восстановления пароля:', error);
      throw error; // Перебросьте ошибку
    }
  },

  // Метод для проверки авторизации
  isAuthenticated: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/is-authenticated`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Ошибка проверки авторизации:', error);
      throw error; // Перебросьте ошибку
    }
  }
};

export default auth;