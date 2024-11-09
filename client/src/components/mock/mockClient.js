import axios from 'axios';
import mockResponses from './mockResponses';

const mockClient = {
  get: async (url) => {
    const response = mockResponses[url];
    if (response) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: response });
        }, 1000); // Симулируем задержку
      });
    } else {
      return Promise.reject(new Error('Запрос не найден'));
    }
  },
  post: async (url, data) => {
    const response = mockResponses[url];
    if (response) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: response });
        }, 1000); // Симулируем задержку
      });
    } else {
      return Promise.reject(new Error('Запрос не найден'));
    }
  },
  put: async (url, data) => {
    const response = mockResponses[url];
    if (response) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: response });
        }, 1000); // Симулируем задержку
      });
    } else {
      return Promise.reject(new Error('Запрос не найден'));
    }
  },
  delete: async (url) => {
    const response = mockResponses[url];
    if (response) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: response });
        }, 1000); // Симулируем задержку
      });
    } else {
      return Promise.reject(new Error('Запрос не найден'));
    }
  },
};

export default mockClient;