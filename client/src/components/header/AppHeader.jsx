import React from 'react';
import AppNavbarButton from './AppNavbarButton';
import {useAuth} from "../../context/AuthContext";

function AppHeader() {
  const {isAuthenticated} = useAuth();

  console.log("HEADER", isAuthenticated);
  return (
    <header className="app-header">
      <div className="app-header__container">
        <h1 className="app-header__title">Название приложения</h1>
        <div className="app-header__buttons">
          {
            !isAuthenticated && <AppNavbarButton
                label="Вход"
                to="/login"
                icon="user-circle"
            />
          }
          {!isAuthenticated && <AppNavbarButton
            label="Регистрация"
            to="/register"
            icon="user-plus"
          />}
        </div>
      </div>
    </header>
  );
}

export default AppHeader;