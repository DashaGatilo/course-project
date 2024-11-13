import React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';

function Layout() {
    return (
        <main>
            <AppHeader />
            <Outlet />
        </main>
    );
}

export default Layout;