import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import AuthDropdown from '../AuthDropdown/AuthDropdown';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        
        {/* Навигационные ссылки */}
        <div>
          <Link to="/" className={styles.link}>Спортобъекты</Link>
          <Link to="/trainers" className={styles.link}>Тренеры</Link>
          <Link to="/events" className={styles.link}>Афиша</Link>
          
          {/* Ссылка на админку только для администраторов */}
          {user?.role === 'admin' && (
            <Link to="/admin" className={styles.link}>Модерация</Link>
          )}
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