import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Layout from './ui/Layout';
import Login from './ui/Login';
import Register from './ui/Register';
import {AuthProvider} from './auth/AuthContext';
import Home from './ui/Home';
import HomeAdmin from './ui/admin/Home';
import AuthGuard from './auth/AuthGuard';
import {AxiosInterceptor} from './api/axios';
import NotFound from './ui/NotFound';
import {ConfigProvider} from 'antd';
import {QuestionsRoute} from "./ui/question/QuestionsRoute";
import {ProfilePage} from "./ui/profile/ProfilePage";
import {UserList} from "./ui/admin/UserList";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className="App">
        <Router>
            <AuthProvider>
                <AxiosInterceptor>
                    <ConfigProvider>
                        <Routes>

                            <Route path="/" element={<Layout/>}>
                                <Route index element={<Home/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>

                                <Route path='users' element={<UserList/>}/>
                                <Route path='profile/:id' element={<ProfilePage/>}/>
                                <Route path='profile' element={<ProfilePage/>}/>
                            </Route>

                            <Route element={<AuthGuard/>}>
                                <Route path="/admin" element={<Layout/>}>
                                    <Route index element={<HomeAdmin/>}/>
                                </Route>
                            </Route>

                            <Route path='questions/*' element={<QuestionsRoute/>}/>

                            <Route path='*' element={<NotFound/>}/>

                        </Routes>
                    </ConfigProvider>
                </AxiosInterceptor>
            </AuthProvider>
        </Router>
    </div>
);