import React from 'react';
import {Card} from "antd";

function CategoryGridItem({category}) {
    return (
        <Card title={category.name}>
            {category.description}
        </Card>
    );
}

export default CategoryGridItem;