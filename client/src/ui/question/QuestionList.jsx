import React from 'react';
import {useStore} from "../../store/useStore";
import questionService from "../../api/questionService";
import {Button, Card, Col, Row,} from "antd";
import categoryService from "../../api/categoryService";
import {useQuestionsNavigation} from "./useQuestionsNavigation";

export const QuestionList = () => {
    const {goToQuestionPage} = useQuestionsNavigation();
    const {data: questions} = useStore(questionService.getAllQuestions, []);
    const {data: categories} = useStore(categoryService.getAllCategories, []);

    return (
        <Row gutter={[20, 20]} wrap='wrap'>
            {
                questions.map(it => (
                    <Col key={it.id}>
                        <QuestionView
                            question={it} getCategoryById={getCategoryById}
                            goToQuestionPage={goToQuestionPage}/>
                    </Col>
                ))
            }
        </Row>

    )

    function getCategoryById(categoryId) {
        return categories.find(c => c.id === categoryId);
    }
}

const QuestionView = ({question, getCategoryById, goToQuestionPage}) => {

    return (
        <Card
            title={question.title} style={{width: 300}} key={question.id}
            extra={<Button onClick={() => goToQuestionPage(question.id)}
                           type='link'>Подробнее...</Button>}>
            <p>{question.content}</p>
            <p>Категория: {getCategoryById(question.category_id)?.name ?? 'Отсутствует'}</p>
        </Card>
    )
}