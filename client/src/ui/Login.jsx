import {Button, Col, Form, Input, Row, Typography} from 'antd';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../auth/AuthContext';
import {REQUIRED_RULE} from "../util/validation-rules";


function Login() {
    const {login} = useAuth();
    const navigate = useNavigate();

    return (
        <Row>
            <Col span={12} offset={6}>
                <Typography.Title level={2}>
                    Вход
                </Typography.Title>
                <Form layout='vertical' onFinish={handleFinish}>
                    <Form.Item
                        label='Имя пользователя:' required={true} name='username'
                        rules={[REQUIRED_RULE, {type: 'email', message: 'Введите корректный email'},]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item rules={[REQUIRED_RULE]} label='Пароль' required name='password'>
                        <Input.Password/>
                    </Form.Item>
                    <Row>
                        <Col span={1} offset={20}>
                            <Button size='large' htmlType="submit">Войти</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );

    function handleFinish({username, password}) {
        login(username, password).then(() => navigate('/'))
    }
}

export default Login;