import React from 'react';
import Banner from './Banner';
import {QuestionList} from "./question/QuestionList";
import {Col, Row, Typography} from "antd";
import {CategoryList} from "./category/CategoryList";

function Home() {
    return (
        <Row>
            <Col offset={6} span={12}>
                <Row gutter={[20, 20]}>
                    <Row>
                        <Banner/>
                    </Row>
                    <Row>
                        <Typography.Title level={2}>
                            Категории
                        </Typography.Title>
                        <CategoryList/>
                    </Row>
                    <Row wrap='wrap'>
                        <Typography.Title level={2}>
                            Последние вопросы
                        </Typography.Title>
                        <QuestionList limit={3}/>
                    </Row>
                </Row>
            </Col>
        </Row>
    );
}

export default Home;