// server/src/route/answer.js

const express = require('express');
const router = express.Router();
const answerService = require('./service/answerService');
const { body } = require('express-validator');
const validationMiddleware = require('../middleware/validation');
const authMiddleware = require('../middleware/auth');
const USER_ROLE = require('../types/user');

router.get('/question/:questionId', authMiddleware, answerService.getAnswersByQuestionId);

router.get('/question/all', answerService.getAllAnswers)

router.post('/', 
    authMiddleware,
    body('question_id').isNumeric(),
    body('content').notEmpty(),
    validationMiddleware, 
    answerService.createAnswer
);

router.put('/:id',
    authMiddleware,
    body('content').notEmpty(),
    validationMiddleware, 
    answerService.updateAnswer
);

router.delete('/:id', authMiddleware, answerService.deleteOwnAnswer);

router.delete('/admin/:id', authMiddleware(USER_ROLE.Admin), answerService.deleteAnswer)

module.exports = router;
