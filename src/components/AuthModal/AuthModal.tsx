import React, { FormEvent, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './AuthModal.module.css';
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AuthModal: React.FC<AuthModalProps> =  ({ isOpen, onClose }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { auth } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login === 'admin' && password === 'admin123') {
      auth('admin');
      onClose();
    } else if (login === 'user' && password === 'user123') {
      auth('user');
      onClose();
    } else {
      setError('Неверный логин или пароль');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button 
          onClick={onClose}
          className={styles.closeButton}
        >
          &times;
        </button>
        
        <h2>Авторизация</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {error && <div className={styles.error}>{error}</div>}
          
          <button type="submit" className={styles.submitButton}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
export default AuthModal;