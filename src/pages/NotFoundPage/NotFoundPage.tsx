import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => (
  <div className={styles.container}>
    <h1>404</h1>
    <p>Страница не найдена</p>
    <Link to="/" className={styles.link}>
      Вернуться на главную
    </Link>
  </div>
);

export default NotFoundPage;