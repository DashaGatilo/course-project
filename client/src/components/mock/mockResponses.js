// Моковые ответы для API
const mockResponses = {
    '/api/categories': [
      { id: 1, name: 'Категория 1' },
      { id: 2, name: 'Категория 2' },
      { id: 3, name: 'Категория 3' },
    ],
    '/api/categories/1': { id: 1, name: 'Категория 1' },
    '/api/questions': [
      { id: 1, title: 'Вопрос 1', description: 'Описание вопроса 1' },
      { id: 2, title: 'Вопрос 2', description: 'Описание вопроса 2' },
      { id: 3, title: 'Вопрос 3', description: 'Описание вопроса 3' },
    ],
    '/api/questions/1': { id: 1, title: 'Вопрос 1', description: 'Описание вопроса 1' },
    // Добавьте моковые ответы для других API-маршрутов
  };
  
  export default mockResponses;