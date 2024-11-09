import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContex from '../../context/AuthContext';

function AppLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(username, password);
      navigate('/'); // Перенаправляем на главную страницу после успешного логина
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };

  return (
    <section className="app-login">
      <h2 className="app-login__title">Вход</h2>
      <form onSubmit={handleSubmit} className="app-login__form">
        <div className="app-login__input-group">
          <label htmlFor="username" className="app-login__label">
            Имя пользователя:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="app-login__input"
          />
        </div>
        <div className="app-login__input-group">
          <label htmlFor="password" className="app-login__label">
            Пароль:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="app-login__input"
          />
        </div>
        <button type="submit" className="app-login__button">
          Войти
        </button>
      </form>
    </section>
  );
}

export default AppLogin;