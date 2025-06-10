import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../AuthModal/AuthModal';
import { Link } from 'react-router-dom';
import styles from './AuthDropdown.module.css';

const AuthDropdown = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className={styles.dropdownContainer}>
      {user ? (
        <div className={styles.userMenu}>
          <span className={styles.userName}>{user.username}</span>
          <div className={styles.dropdownContent}>
            {user.role === 'admin' && (
              <Link to="/admin" className={styles.dropdownItem}>
                Панель модерации
              </Link>
            )}
            <button 
              onClick={logout}
              className={styles.dropdownItem}
            >
              Выйти
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsModalOpen(true)}
          className={styles.loginButton}
        >
          Войти
        </button>
      )}
      
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default AuthDropdown;