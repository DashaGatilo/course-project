const db = require('../config/database');

// Модель для работы с данными категорий
const Category = {
  // Получение всех категорий
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM categories', (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Получение категории по ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM categories WHERE id = ?', [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  },

  // Создание новой категории
  create: (data) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO categories SET ?', data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Обновление категории по ID
  update: (id, data) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE categories SET ? WHERE id = ?', [data, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Удаление категории по ID
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM categories WHERE id = ?', [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = Category;