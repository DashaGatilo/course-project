import {useStore} from "../../store/useStore";
import categoryService from "../../api/categoryService";
import {Col, Row} from "antd";
import CategoryGridItem from "./CategoryGridItem";


export const CategoryList = () => {
    const {data, refresh} = useStore(categoryService.getAllCategories, []);

    return (
        <Row gutter={[20, 20]} wrap='wrap'>
            {
                data.map((category) =>
                    <Col key={category.id}>
                        <CategoryGridItem category={category} onDelete={refresh}/>
                    </Col>)
            }
        </Row>
    )
}