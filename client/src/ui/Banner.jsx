import React from 'react';
import {Button, Space, Typography} from 'antd';
import {useQuestionsNavigation} from "./question/useQuestionsNavigation";

function Banner() {

    const {goToCreateQuestion} = useQuestionsNavigation();

    return (
        <Space align='center' direction='vertical' style={{width: '100%'}}>
            <Typography.Title level={2}>Добро пожаловать на сайт вопросов и ответов!</Typography.Title>
            <Typography.Title level={3}>
                Задайте свой вопрос и получите ответ от экспертов.
            </Typography.Title>
            <Button onClick={goToCreateQuestion}>Создать вопрос</Button>
        </Space>
    );

}

export default Banner;