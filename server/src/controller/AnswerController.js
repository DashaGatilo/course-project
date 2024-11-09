const express = require('express');
const router = express.Router();
const Answer = require('../model/Answer');

// Создание нового ответа
router.post('/', async (req, res) => {
  try {
    const { question_id, user_id, content } = req.body;

    // Создание нового ответа
    const newAnswer = await Answer.create({ question_id, user_id, content });

    // Отправка данных нового ответа
    res.status(201).json({ message: 'Ответ успешно создан', answer: newAnswer });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании ответа', error });
  }
});

// Получение ответов по ID вопроса
router.get('/question/:questionId', async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const answers = await Answer.getByQuestionId(questionId);
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении ответов', error });
  }
});

// Обновление ответа
router.put('/:id', async (req, res) => {
  try {
    const answerId = req.params.id;
    const { content } = req.body;

    // Обновление ответа
    const updatedAnswer = await Answer.update(answerId, { content });

    // Отправка данных обновленного ответа
    res.status(200).json({ message: 'Ответ успешно обновлен', answer: updatedAnswer });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении ответа', error });
  }
});

// Удаление ответа
router.delete('/:id', async (req, res) => {
  try {
    const answerId = req.params.id;

    // Удаление ответа
    await Answer.delete(answerId);

    // Отправка сообщения об успешном удалении
    res.status(200).json({ message: 'Ответ успешно удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении ответа', error });
  }
});

module.exports = router;