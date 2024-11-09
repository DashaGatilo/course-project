const express = require('express');
const mysql = require('mysql2'); //  или  mariadb
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000; //  порт  сервера
const answersController = require('./src/controller/AnswerController')
const categoryController = require('./src/controller/CategoryController')
const questionController = require('./src/controller/QuestionController')
const userController = require('./src/controller/UserController')


//  Подключение  к  базе  данных  MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'QA' 
});
connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
    throw err;
  }
  console.log('Подключение к базе данных установлено');
});

//  Настройка  CORS
app.use(cors());
app.use(express.json()); //  для  обработки  JSON-данныхs
app.use(answersController)
app.use(categoryController)
app.use(questionController)
app.use(userController)

//  Маршрут  регистрации
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = 'placeholder_for_hashed_password'; //  замените  на  функцию  хэширования  пароля  (например,  bcrypt)
  const sql = 'INSERT INTO user (username, password, role) VALUES (?, ?, ?)';
  connection.query(sql, [username, hashedPassword, 'user'], (err, result) => {
    if (err) {
      console.error('Ошибка регистрации:', err);
      res.status(500).json({ error: 'Ошибка регистрации' });
      return;
    }
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  });
});

//  Маршрут  авторизации
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM user WHERE username = ?';
  connection.query(sql, [username], (err, result) => {
    if (err) {
      console.error('Ошибка авторизации:', err);
      res.status(500).json({ error: 'Ошибка авторизации' });
      return;
    }
    if (result.length === 0) {
      res.status(401).json({ error: 'Неправильное имя пользователя или пароль' });
      return;
    }
    //  Проверьте  хэшированный  пароль,  полученный  из  базы  данных
    //  (используя  bcrypt  или  другую  функцию  хэширования  пароля)
    const hashedPassword = result[0].password;
    if (hashedPassword === 'placeholder_for_hashed_password') { //  замените  на  проверку  хэшированного  пароля
      res.status(200).json({ message: 'Авторизация успешна', token: 'placeholder_for_token' }); //  замените  `placeholder_for_token`  на  токен  аутентификации
      return;
    }
    res.status(401).json({ error: 'Неправильное имя пользователя или пароль' });
  });
});

//  Запуск  сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});