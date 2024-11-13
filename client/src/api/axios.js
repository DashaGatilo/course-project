import axios from 'axios';
import {useEffect} from 'react';
import {useAuth} from '../context/AuthContext';

const API_URL = import.meta.env.API_URL || 'http://localhost:3000'; // Замените на URL вашего сервера

export const axiosClient = axios.create({
    baseURL: API_URL,
})

const interceptorRequest = axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (!token) return config;
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosClient.interceptors.response.eject(interceptorRequest);


const AxiosInterceptor = ({children}) => {
    const {logout} = useAuth();
    useEffect(() => {
        function listener(event) {
            const error = event.reason;
            if (error?.response?.status === 401) {
                logout();
            }
        }

        window.addEventListener('unhandledrejection', listener);

        return () => window.removeEventListener('unhandledrejection', listener);
    }, []);
    return children;
};

export default axiosClient;
export {AxiosInterceptor};
