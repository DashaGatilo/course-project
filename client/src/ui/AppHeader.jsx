import React from 'react';
import AppNavbarButton from './AppNavbarButton';
import {useAuth} from "../auth/AuthContext";
import {Button} from "antd";
import {useQuestionsNavigation} from "./question/useQuestionsNavigation";
import {useNavigate} from "react-router-dom";
import {GoToUsersPageLink} from "./admin/GoToUsersPageLink";

function onlyForRoles(roles) {

}

function AppHeader() {
    const {isAuthenticated, userRole} = useAuth();
    const navigate = useNavigate();
    const {goToCreateQuestion, goToAllQuestion} = useQuestionsNavigation();

    return (
        <header className="app-header">
            <div className="app-header__container">
                <h1 className="app-header__title" onClick={() => navigate('/')}>Название приложения</h1>
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

                    {isAuthenticated && <Button onClick={goToCreateQuestion}>Создать вопрос</Button>}
                    {isAuthenticated && <Button onClick={goToAllQuestion}>Вопросы</Button>}
                    <GoToUsersPageLink/>

                </div>
            </div>
        </header>
    );
}

export default AppHeader;