const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config(); // Загрузка переменных окружения из файла .env

// Создание подключения к базе данных
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Экспорт объекта подключения
module.exports = db;