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
                        <Col>
                            <Row>
                                <Typography.Title level={2}>
                                    Категории
                                </Typography.Title>
                            </Row>
                            <Row>
                                <CategoryList/>
                            </Row>
                        </Col>

                    </Row>
                    <Row wrap='wrap'>
                        <Col>
                            <Row>
                                <Typography.Title level={2}>
                                    Последние вопросы
                                </Typography.Title>
                            </Row>
                            <Row>
                                <QuestionList lastCount={3}/>
                            </Row>
                        </Col>
                    </Row>
                </Row>
            </Col>
        </Row>
    );
}

export default Home;