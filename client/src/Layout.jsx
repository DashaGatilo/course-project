import React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from './components/header/AppHeader';

function Layout() {
    return (
        <main>
            <AppHeader />
            <Outlet />
        </main>
    );
}

export default Layout;