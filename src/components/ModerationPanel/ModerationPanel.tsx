import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { mockRequests, mockOrganizations } from '../../types/types';

const ModerationPanel = () => {
  const { user } = useContext(AuthContext);

  const handleDecision = (requestId: number, approved: boolean) => {
    const request = mockRequests.find(r => r.id === requestId);
    if (!request) return;

    request.status = approved ? 'approved' : 'rejected';
    
    if (approved) {
      mockOrganizations.push({
        id: mockOrganizations.length + 1,
        ...request.data,
        rating: 0 // Начальный рейтинг
      });
    }
  };

  if (user?.role !== 'admin') return null;

  return (
    <div className="moderation-panel">
      <h2>Заявки на модерации</h2>
      {mockRequests
        .filter(r => r.status === 'pending')
        .map(request => (
          <div key={request.id} className="request-card">
            <h3>{request.data.name}</h3>
            <p>{request.data.address}</p>
            <div>
              <button onClick={() => handleDecision(request.id, true)}>✅ Одобрить</button>
              <button onClick={() => handleDecision(request.id, false)}>❌ Отклонить</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ModerationPanel;