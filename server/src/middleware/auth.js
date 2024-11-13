const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('../config/database');
const userDb = require("../model/user")

function hasRole(role) {
    return function (req, res, next) {
        const token = req.headers.authorization?.split(' ')[1];
        console.log("START MIDDLE", req.headers.authorization)

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.log("ERROR MIDDLE", err)
                    return res.status(401).json({ message: 'Неверный токен' });
                }
                req.userId = decoded.userId;
                if (role?.length) {
                    const user = userDb.getById(userId).then((user) => {user})
                }
                console.log("FINISH MIDDLE")
                next();
            });
        } else {
            console.log("err" )
            return res.status(401).json({ message: 'Требуется авторизация' });
        }
    }
}

module.exports = hasRole
