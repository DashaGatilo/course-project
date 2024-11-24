import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../auth/AuthContext';
import {Button, Col, Form, Input, Row, Typography} from "antd";
import {REQUIRED_RULE} from "../util/validation-rules";

function Register() {
    const {register} = useAuth();
    const navigate = useNavigate();

    return (
        <Row>
            <Col span={12} offset={6}>
                <Typography.Title level={2}>
                    Регистрация
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
                    <Button size='large' htmlType="submit">Зарегистрироваться</Button>
                </Form>
            </Col>
        </Row>
    );

    function handleFinish({username, password}) {
        register(username, password).then(() => navigate('/'))
    }
}

export default Register;