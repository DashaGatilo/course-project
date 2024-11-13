import {useParams} from "react-router-dom";
import {useStore} from "../../store/useStore";
import questionService from "../../api/questionService";
import {Button, Form, Input, List, notification, Typography} from "antd";
import answerService from "../../api/answerService";
import {useAuth} from "../../auth/AuthContext";
import {useRef} from "react";

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

    const ref = useRef();

    if (!question) {
        return '';
    }

    return (
        <div ref={ref}>
            <h2>{question.title}</h2>
            <p>
                {question.content}
            </p>
            <hr/>
            <br/>
            {
                !answers.length ?
                    'Нет ответов'
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
            <hr/>
            <Form layout='vertical' onFinish={handleCreateAnswer}>
                <Form.Item name='answer' label='Создать ответ на вопрос'>
                    <Input.TextArea/>
                </Form.Item>
                <Button htmlType='submit'>
                    Ответить
                </Button>
            </Form>
        </div>
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