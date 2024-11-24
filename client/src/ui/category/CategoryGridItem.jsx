import React from 'react';
import {Button, Card} from "antd";
import {useQuestionsNavigation} from "../question/useQuestionsNavigation";

function CategoryGridItem({category}) {
    const {goToCategoryQuestions} = useQuestionsNavigation();
    return (
        <Card title={category.name} extra={<Button type='link' onClick={handleOpen}>Открыть вопросы</Button>}>
            {category.description}
        </Card>
    );

    function handleOpen() {
        goToCategoryQuestions(category.id);
    }
}

export default CategoryGridItem;