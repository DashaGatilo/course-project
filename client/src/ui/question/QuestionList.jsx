import React from 'react';
import {useStore} from "../../store/useStore";
import questionService from "../../api/questionService";
import {Button, Card, Space,} from "antd";
import categoryService from "../../api/categoryService";
import {useQuestionsNavigation} from "./useQuestionsNavigation";

export const QuestionList = () => {
    const {goToQuestionPage} = useQuestionsNavigation();
    const {data: questions} = useStore(questionService.getAllQuestions, []);
    const {data: categories} = useStore(categoryService.getAllCategories, []);

    return (
        <Space direction='vertical' align='center' style={{width: '100%'}}>
            {
                questions.map(it => {
                    return (
                        <Card title={it.title} style={{width: 300}} key={it.id}
                              extra={<Button onClick={() => goToQuestionPage(it.id)} type='link'>Подробнее...</Button>}>
                            <p>{it.content}</p>
                            <p>Категория: {getCategoryById(it.category_id)?.name ?? 'Отсутствует'}</p>
                        </Card>
                    )
                })
            }

        </Space>
    )

    function getCategoryById(categoryId) {
        return categories.find(c => c.id === categoryId);
    }
}