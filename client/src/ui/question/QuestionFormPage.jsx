import {Button, Form, Input, notification, Select} from "antd";
import {useStore} from "../../store/useStore";
import categoryService from "../../api/categoryService";
import questionService from "../../api/questionService";
import {useAuth} from "../../auth/AuthContext";
export const QuestionFormPage = () => {
    const {data: categories} = useStore(categoryService.getAllCategories, []);
    const {user} = useAuth()
    const categorySelectOptions = categories?.map(it => ({label: it.name, value: it.id}));

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name='title' label='Заголовок'>
                <Input/>
            </Form.Item>
            <Form.Item name='content' label='Тело вопроса'>
                <Input.TextArea/>
            </Form.Item>
            <Form.Item name='category_id' label='Категория'>
                <Select options={categorySelectOptions}/>
            </Form.Item>
            <Button type='primary' htmlType='submit'>
                Создать
            </Button>
        </Form>
    )

    function handleSubmit(data) {
        questionService.createQuestion({...data, 'user_id': user})
            .then(() => {
                notification.success({
                    message: 'Вопрос создан'
                })
            })
    }
}