const Question = require("../../model/Question");


async function getAllQuestions() {
    return await Question.getAll()
}

async function getQuestionById(questionId) {
    return await Question.getById(questionId)
}

async function createQuestion(title, content, categoryId, userId) {
    return await Question.create({ title, content, categoryId, userId })
}

async function updateQuestion(questionId, title, content, categoryId, userId) {
    return await Question.update(questionId, { title, content, categoryId, userId })
}

async function deleteQuestion() {
    await Question.delete(questionId);
}

module.exports = { getAllQuestions, getQuestionById, createQuestion, updateQuestion, deleteQuestion }
