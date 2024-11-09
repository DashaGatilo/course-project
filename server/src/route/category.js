// server/src/route/question.js

const express = require('express');
const router = express.Router();
const categoryService = require('./service/categoryService');
const { body } = require('express-validator');
const validationMiddleware = require('../middleware/validation');
const authMiddleware = require('../middleware/auth');
const USER_ROLE = require('../types/user');

router.get('/', authMiddleware, categoryService.getAllCategories);

router.get('/:id', authMiddleware, categoryService.getCategoryById);

router.post('/',
    authMiddleware(USER_ROLE.Manager),
    body('title').notEmpty(),
    body('content').notEmpty(),
    body('category_id').isNumeric(),
    validationMiddleware, 
    categoryService.createCategory
);

router.put('/:id',
    authMiddleware(),
    body('title').optional().notEmpty(),
    body('content').optional().notEmpty(),
    body('category_id').optional().isNumeric(),
    validationMiddleware, 
    categoryService.updateCategory
);

router.delete('/:id', authMiddleware, categoryService.deleteCategory);

module.exports = router;