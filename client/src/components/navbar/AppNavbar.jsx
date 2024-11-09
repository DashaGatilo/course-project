import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function AppNavbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Перенаправляем на страницу входа
  };

  return (
    <nav className="app-navbar">
      <div className="app-navbar__container">
        <Link to="/" className="app-navbar__logo">
          <img src="/assets/logo.svg" alt="Логотип" />
        </Link>
        <ul className="app-navbar__menu">
          <li className="app-navbar__menu-item">
            <Link to="/">Главная</Link>
          </li>
          {isAuthenticated && (
            <li className="app-navbar__menu-item">
              <Link to="/create-question">Создать вопрос</Link>
            </li>
          )}
          {isAuthenticated && (
            <li className="app-navbar__menu-item">
              <Link to="/create-category">Создать категорию</Link>
            </li>
          )}
          {isAuthenticated ? (
            <li className="app-navbar__menu-item">
              <button onClick={handleLogout} className="app-navbar__button">
                Выйти
              </button>
            </li>
          ) : (
            <>
              <li className="app-navbar__menu-item">
                <Link to="/login" className="app-navbar__button">
                  Вход
                </Link>
              </li>
              <li className="app-navbar__menu-item">
                <Link to="/register" className="app-navbar__button">
                  Регистрация
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default AppNavbar;