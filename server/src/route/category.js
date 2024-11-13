// server/src/route/question.js

const express = require('express');
const router = express.Router();
const categoryService = require('./service/categoryService');
const { body } = require('express-validator');
const validationMiddleware = require('../middleware/validations');
const authMiddleware = require('../middleware/auth');
const USER_ROLE = require('../types/user');

router.get('/', authMiddleware, async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories()
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении категорий', error });
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryService.getCategoryById(categoryId);
        res.status(200).json(category);
      } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении категории', error });
      }
});

router.post('/',
    authMiddleware([USER_ROLE.Admin, USER_ROLE.Manager]),
    body('title').notEmpty(),
    body('content').notEmpty(),
    body('category_id').isNumeric(),
    validationMiddleware,
    async (req, res) => {
        try {
            const { name, description } = req.body;
        
            // Создание новой категории
            const newCategory = await categoryService.createCategory(name, description)
            // Отправка данных новой категории
            res.status(201).json({ message: 'Категория успешно создана', category: newCategory });
          } catch (error) {
            res.status(500).json({ message: 'Ошибка при создании категории', error });
          }
    });

router.put('/:id',
    authMiddleware(),
    body('title').optional().notEmpty(),
    body('content').optional().notEmpty(),
    body('category_id').optional().isNumeric(),
    validationMiddleware,
    async (req, res) => {
        try {
          const categoryId = req.params.id;
          const { name, description } = req.body;
      
          // Обновление категории
          const updatedCategory = await categoryService.updateCategory(categoryId, name, description)
      
          // Отправка данных обновленной категории
          res.status(200).json({ message: 'Категория успешно обновлена', category: updatedCategory });
        } catch (error) {
          res.status(500).json({ message: 'Ошибка при обновлении категории', error });
        }
      }
);

router.delete('/:id', authMiddleware([USER_ROLE.Manager, USER_ROLE.Admin]), async (req, res) => {
    try {
      const categoryId = req.params.id;
  
      // Удаление категории
      await categoryService.deleteCategory(categoryId);
  
      // Отправка сообщения об успешном удалении
      res.status(200).json({ message: 'Категория успешно удалена' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении категории', error });
    }
  });

module.exports = router;