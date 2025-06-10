import React, { FormEvent, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../api';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { auth } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const userData = await login({ username, password });
      auth(userData.role);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка авторизации');
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
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