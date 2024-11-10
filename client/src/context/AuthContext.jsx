import React, { createContext, useState, useEffect, useContext } from 'react';
import auth from '../api/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "123");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Проверка токена (может потребовать дополнительного запроса на сервер)
      setIsAuthenticated(true);
      setUser({ username: 'Пример' }); // Замените на реальные данные
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await auth.login(username, password);
      localStorage.setItem('token', response.data.token); // Сохраните токен
      setToken(response.data.token)
      setIsAuthenticated(true);
      setUser(response.data.user);
      navigate('/'); // Перенаправляем на главную страницу
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };

  const register = async (username, password) => {
    try {
      await auth.register(username, password);
      navigate('/login'); // Перенаправляем на страницу входа после успешной регистрации
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Удалите токен
    setToken("")
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login'); // Перенаправляем на страницу входа
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};