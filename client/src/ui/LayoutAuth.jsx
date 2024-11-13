import React from 'react';
import { Outlet } from 'react-router-dom';
import Banner from './Banner';

function LayoutAuth() {
    return (
        <main className="app-main">
            <Banner />
            <Outlet />
        </main>
    );
}

export default LayoutAuth;