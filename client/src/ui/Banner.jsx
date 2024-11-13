import React from 'react';
import {Button} from 'antd';
import {useQuestionsNavigation} from "./question/useQuestionsNavigation";

function Banner() {

    const {goToCreateQuestion} = useQuestionsNavigation();

    return (
        <section className="app-banner">
            <div className="app-banner__container">
                <h2 className="app-banner__title">Добро пожаловать на сайт вопросов и ответов!</h2>
                <p className="app-banner__description">
                    Задайте свой вопрос и получите ответ от экспертов.
                </p>
                <Button onClick={goToCreateQuestion}>Создать вопрос</Button>
            </div>
        </section>
    );

}

export default Banner;