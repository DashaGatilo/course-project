import React from 'react';
import {Button, Card, notification} from "antd";
import {useQuestionsNavigation} from "../question/useQuestionsNavigation";
import {DisplayForManager} from "../DisplayForRole";
import categoryService from "../../api/categoryService";

function CategoryGridItem({category, onDelete}) {
    const {goToCategoryQuestions} = useQuestionsNavigation();
    return (
        <Card title={category.name} extra={<Button type='link' onClick={handleOpen}>Открыть вопросы</Button>}>
            {category.description}
            <DisplayForManager>
                <Button onClick={handleDelete}>
                    Удалить
                </Button>
            </DisplayForManager>
        </Card>
    );

    function handleOpen() {
        goToCategoryQuestions(category.id);
    }

    function handleDelete() {
        categoryService.deleteCategory(category.id).then(() => {
            onDelete();
            notification.success({
                message: 'Успешно удалена категория!'
            })
        }).catch((error) => {
            if (error.response?.data?.error?.errno === 1451) {
                notification.error({
                    message: 'У категории есть вопросы!'
                })
            } else {
                throw error;
            }
        })
    }
}

export default CategoryGridItem;