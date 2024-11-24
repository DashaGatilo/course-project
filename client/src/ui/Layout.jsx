import React from 'react';
import {Outlet} from 'react-router-dom';
import AppHeader from './AppHeader';
import {Layout as AntdLayout} from 'antd';


function Layout() {
    return (
        <AntdLayout style={{minHeight: "100vh"}}>
            <AppHeader/>
            <AntdLayout.Content style={{padding: '16px'}}>
                <Outlet/>
            </AntdLayout.Content>
        </AntdLayout>
    );
}

export default Layout;