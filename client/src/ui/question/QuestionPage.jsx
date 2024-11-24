import {useParams} from "react-router-dom";
import {useStore} from "../../store/useStore";
import questionService from "../../api/questionService";
import {Button, Col, Form, Input, List, notification, Row, Typography} from "antd";
import answerService from "../../api/answerService";
import {useAuth} from "../../auth/AuthContext";

export const QuestionPage = ({categoryId}) => {
    const {id} = useParams();
    const {user} = useAuth();
    const {data: questions} = useStore(questionService.getAllQuestions, []);

    const {data: answers, refresh: refreshAnswers} = useStore(() => answerService.getByQuestionId(id), []);

    const question = questions.filter(it => {
        if (!categoryId) {
            return true;
        }
        return question.categoryId === categoryId
    }).find(it => it.id === Number(id));

    if (!question) {
        return '';
    }

    return (
        <Row>
            <Col offset={6} span={12}>
                <Row>
                    <Col span={24}>
                        <Typography.Title level={2}>
                            {question.title}
                        </Typography.Title>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Typography.Text>
                            {question.content}
                        </Typography.Text>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        {
                            !answers.length ?
                                <Typography.Title level={3}>Нет ответов</Typography.Title>
                                :
                                <List
                                    bordered
                                    dataSource={answers}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Typography.Text>Ответ:</Typography.Text> {item.content}
                                        </List.Item>
                                    )}
                                />
                        }
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Typography.Title level={3}>
                            Добавить ответ на вопрос
                        </Typography.Title>
                        <Form layout='vertical' onFinish={handleCreateAnswer}>
                            <Form.Item name='answer' label='Ответ'>
                                <Input.TextArea/>
                            </Form.Item>
                            <Button htmlType='submit'>
                                Ответить
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    )

    function handleCreateAnswer({answer}) {
        if (answer) {
            answerService.create(id, user, answer).then(() => {
                notification.success({
                    message: 'Ответ добавлен',
                })
            }).then(refreshAnswers);
        }
    }

}