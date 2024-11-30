import React, {useMemo, useState} from 'react';
import {Col, Row, Segmented, Typography} from "antd";
import {useStore} from "../../store/useStore";
import questionService from "../../api/questionService";
import {Chart} from "react-charts";
import categoryService from "../../api/categoryService";
import answerService from "../../api/answerService";


const StatisticType = {
    CATEGORY_TO_COUNT_QUESTION: 'CATEGORY_TO_COUNT_QUESTION',
    CATEGORY_TO_ANSWER: 'CATEGORY_TO_ANSWER',
}

export const ChartsPage = () => {
    const {data: questions} = useStore(questionService.getAllQuestions, []);
    const {data: categories} = useStore(categoryService.getAllCategories, []);
    const {data: answers} = useStore(answerService.getAllAnswers, []);

    const [activeDisplayData, setActiveDisplay] = useState(StatisticType.CATEGORY_TO_COUNT_QUESTION);

    const categoryToCountQuestion = useMemo(() => {
        return categories.map((category) => {
            const count = questions.filter((q) => q.category_id === category.id).length;
            return {name: category.name, count};
        });
    }, [questions, categories]);

    const categoryToAnswers = useMemo(() => {
        return categories.map((category) => {
            const categoryQuestions = questions.filter((q) => q.category_id === category.id);
            const count = categoryQuestions.map(q => {
                return answers.filter(it => it.question_id === q.id).length;
            }).reduce((partialSum, a) => partialSum + a, 0);
            return {name: category.name, count};
        });
    }, [questions, categories, answers]);

    // Пример данных для графика
    const data = [
        {
            label: getTitleToDisplayDataChart(activeDisplayData), // Название серии данных
            data: getDataToChart(activeDisplayData),
        },
    ]

    // Настройки осей
    const primaryAxis = useMemo(
        () => ({
            getValue: (datum) => datum.name, // Категория (ось X)
        }),
        []
    );

    const secondaryAxes = useMemo(
        () => ({
            getValue: (datum) => datum.count, // Количество вопросов (ось Y)
        }),
        []
    );

    const options = Object.keys(StatisticType).map(key => ({
        label: getTitleToDisplayDataChart(key),
        value: key,
    }));

    if (!categoryToCountQuestion.length || !categoryToAnswers.length) {
        return 'Loading'
    }

    return (
        <>
            <Row>
                <Col offset={3} span={12}>
                    <Typography.Title level={2}>
                        Статистика
                    </Typography.Title>
                </Col>
            </Row>
            <Row>
                <Col offset={3} span={12}>
                    <Segmented
                        value={activeDisplayData}
                        options={options}
                        onChange={(value) => setActiveDisplay(value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col offset={3} span={12}>
                    <div style={{width: '1000px', height: '400px'}}>
                        <Chart
                            options={{
                                data,
                                primaryAxis: primaryAxis,
                                secondaryAxes: [secondaryAxes]
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </>
    )

    function getDataToChart(activeDisplayData) {
        if (activeDisplayData === StatisticType.CATEGORY_TO_COUNT_QUESTION) {
            return categoryToCountQuestion;
        }
        if (activeDisplayData === StatisticType.CATEGORY_TO_ANSWER) {
            return categoryToAnswers;
        }

        return categoryToCountQuestion;
    }

    function getTitleToDisplayDataChart(activeDisplayData) {
        if (activeDisplayData === StatisticType.CATEGORY_TO_COUNT_QUESTION) {
            return 'Количество вопросов по категориям'
        }
        if (activeDisplayData === StatisticType.CATEGORY_TO_ANSWER) {
            return 'Количество ответов по категориям'
        }
    }
}