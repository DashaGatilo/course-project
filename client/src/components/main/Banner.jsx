import React from 'react';

function Banner() {
  return (
    <section className="app-banner">
      <div className="app-banner__container">
        <h2 className="app-banner__title">Добро пожаловать на сайт вопросов и ответов!</h2>
        <p className="app-banner__description">
          Задайте свой вопрос и получите ответ от экспертов.
        </p>
        <button className="app-banner__button">Создать вопрос</button>
      </div>
    </section>
  );
}

export default Banner;