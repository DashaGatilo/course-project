const db = require('../config/database');

// Модель для работы с данными пользователей
const User = {
  // Получение всех пользователей
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Получение пользователя по ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  },

  // Создание нового пользователя
  create: (data) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users SET ?', data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Обновление пользователя по ID
  update: (id, data) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE users SET ? WHERE id = ?', [data, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Удаление пользователя по ID
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = User;