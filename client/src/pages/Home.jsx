import React, { useState, useEffect } from 'react';
import CategoryGridItem from '../components/category/CategoryGridItem';
import categoryService from '../api/categoryService';
import Banner from '../components/main/Banner';

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Ошибка при получении категорий:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <main className="app-main">
      <Banner />
      <section className="app-category">
        <h2 className="app-category__title">Категории</h2>
        <div className="app-category__grid">
          {categories.map((category) => (
            <CategoryGridItem key={category.id} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;