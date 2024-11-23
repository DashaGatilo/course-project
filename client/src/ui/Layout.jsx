import React from 'react';
import {Outlet} from 'react-router-dom';
import AppHeader from './AppHeader';
import {Layout as AntdLayout} from 'antd';


function Layout() {
    return (
        <AntdLayout>
            <AppHeader/>
            <AntdLayout.Content>
                <Outlet/>
            </AntdLayout.Content>
        </AntdLayout>
    );
}

export default Layout;