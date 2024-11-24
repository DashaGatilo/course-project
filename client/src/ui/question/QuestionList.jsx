import React from 'react';
import {useStore} from "../../store/useStore";
import questionService from "../../api/questionService";
import {Button, Card, Col, Empty, Row, Segmented,} from "antd";
import categoryService from "../../api/categoryService";
import {useQuestionsNavigation} from "./useQuestionsNavigation";
import {useSearchParams} from "react-router-dom";

export const QuestionList = ({filtered}) => {
    const {goToQuestionPage} = useQuestionsNavigation();
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryId = searchParams.get('categoryId');

    const {data: questions} = useStore(questionService.getAllQuestions, []);
    const {data: categories} = useStore(categoryService.getAllCategories, []);

    const filteredQuestions = questions.filter(it => {
        if (categoryId) {
            return String(it.category_id) === categoryId;
        } else {
            return true;
        }
    });

    const options = categories?.map(category => ({
        label: category.name,
        value: String(category.id)
    })).concat({
        label: 'Сбросить фильтр',
        value: undefined
    });

    return (
        <Row gutter={[20, 30]}>
            <Col offset={3} span={18}>
                {filtered &&
                    <Row>
                        <Col offset={3} span={18}>
                            <Segmented
                                value={categoryId}
                                options={options}
                                onChange={(value) => updateFilter(value)}
                            />
                        </Col>
                    </Row>
                }
                <Row gutter={[20, 20]} wrap='wrap'>
                    {
                        filteredQuestions.length > 0 ?
                            filteredQuestions.map(it => (
                                <Col key={it.id}>
                                    <QuestionView
                                        question={it} getCategoryById={getCategoryById}
                                        goToQuestionPage={goToQuestionPage}/>
                                </Col>
                            )) : <Col offset={8}> <Empty description='Нет вопросов'/></Col>
                    }
                </Row>
            </Col>
        </Row>

    )

    function getCategoryById(categoryId) {
        return categories.find(c => c.id === categoryId);
    }

    function updateFilter(id) {
        const url = new URLSearchParams();
        if (id) {
            url.set('categoryId', id);
        }
        setSearchParams(url);
    }

}

const QuestionView = ({
                          question, getCategoryById, goToQuestionPage
                      }) => {

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