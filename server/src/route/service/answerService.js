const Answer = require("../../model/Answer");

async function createAnswer(question_id, user_id, content) {
    return await Answer.create({ question_id, user_id, content });
}

async function updateAnswer(answerId, content) {
  return await Answer.update(answerId, { content });
}

async function getAnswersByQuestionId(questionId) {
  return await Answer.getByQuestionId(questionId)
}

async function getAllAnswers() {
  return await Answer.getAll
}

async function deleteAnswer(answerId) {
  Answer.delete(answerId) 
}

async function deleteOwnAnswer(answerId, userId) {
  const foundAnswer = await Answer.getById(answerId)
  if (foundAnswer.user_id == userId) Answer.delete(answerId) 
}

module.exports = {createAnswer, updateAnswer, deleteAnswer, deleteOwnAnswer, getAnswersByQuestionId, getAllAnswers}
