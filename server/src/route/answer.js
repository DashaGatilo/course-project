// server/src/route/answer.js

const express = require('express');
const router = express.Router();
const answerService = require('./service/answerService');
const { body } = require('express-validator');
const validationMiddleware = require('../middleware/validations');
const authMiddleware = require('../middleware/auth');
const USER_ROLE = require('../types/user');

router.get('/answers/:questionId', authMiddleware(), async (req, res) => {
    try {
        const questionId = req.params.questionId;
        const answers = await answerService.getAnswersByQuestionId(questionId)
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении ответов', error });
    }
});

router.get('/answers/all', async (req, res) => {
    try {
        const answers = await answerService.getAllAnswers()
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении ответов', error });
    }
})

router.post('/answers',
    authMiddleware(),
    body('question_id').isNumeric(),
    body('content').notEmpty(),
    validationMiddleware,
    async (req, res) => {
        try {
            const { question_id, user_id, content } = req.body;
            const answer = await answerService.createAnswer(question_id, user_id, content)
            res.status(201).json({ message: 'Ответ успешно создан', answer: answer });
        } catch {
            res.status(500).json({ message: 'Ошибка при создании ответа', error });
        }
    }
);

router.put('/:id',
    authMiddleware(),
    body('content').notEmpty(),
    validationMiddleware,
    async (req, res) => {
        try {
            const answerId = req.params.id;
            const { content } = req.body;

            const updatedAnswer = await answerService.updateAnswer(content)

            // Отправка данных обновленного ответа
            res.status(200).json({ message: 'Ответ успешно обновлен', answer: updatedAnswer });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при обновлении ответа', error });
        }
    }
);

router.delete('/:id', authMiddleware(), async (req, res) => {
    try {
        const answerId = req.params.id;
        const userId = req.userId

        await answerService.deleteOwnAnswer(answerId, userId)

        // Отправка данных обновленного ответа
        res.status(200).json({ message: 'Ответ успешно удален'});
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении ответа', error });
    }
});

router.delete('/admin/:id', authMiddleware(USER_ROLE.Admin), async (req, res) => {
    try {
        const answerId = req.params.id;

        await answerService.deleteAnswer(answerId)

        // Отправка данных обновленного ответа
        res.status(200).json({ message: 'Ответ успешно удален'});
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении ответа', error });
    }
});

module.exports = router;
