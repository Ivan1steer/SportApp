import { useAuth } from '../../context/AuthContext';
import ModerationPanel from '../../components/ModerationPanel/ModerationPanel';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <div>Доступ запрещён</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Административная панель</h1>
      <ModerationPanel />
    </div>
  );
};

export default AdminPage;