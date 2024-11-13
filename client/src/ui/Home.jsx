import React, {useEffect, useState} from 'react';
import CategoryGridItem from './category/CategoryGridItem';
import categoryService from '../api/categoryService';
import Banner from './Banner';
import {QuestionList} from "./question/QuestionList";
import {useAuth} from "../auth/AuthContext";

function Home() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await categoryService.getAllCategories();
            setCategories(data);
        };

        fetchCategories();
    }, []);

    return (
        <main className="app-main">
            <Banner/>
            <section className="app-category">
                <h2 className="app-category__title">Вопросы</h2>
                <QuestionList/>
            </section>
            <section className="app-category">
                <h2 className="app-category__title">Категории</h2>
                <div className="app-category__grid">
                    {categories.map((category) => (
                        <CategoryGridItem key={category.id} category={category}/>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Home;