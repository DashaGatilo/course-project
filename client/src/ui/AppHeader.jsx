import React from 'react';
import {useAuth} from "../auth/AuthContext";
import {Button, Layout, Menu, Typography} from "antd";
import {useQuestionsNavigation} from "./question/useQuestionsNavigation";
import {useLocation, useNavigate} from "react-router-dom";
import {useProfileNavigation} from "./profile/useProfileNavigation";
import {DisplayForAdmin, DisplayForManager} from "./DisplayForRole";
import {useUserNavigate} from "./admin/useUserNavigate";

const {Header, Content, Footer} = Layout;

function AppHeader() {
    const {isAuthenticated, userRole, logout} = useAuth();
    const {goToCreateQuestion, goToAllQuestion} = useQuestionsNavigation();
    const {goToMyProfile} = useProfileNavigation();
    const {goToUserListPage} = useUserNavigate();

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Header style={{display: 'flex', alignItems: 'center'}}>
            <Typography.Title
                style={{color: 'gray', marginBottom: 0, cursor: 'pointer'}}
                onClick={() => navigate('/')}
                type='secondary'>
                Название приложения
            </Typography.Title>
            <Menu
                selectedKeys={[]}
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[location.pathname]}
                style={{flex: 1, minWidth: 0, display: 'flex', justifyContent: 'end'}}>
                {
                    !isAuthenticated &&
                    <>
                        <Menu.Item key={1}>
                            <Button type='link' onClick={() => navigate('/login')}>
                                Вход
                            </Button>
                        </Menu.Item>
                        <Menu.Item key={2}>
                            <Button type='link' onClick={() => navigate('/register')}>
                                Регистрация
                            </Button>
                        </Menu.Item>
                    </>
                }
                {
                    isAuthenticated &&
                    <>
                        <DisplayForAdmin>
                            <Menu.Item key='users'>
                                <Button onClick={goToUserListPage}>
                                    Список пользователей
                                </Button>
                            </Menu.Item>
                        </DisplayForAdmin>
                        <DisplayForManager>
                            <Menu.Item key='categories'>
                                <Button onClick={() => navigate('/categories')}>
                                    Список категорий
                                </Button>
                            </Menu.Item>
                        </DisplayForManager>
                        <DisplayForManager>
                            <Menu.Item key='create-category'>
                                <Button onClick={() => navigate('/create-category')}>
                                    Создать категорию
                                </Button>
                            </Menu.Item>
                        </DisplayForManager>
                        <Menu.Item key={3}>
                            <Button onClick={goToCreateQuestion}>Создать вопрос</Button>
                        </Menu.Item>
                        <Menu.Item key={4}>
                            <Button onClick={goToAllQuestion}>
                                Вопросы
                            </Button>
                        </Menu.Item>
                        <Menu.Item key={5}>
                            <Button onClick={goToMyProfile}>
                                Профиль
                            </Button>
                        </Menu.Item>
                        <Menu.Item key='logout'>
                            <Button onClick={() => logout()}>
                                Выйти
                            </Button>
                        </Menu.Item>
                    </>
                }
            </Menu>
        </Header>
    );
}

export default AppHeader;