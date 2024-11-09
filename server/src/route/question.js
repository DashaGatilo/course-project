// server/src/route/question.js

const express = require('express');
const router = express.Router();
const questionService = require('./service/questionService');
const { body } = require('express-validator');
const validationMiddleware = require('../middleware/validation');
const authMiddleware = require('../middleware/auth');
const USER_ROLE = require('../types/user');

router.get('/', questionService.getAllQuestions);

router.get('/:id', questionService.getQuestionById);

router.post('/',
    authMiddleware,
    body('title').notEmpty(),
    body('content').notEmpty(),
    body('category_id').isNumeric(),
    validationMiddleware, 
    questionService.createQuestion
);

router.put('/:id',
    authMiddleware,
    body('title').optional().notEmpty(),
    body('content').optional().notEmpty(),
    body('category_id').optional().isNumeric(),
    validationMiddleware, 
    questionService.updateQuestion
);

router.delete('/:id', authMiddleware([USER_ROLE.Admin, USER_ROLE.Manager]), questionService.deleteQuestion);

module.exports = router;