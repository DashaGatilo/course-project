import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import HomeAdmin from './pages/admin/Home';
import AuthGuard from './guards/AuthGuard';
import { AxiosInterceptor } from './api/axios';
import NotFound from './pages/NotFound';
import { ConfigProvider } from 'antd';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <div className="App">
    <Router>
      <AuthProvider>
        <AxiosInterceptor>
          <ConfigProvider>
            <Routes>

              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              <Route element={<AuthGuard />}>
                <Route path="/admin" element={<Layout />}>
                  <Route index element={<HomeAdmin />} />
                </Route>
              </Route>

              <Route path='*' element={<NotFound />} />

            </Routes>
          </ConfigProvider>
        </AxiosInterceptor>
      </AuthProvider>
    </Router>
  </div>
);