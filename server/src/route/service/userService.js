const User = require("../../model/user");

async function createUser(username, password) {
    return await User.create({ username, password })
}

async function getUserById(userId) {
    return await User.getById(userId);
}

async function updateUser(userId, username, password, role) {
    return await User.update(userId, { username, password, role })
}

async function deleteUser(userId) {
    await User.delete(userId);
}

async function getAllUsers() {
    return await User.getAll()
}

async function getUserByUsername(username) {
    return await User.getByUsername(username)
}

module.exports = {createUser, login, getUserById, updateUser, deleteUser, getUserByUsername, getAllUsers}
