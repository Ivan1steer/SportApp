import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: number;
  username: string;
  role: 'user' | 'admin';
  ownedRequests: number[];
}

interface AuthContextType {
  user: User | null;
  auth: (role: 'admin' | 'user') => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const auth = (role: 'admin' | 'user') => {
    setUser({
      id: role === 'admin' ? 1 : 2,
      username: role,
      role,
      ownedRequests: []
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, auth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};