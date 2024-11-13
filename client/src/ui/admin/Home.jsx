import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import categoryService from '../../api/categoryService';
import questionService from '../../api/questionService';
import { useAuth } from '../../auth/AuthContext';

function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await questionService.getAllQuestions();
        setQuestions(data);
      } catch (error) {
        console.error('Ошибка при получении вопросов:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Ошибка при получении категорий:', error);
      }
    };

    fetchQuestions();
    fetchCategories();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setIsEditingQuestion(true);
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await questionService.deleteQuestion(id);
      setQuestions(questions.filter((q) => q.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении вопроса:', error);
    }
  };

  const handleUpdateQuestion = async (updatedQuestion) => {
    try {
      await questionService.updateQuestion(updatedQuestion.id, updatedQuestion);
      setQuestions(questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)));
      setIsEditingQuestion(false);
      setEditingQuestion(null);
    } catch (error) {
      console.error('Ошибка при обновлении вопроса:', error);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsEditingCategory(true);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await categoryService.deleteCategory(id);
      setCategories(categories.filter((c) => c.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении категории:', error);
    }
  };

  const handleUpdateCategory = async (updatedCategory) => {
    try {
      await categoryService.updateCategory(updatedCategory.id, updatedCategory);
      setCategories(categories.map((c) => (c.id === updatedCategory.id ? updatedCategory : c)));
      setIsEditingCategory(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Ошибка при обновлении категории:', error);
    }
  };

  return (
    <section className="app-admin">
      <h2 className="app-admin__title">Администраторская панель</h2>
      <div className="app-admin__content">
        {/* Секция для вопросов */}
        <h3>Вопросы</h3>
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              <span>{question.title}</span>
              <button onClick={() => handleEditQuestion(question)}>Редактировать</button> 
              <button onClick={() => handleDeleteQuestion(question.id)}>Удалить</button>
            </li>
          ))}
        </ul>

        {/* Форма редактирования вопроса */}
        {isEditingQuestion && (
          <div className="app-admin__edit-form">
            {/* ... форма для редактирования вопроса */}
            <button onClick={() => handleUpdateQuestion(editingQuestion)}>Сохранить</button>
            <button onClick={() => setIsEditingQuestion(false)}>Отмена</button>
          </div>
        )}

        {/* Секция для категорий */}
        <h3>Категории</h3>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <span>{category.name}</span>
              <button onClick={() => handleEditCategory(category)}>Редактировать</button>
              <button onClick={() => handleDeleteCategory(category.id)}>Удалить</button>
            </li>
          ))}
        </ul>

        {/* Форма редактирования категории */}
        {isEditingCategory && (
          <div className="app-admin__edit-form">
            {/* ... форма для редактирования категории */}
            <button onClick={() => handleUpdateCategory(editingCategory)}>Сохранить</button>
            <button onClick={() => setIsEditingCategory(false)}>Отмена</button>
          </div>
        )}

        {/* Кнопка выхода */}
        <button onClick={handleLogout} className="app-admin__button">
          Выйти из админ-панели
        </button>
      </div>
    </section>
  );
}

export default Home;