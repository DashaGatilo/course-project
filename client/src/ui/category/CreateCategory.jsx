import {Button, Col, Form, Input, Row, Typography} from "antd";
import {REQUIRED_RULE} from "../../util/validation-rules";
import categoryService from "../../api/categoryService";
import {useNavigate} from "react-router-dom";


export const CreateCategory = () => {
    const navigate = useNavigate();

    return (
        <>
            <Row>
                <Col offset={6} span={12}>
                    <Typography.Title level={2}>
                        Создание категории
                    </Typography.Title>
                </Col>
            </Row>
            <Row>
                <Col offset={6} span={12}>
                    <Form onFinish={handleCreate} layout='vertical'>
                        <Form.Item required rules={[REQUIRED_RULE]} name='title' label='Имя'>
                            <Input/>
                        </Form.Item>
                        <Form.Item required rules={[REQUIRED_RULE]} name='content' label='Описание'>
                            <Input.TextArea/>
                        </Form.Item>
                        <Button size='large' type='primary' htmlType='submit'>
                            Создать
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    )

    function handleCreate({title, content}) {
        categoryService.createCategory(title, content).then(() => {
            navigate('/categories')
        })
    }
}