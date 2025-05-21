// components/AuthDropdown/AuthDropdown.tsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../AuthModal/AuthModal';
import styles from './AuthDropdown.module.css';
import { Link } from 'react-router-dom';

const AuthDropdown = () => {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.wrapper}>
      {user ? (
        <div className={styles.userMenu}>
          <button className={styles.userButton}>
            👤 {user.username}
          </button>
          <div className={styles.dropdown}>
            {user.role === 'admin' && (
              <Link to="/admin" className={styles.dropdownItem}>
                🛠 Админ-панель
              </Link>
            )}
            <button 
              onClick={logout}
              className={styles.dropdownItem}
            >
              🚪 Выйти
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setShowModal(true)}
          className={styles.loginButton}
        >
          🔑 Войти
        </button>
      )}
      
      <AuthModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};
export default AuthDropdown;