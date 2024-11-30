import React from 'react';
import ReactDOM from 'react-dom/client';
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
import {ProfilePage} from "./ui/profile/ProfilePage";
import {UserList} from "./ui/admin/UserList";
import 'antd/dist/reset.css';
import {CategoryList} from "./ui/category/CategoryList";
import {CreateCategory} from "./ui/category/CreateCategory";
import {QuestionList} from "./ui/question/QuestionList";
import {QuestionPage} from "./ui/question/QuestionPage";
import {QuestionFormPage} from "./ui/question/QuestionFormPage";
import {ChartsPage} from "./ui/manager/ChartsPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
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
                            <Route path='categories' element={<CategoryList/>}/>
                            <Route path='create-category' element={<CreateCategory/>}/>
                            <Route path='questions' element={<QuestionList filtered/>}/>
                            <Route path="questions/:id" element={<QuestionPage/>}/>
                            <Route path='questions/create-question' element={<QuestionFormPage/>}/>
                            <Route path='charts' element={<ChartsPage/>}/>
                        </Route>

                        <Route element={<AuthGuard/>}>
                            <Route path="/admin" element={<Layout/>}>
                                <Route index element={<HomeAdmin/>}/>
                            </Route>
                        </Route>

                        <Route path='*' element={<NotFound/>}/>

                    </Routes>
                </ConfigProvider>
            </AxiosInterceptor>
        </AuthProvider>
    </Router>
);