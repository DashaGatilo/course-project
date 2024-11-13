import { Button, Input } from 'antd';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
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
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <div>
        <label htmlFor="username">Имя пользователя:</label>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Пароль:</label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" onClick={handleSubmit}>Войти</Button>
    </form>
  );
}

export default Login;