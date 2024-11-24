import {useStore} from "../../store/useStore";
import categoryService from "../../api/categoryService";
import {Col, Row} from "antd";
import CategoryGridItem from "./CategoryGridItem";


export const CategoryList = () => {
    const {data} = useStore(categoryService.getAllCategories, []);

    return (
        <Row gutter={[20, 20]} wrap='wrap'>
            {
                data.map((category) =>
                    <Col span={6} key={category.id}>
                        <CategoryGridItem category={category}/>
                    </Col>)
            }
        </Row>
    )
}