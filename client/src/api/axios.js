import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.API_URL || 'http://localhost:3000'; // Замените на URL вашего сервера

export const axiosClient = axios.create({
    baseURL: API_URL,
})



const AxiosInterceptor = ({ children }) => {
    const { logout, token } = useAuth();
    useEffect(() => {
        const interceptorRequest = axiosClient.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token')
                console.log("🚀 ~ useEffect ~ config:", config)
                if (!token) return config;
                config.headers['Authorization'] = `Bearer ${token}`;
                return config;
            },
            (error) => {
                console.log("🚀 ~ useEffect ~ error:", error)
                return Promise.reject(error);
            }
        );
        
        const interceptorResponse = axiosClient.interceptors.request.use(
            (res) => {
                console.log("🚀 ~ useEffect ~ res:", res)
                return res;
            },
            async (err) => {
                console.log("🚀 ~ err:", err)
                if (err.response.status === 401) {
                    logout()
                }
        
                return Promise.reject(err);
            }
        );

        return () => {
            axiosClient.interceptors.response.eject(interceptorRequest);
            axiosClient.interceptors.response.eject(interceptorResponse);
        };
    }, []);
    return children;
};

export default axiosClient;
export { AxiosInterceptor };
