const express = require('express');
const router = express.Router();
const Category = require('../model/Category');

// Получение всех категорий
router.get('/', async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении категорий', error });
  }
});

// Получение категории по ID
router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.getById(categoryId);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении категории', error });
  }
});

// Создание новой категории
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;

    // Создание новой категории
    const newCategory = await Category.create({ name, description });

    // Отправка данных новой категории
    res.status(201).json({ message: 'Категория успешно создана', category: newCategory });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании категории', error });
  }
});

// Обновление категории
router.put('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, description } = req.body;

    // Обновление категории
    const updatedCategory = await Category.update(categoryId, { name, description });

    // Отправка данных обновленной категории
    res.status(200).json({ message: 'Категория успешно обновлена', category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении категории', error });
  }
});

// Удаление категории
router.delete('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Удаление категории
    await Category.delete(categoryId);

    // Отправка сообщения об успешном удалении
    res.status(200).json({ message: 'Категория успешно удалена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении категории', error });
  }
});

module.exports = router;