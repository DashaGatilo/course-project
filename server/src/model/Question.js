const db = require('../config/database');

// Модель для работы с данными вопросов
const Question = {
  // Получение всех вопросов
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM questions', (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Получение вопроса по ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM questions WHERE id = ?', [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  },

  // Создание нового вопроса
  create: (data) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO questions SET ?', data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Обновление вопроса по ID
  update: (id, data) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE questions SET ? WHERE id = ?', [data, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Удаление вопроса по ID
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM questions WHERE id = ?', [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = Question;