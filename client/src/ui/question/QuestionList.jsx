import React from 'react';
import {useStore} from "../../store/useStore";
import questionService from "../../api/questionService";
import {Button, Card, Col, Empty, Input, Row, Segmented,} from "antd";
import categoryService from "../../api/categoryService";
import {useQuestionsNavigation} from "./useQuestionsNavigation";
import {useSearchParams} from "react-router-dom";
import {DisplayForManager} from "../DisplayForRole";
import answerService from "../../api/answerService";

export const QuestionList = ({filtered, lastCount}) => {
    const {goToQuestionPage} = useQuestionsNavigation();
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryId = searchParams.get('categoryId');
    const [searchText, setSearchText] = React.useState(searchParams.get('search'));

    const [onlyNotAnswer, setOnlyNotAnswer] = React.useState(false);
    const {data: answers} = useStore(answerService.getAllAnswers, []);

    // todo неотвеченные вопросы фильтр для манагера, процент вопросов и ответов по вопросов страница
    // по каждой категории количество вопросов с ответами и отдельный график в целом


    const {data: questions} = useStore(async () => {
        const questions = await questionService.getAllQuestions();

        if (!lastCount) {
            return questions;
        } else {
            return questions.slice(questions.length - lastCount).reverse();
        }
    }, []);

    const {data: categories} = useStore(categoryService.getAllCategories, []);

    const filteredQuestions = questions.filter(it => {
        if (categoryId) {
            return String(it.category_id) === categoryId;
        } else {
            return true;
        }
    }).filter((it) => {
        if (searchText) {
            return it.title.toLowerCase().includes(searchText.toLowerCase()) || it.content.toLowerCase().includes(searchText.toLowerCase())
        } else {
            return true;
        }
    }).filter((question) => {
        if (onlyNotAnswer) {
            const hasAnswer = answers.some(it => it.question_id === question.id);
            return !hasAnswer;
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
                <DisplayForManager>
                    <Row>
                        <Button onClick={toggleOnlyNotAnswer}>
                            {!onlyNotAnswer ? 'Отобразить только вопросы без ответов' : 'Отобразить все'}
                        </Button>
                    </Row>
                </DisplayForManager>
                <Row>
                    {
                        filtered &&
                        <Input
                            placeholder='Поиск' value={searchText}
                            onChange={(e) => handleChangeSearch(e.target.value)}/>
                    }
                </Row>
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

    function toggleOnlyNotAnswer() {
        setOnlyNotAnswer(pr => !pr);
    }

    function getCategoryById(categoryId) {
        return categories.find(c => c.id === categoryId);
    }

    function handleChangeSearch(search) {
        const url = new URLSearchParams(searchParams);
        if (search) {
            url.set('search', search);
        } else {
            url.delete('search');
        }
        setSearchParams(url);
        setSearchText(search)
    }

    function updateFilter(id) {
        const url = new URLSearchParams(searchParams);
        if (id) {
            url.set('categoryId', id);
        } else {
            url.delete('categoryId');
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