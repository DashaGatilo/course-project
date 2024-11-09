const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const securityMiddleware = require("../middleware/auth")

// Регистрация нового пользователя
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Проверка наличия пользователя с таким именем
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    const newUser = await User.create({ username, password: hashedPassword });

    // Возвращение данных нового пользователя
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при регистрации пользователя', error });
  }
});

// Авторизация пользователя
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Найти пользователя по имени
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Неправильное имя пользователя или пароль' });
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неправильное имя пользователя или пароль' });
    }

    // Генерация токена
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Отправка токена
    res.status(200).json({ message: 'Авторизация успешна', token });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при авторизации', error });
  }
});

// Получение данных пользователя по ID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Получение данных пользователя
    const user = await User.getById(userId);

    // Отправка данных пользователя
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении данных пользователя', error });
  }
});

// Обновление данных пользователя
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, password, role } = req.body;

    // Хеширование пароля, если он был изменен
    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Обновление данных пользователя
    const updatedUser = await User.update(userId, { username, password: hashedPassword, role });

    // Отправка данных обновленного пользователя
    res.status(200).json({ message: 'Данные пользователя успешно обновлены', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении данных пользователя', error });
  }
});

// Удаление пользователя
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Удаление пользователя
    await User.delete(userId);

    // Отправка сообщения об успешном удалении
    res.status(200).json({ message: 'Пользователь успешно удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении пользователя', error });
  }
});

module.exports = router;