import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { mockRequests } from '../../types/types';

const CreateRequestForm = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', address: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newRequest = {
      id: mockRequests.length + 1,
      data: { ...formData, sportTypes: [], tags: [], images: [], location: { lat: 0, lng: 0 }, tariffs: [], description: '' },
      status: "pending",
      userId: user.id,
      createdAt: new Date().toISOString()
    };

    mockRequests.push(newRequest);
    alert('Заявка отправлена на модерацию!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={e => setFormData({...formData, name: e.target.value})}
        placeholder="Название"
        required
      />
      <input
        value={formData.address}
        onChange={e => setFormData({...formData, address: e.target.value})}
        placeholder="Адрес"
        required
      />
      <button type="submit" disabled={!user}>
        {user ? 'Отправить на модерацию' : 'Войдите для отправки'}
      </button>
    </form>
  );
};