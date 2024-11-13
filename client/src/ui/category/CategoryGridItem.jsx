import React from 'react';

function CategoryGridItem({ category }) {
  return (
    <div className="app-category-grid-item">
      <h3 className="app-category-grid-item__title">{category.name}</h3>
      {/* Добавьте сюда контент для категории */}
    </div>
  );
}

export default CategoryGridItem;