import {useParams} from "react-router-dom";
import {useStore} from "../../store/useStore";
import questionService from "../../api/questionService";
import {Button, Col, Form, Input, List, notification, Row, Typography} from "antd";
import answerService from "../../api/answerService";
import {useAuth} from "../../auth/AuthContext";
import {formatDate} from "../../util/formatDate";
import {OnlyAuthorized} from "../OnlyAuthorized";
import {ResolveQuestionButton} from "../manager/ResolveQuestionButton";

export const QuestionPage = () => {
    const {id} = useParams();
    const {user} = useAuth();
    const {data: questions, refresh: refreshQuestion} = useStore(questionService.getAllQuestions, []);

    const {data: answers, refresh: refreshAnswers} = useStore(() => answerService.getByQuestionId(id), []);

    const question = questions.find(it => it.id === Number(id));

    const [form] = Form.useForm();

    if (!question) {
        return '';
    }

    return (
        <Row>
            <Col offset={6} span={12}>
                <Row>
                    <Col span={24}>
                        <Row>
                            <Typography.Title level={2}>
                                {question.title}
                            </Typography.Title>
                        </Row>
                        <Row>
                            <Typography.Text type='secondary' level={2}>
                                Статус: {question.status}
                            </Typography.Text>
                        </Row>
                        <Row>
                            <ResolveQuestionButton question={question} onSuccess={refreshQuestion}/>
                        </Row>
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
                                            <Typography.Text>Ответ: {item.content}</Typography.Text>
                                            <Typography.Text>
                                                Дата создания: {formatDate(item.created_at)}
                                            </Typography.Text>
                                        </List.Item>
                                    )}
                                />
                        }
                    </Col>
                </Row>
                {
                    question.status === 'pending' &&
                    <OnlyAuthorized>
                        <Row>
                            <Col span={24}>
                                <Typography.Title level={3}>
                                    Добавить ответ на вопрос
                                </Typography.Title>
                                <Form form={form} layout='vertical' onFinish={handleCreateAnswer}>
                                    <Form.Item name='answer' label='Ответ'>
                                        <Input.TextArea/>
                                    </Form.Item>
                                    <Button htmlType='submit'>
                                        Ответить
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </OnlyAuthorized>
                }
            </Col>
        </Row>
    )

    function handleCreateAnswer({answer}) {
        if (answer) {
            answerService.create(id, user, answer).then(() => {
                form.resetFields();
                notification.success({
                    message: 'Ответ добавлен',
                })
            }).then(refreshAnswers);
        }
    }

}