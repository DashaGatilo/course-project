import React, {useEffect, useState} from 'react';
import CategoryGridItem from '../category/CategoryGridItem';
import categoryService from '../../api/categoryService';

function AppCategory() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await categoryService.getAllCategories();
            setCategories(data);
        };

        fetchCategories();
    }, []);

    return (
        <section className="app-category">
            <h2 className="app-category__title">Категории</h2>
            <div className="app-category__grid">
                {categories.map((category) => (
                    <CategoryGridItem key={category.id} category={category}/>
                ))}
            </div>
        </section>
    );
}

export default AppCategory;