const express = require('express');
const router = express.Router();
const Question = require('../model/Question');

// Получение всех вопросов
router.get('/', async (req, res) => {
  try {
    const questions = await Question.getAll();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении вопросов', error });
  }
});

// Получение вопроса по ID
router.get('/:id', async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await Question.getById(questionId);
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении вопроса', error });
  }
});

// Создание нового вопроса
router.post('/', async (req, res) => {
  try {
    const { title, content, category_id, user_id } = req.body;

    // Создание нового вопроса
    const newQuestion = await Question.create({ title, content, category_id, user_id });

    // Отправка данных нового вопроса
    res.status(201).json({ message: 'Вопрос успешно создан', question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании вопроса', error });
  }
});

// Обновление вопроса
router.put('/:id', async (req, res) => {
  try {
    const questionId = req.params.id;
    const { title, content, category_id, user_id } = req.body;

    // Обновление вопроса
    const updatedQuestion = await Question.update(questionId, { title, content, category_id, user_id });

    // Отправка данных обновленного вопроса
    res.status(200).json({ message: 'Вопрос успешно обновлен', question: updatedQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении вопроса', error });
  }
});

// Удаление вопроса
router.delete('/:id', async (req, res) => {
  try {
    const questionId = req.params.id;

    // Удаление вопроса
    await Question.delete(questionId);

    // Отправка сообщения об успешном удалении
    res.status(200).json({ message: 'Вопрос успешно удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении вопроса', error });
  }
});

module.exports = router;