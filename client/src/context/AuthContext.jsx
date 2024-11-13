import React, { createContext, useState, useEffect, useContext } from 'react';
import auth from '../api/auth';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      // Проверка токена (может потребовать дополнительного запроса на сервер)
      setIsAuthenticated(true);
      const tokenInfo = jwtDecode(token);
      setUser(tokenInfo.userId);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await auth.login(username, password);
      console.log("RESP", response);
      localStorage.setItem('token', response.token); // Сохраните токен
      setToken(response.token)
      const tokenInfo = jwtDecode(response.token);
      setUser(tokenInfo.userId);
      setIsAuthenticated(true);
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