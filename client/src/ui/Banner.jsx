import React from 'react';
import {Space, Typography} from 'antd';

function Banner() {

    return (
        <Space align='center' direction='vertical' style={{width: '100%'}}>
            <Typography.Title level={2}>Добро пожаловать на сайт вопросов и ответов!</Typography.Title>
            <Typography.Title level={3}>
                Задайте свой вопрос и получите ответ от экспертов.
            </Typography.Title>
        </Space>
    );

}

export default Banner;