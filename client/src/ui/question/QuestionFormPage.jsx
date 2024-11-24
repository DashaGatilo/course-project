import {Button, Col, Form, Input, notification, Row, Select, Typography} from "antd";
import {useStore} from "../../store/useStore";
import categoryService from "../../api/categoryService";
import questionService from "../../api/questionService";
import {useAuth} from "../../auth/AuthContext";
import {useQuestionsNavigation} from "./useQuestionsNavigation";
import {REQUIRED_RULE} from "../../util/validation-rules";

export const QuestionFormPage = () => {
    const {data: categories} = useStore(categoryService.getAllCategories, []);
    const {user} = useAuth()
    const categorySelectOptions = categories?.map(it => ({label: it.name, value: it.id}));
    const {goToQuestionPage} = useQuestionsNavigation();

    return (
        <>
            <Row>
                <Col offset={6} span={12}>
                    <Typography.Title level={2}>
                        Создание вопроса
                    </Typography.Title>
                </Col>
            </Row>
            <Row>
                <Col offset={6} span={12}>
                    <Form onFinish={handleSubmit} layout='vertical'>
                        <Form.Item required rules={[REQUIRED_RULE]} name='title' label='Заголовок'>
                            <Input/>
                        </Form.Item>
                        <Form.Item required rules={[REQUIRED_RULE]} name='content' label='Тело вопроса'>
                            <Input.TextArea/>
                        </Form.Item>
                        <Form.Item required rules={[REQUIRED_RULE]} name='category_id' label='Категория'>
                            <Select options={categorySelectOptions}/>
                        </Form.Item>
                        <Button size='large' type='primary' htmlType='submit'>
                            Создать
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    )

    function handleSubmit(data) {
        questionService.createQuestion({...data, 'user_id': user})
            .then(goToQuestionPage)
            .then(() => {
                notification.success({
                    message: 'Вопрос создан'
                })
            })
    }
}