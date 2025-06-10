import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './ModerationPanel.module.css';

interface Request {
  id: number;
  data: {
    name: string;
    address: string;
    // другие поля организации
  };
  status: string;
  userId: number;
  createdAt: string;
}

const ModerationPanel = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/requests');
        if (!response.ok) throw new Error('Failed to fetch requests');
        const data = await response.json();
        setRequests(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRequests();
  }, []);

  const handleDecision = async (requestId: number, approved: boolean) => {
    try {
      const response = await fetch(`http://localhost:5000/api/requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: approved ? 'approved' : 'rejected' }),
      });
      
      if (!response.ok) throw new Error('Failed to update request');
      
      setRequests(requests.map(req => 
        req.id === requestId ? { ...req, status: approved ? 'approved' : 'rejected' } : req
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  if (user?.role !== 'admin') return null;
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className={styles.panel}>
      <h2>Заявки на модерации</h2>
      {requests.filter(r => r.status === 'pending').length === 0 ? (
        <div className={styles.empty}>Нет заявок на модерации</div>
      ) : (
        <div className={styles.requestsList}>
          {requests
            .filter(r => r.status === 'pending')
            .map(request => (
              <div key={request.id} className={styles.requestCard}>
                <h3>{request.data.name}</h3>
                <p>Адрес: {request.data.address}</p>
                <p>Дата подачи: {request.createdAt}</p>
                
                <div className={styles.actions}>
                  <button 
                    onClick={() => handleDecision(request.id, true)}
                    className={styles.approveButton}
                  >
                    Одобрить
                  </button>
                  <button 
                    onClick={() => handleDecision(request.id, false)}
                    className={styles.rejectButton}
                  >
                    Отклонить
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ModerationPanel;