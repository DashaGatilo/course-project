const Category = require("../../model/Category");

async function getAllCategories() {
    return await Category.getAll()
}

async function getCategoryById(categoryId) {
    return await Category.getById(categoryId)
}

async function createCategory(name, description) {
    return await Category.create({ name, description });
}

async function updateCategory(categoryId, name, description) {
    return await Category.update(categoryId, { name, description });
}

async function deleteCategory(categoryId) {
    return await Category.delete(categoryId)
}

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory }
