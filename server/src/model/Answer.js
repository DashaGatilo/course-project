const db = require('../config/database');

// Модель для работы с данными ответов
const Answer = {
  // Получение всех ответов
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM answers', (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Получение ответа по ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM answers WHERE id = ?', [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  },

  // Получение ответов по ID вопроса
  getByQuestionId: (questionId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM answers WHERE question_id = ?', [questionId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Создание нового ответа
  create: (data) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO answers SET ?', data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Обновление ответа по ID
  update: (id, data) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE answers SET ? WHERE id = ?', [data, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Удаление ответа по ID
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM answers WHERE id = ?', [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = Answer;