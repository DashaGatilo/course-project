const express = require('express');
const router = express.Router();
const userService = require('./service/userService');
const { body } = require('express-validator');
const validationMiddleware = require('../middleware/validations');
const USER_ROLE = require('../types/user');
const authMiddleware = require('../middleware/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/user/register',
    body('username').notEmpty().isEmail(),
    body('password').notEmpty(),
    validationMiddleware,
    async (req, res) => {
        try {
            const { username, password } = req.body;

            // Проверка наличия пользователя с таким именем
            const existingUser = await userService.getUserByUsername(username);
            if (existingUser) {
                return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
            }

            // Хеширование пароля
            const hashedPassword = await bcrypt.hash(password, 10);

            // Создание нового пользователя
            const newUser = userService.createUser(username, hashedPassword);

            // Возвращение данных нового пользователя
            res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: newUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при регистрации пользователя', error });
        }
    });

router.post('/user/login',
    body('username').notEmpty().isEmail(),
    body('password').notEmpty(),
    validationMiddleware,
    async (req, res) => {
        try {
            const { username, password } = req.body;

            // Найти пользователя по имени
            const user = await userService.getUserByUsername(username);
            if (!user) {
                return res.status(401).json({ message: 'Неправильное имя пользователя или пароль' });
            }

            // Проверка пароля
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Неправильное имя пользователя или пароль' });
            }

            // Генерация токена
            const token = jwt.sign({ userId: user.id, userRole: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Отправка токена
            res.status(200).json({ message: 'Авторизация успешна', token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при авторизации', error });
        }
    });

router.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Получение данных пользователя
        const user = await userService.getUserById(userId);

        // Отправка данных пользователя
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении данных пользователя', error });
    }
});

router.post('/user/all', authMiddleware([USER_ROLE.Admin, USER_ROLE.Manager]), async (req, res) => {
    try {
        const userId = req.params.id;

        // Получение данных пользователя
        const users = await userService.getAllUsers();

        // Отправка данных пользователя
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении данных пользователя', error });
    }
});

router.put('/user/:id',
    authMiddleware,
    body('username').optional().isEmail(),
    body('password').optional().notEmpty(),
    validationMiddleware,
    async (req, res) => {
        try {
            const userId = req.params.id;
            const { username, password, role } = req.body;

            if (username && userService.getUserByUsername(username)) {
                return res.status(400).json({ message: 'Пользователь c таким именем уже существует' });
            }

            const user = await userId.getUserById(userId)

            const targetUsername = username ?? user.username
            // Хеширование пароля, если он был изменен
            let hashedPassword = user.password;
            if (password) {
                hashedPassword = await bcrypt.hash(password, 10);
            }


            // Обновление данных пользователя
            const updatedUser = await userService.updateUser(userId, targetUsername, hashedPassword, role);

            // Отправка данных обновленного пользователя
            res.status(200).json({ message: 'Данные пользователя успешно обновлены', user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при обновлении данных пользователя', error });
        }
    });

router.delete('/user/:id', authMiddleware([USER_ROLE.Admin, USER_ROLE.Manager]), async (req, res) => {
    try {
        const userId = req.params.id;

        // Удаление пользователя

        await userService.deleteUser(userId)
        // Отправка сообщения об успешном удалении
        res.status(200).json({ message: 'Пользователь успешно удален' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении пользователя', error });
    }
});

module.exports = router;