// server/src/route/question.js

const express = require('express');
const router = express.Router();
const questionService = require('./service/questionService');
const { body } = require('express-validator');
const validationMiddleware = require('../middleware/validation');
const authMiddleware = require('../middleware/auth');
const USER_ROLE = require('../types/user');

router.get('/', async (req, res) => {
    try {
        const questions = await questionService.getAllQuestions();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении вопросов', error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const questionId = req.params.id;
        const question = await questionService.getQuestionById(questionId);
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении вопроса', error });
    }
});

router.post('/',
    authMiddleware,
    body('title').notEmpty(),
    body('content').notEmpty(),
    body('category_id').isNumeric(),
    validationMiddleware,
    async (req, res) => {
        try {
            const { title, content, category_id, user_id } = req.body;

            // Создание нового вопроса
            const newQuestion = await questionService.createQuestion(title, content, category_id, user_id)

            // Отправка данных нового вопроса
            res.status(201).json({ message: 'Вопрос успешно создан', question: newQuestion });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при создании вопроса', error });
        }
    }
);

router.put('/:id',
    authMiddleware,
    body('title').optional().notEmpty(),
    body('content').optional().notEmpty(),
    body('category_id').optional().isNumeric(),
    validationMiddleware,
    async (req, res) => {
        try {
            const questionId = req.params.id;
            const { title, content, category_id, user_id } = req.body;

            // Обновление вопроса
            const updatedQuestion = await questionService.updateQuestion(questionId, title, content, category_id, user_id);

            // Отправка данных обновленного вопроса
            res.status(200).json({ message: 'Вопрос успешно обновлен', question: updatedQuestion });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при обновлении вопроса', error });
        }
    }
);

router.delete('/:id', authMiddleware([USER_ROLE.Admin, USER_ROLE.Manager]), async (req, res) => {
    try {
        const questionId = req.params.id;

        // Удаление вопроса
        await questionService.deleteQuestion(questionId);

        // Отправка сообщения об успешном удалении
        res.status(200).json({ message: 'Вопрос успешно удален' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении вопроса', error });
    }
});

module.exports = router;