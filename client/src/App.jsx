import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from './components/header/AppHeader';
import AppMain from './components/navbar/AppMain';
import AppAdmin from './components/navbar/AppAdmin';
import AppLogin from './components/navbar/AppLogin';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppHeader />
        <Routes>
          <Route path="/" element={<AppMain />} />
          <Route path="/admin" element={<AppAdmin />} />
          <Route path="/login" element={<AppLogin />} />
          {/* Добавьте другие маршруты для других компонентов */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;