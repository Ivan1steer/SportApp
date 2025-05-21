import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import AuthDropdown from '../AuthDropdown/AuthDropdown';

// components/Header/Header.tsx
const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        
        {/* Навигационные ссылки */}
        <div>
          <Link to="/" className={styles.link}>Спортобъекты</Link>
          <Link to="/trainers" className={styles.link}>Тренеры</Link>
          <Link to="/events" className={styles.link}>Афиша</Link>
        </div>

        {/* Кнопка авторизации справа */}
        <div className={styles.authSection}>
          <AuthDropdown />
        </div>
      </nav>
    </header>
  );
};
export default Header;