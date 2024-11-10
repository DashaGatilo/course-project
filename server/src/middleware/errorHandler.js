// server/src/middleware/errorHandler.js

module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ошибка сервера' });
};