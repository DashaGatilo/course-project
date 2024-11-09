const express = require('express');
const router = express.Router();
const userService = require('./service/userService');
const { body } = require('express-validator');
const validationMiddleware = require('../middleware/validation');

router.post('/register',
    body('username').notEmpty().isEmail(),
    body('password').notEmpty(),
    validationMiddleware, 
    userService.register
);

router.post('/login', 
    body('username').notEmpty().isEmail(),
    body('password').notEmpty(),
    validationMiddleware, 
    userService.login
);

router.get('/:id', userService.getUserById); 

router.put('/:id',
    authMiddleware,
    body('username').optional().isEmail(),
    body('password').optional().notEmpty(),
    validationMiddleware, 
    userService.updateUser
);

router.delete('/:id', authMiddleware, userService.deleteUser);

module.exports = router;