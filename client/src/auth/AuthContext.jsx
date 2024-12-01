import React, {createContext, useContext, useEffect, useState} from 'react';
import auth from '../api/auth';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(undefined)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
            // Проверка токена (может потребовать дополнительного запроса на сервер)
            setIsAuthenticated(true);
            const tokenInfo = jwtDecode(token);
            setUser(tokenInfo.userId);
            setUserRole(tokenInfo.userRole)
        }
    }, []);

    const login = async (username, password) => {
        const response = await auth.login(username, password);
        localStorage.setItem('token', response.token); // Сохраните токен
        setToken(response.token)
        const tokenInfo = jwtDecode(response.token);
        setUser(tokenInfo.userId);
        setUserRole(tokenInfo.userRole)
        setIsAuthenticated(true);
    };

    const register = async (username, password) => {
        await auth.register(username, password);
    };

    const logout = () => {
        localStorage.removeItem('token'); // Удалите токен
        setToken("")
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login'); // Перенаправляем на страницу входа
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, user, token, login, register, logout, userRole}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};