import React from 'react';
import AppNavbarButton from './AppNavbarButton';

function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header__container">
        <h1 className="app-header__title">Название приложения</h1>
        <div className="app-header__buttons">
          <AppNavbarButton
            label="Вход"
            to="/login"
            icon="user-circle"
          />
          <AppNavbarButton
            label="Регистрация"
            to="/register"
            icon="user-plus"
          />
        </div>
      </div>
    </header>
  );
}

export default AppHeader;