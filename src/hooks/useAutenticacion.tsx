import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('church_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    // Mock login
    if (email === 'admin@iglesia.com' && password === 'admin123') {
      const newUser = { id: '1', email };
      setUser(newUser);
      localStorage.setItem('church_user', JSON.stringify(newUser));
      return true;
    }
    // Also allow any registered user (simulated)
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const found = registeredUsers.find((u: any) => u.email === email && u.password === password);
    if (found) {
      const newUser = { id: found.id, email: found.email };
      setUser(newUser);
      localStorage.setItem('church_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('church_user');
  };

  const register = (email: string, password: string) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const newUser = { id: Date.now().toString(), email, password };
    registeredUsers.push(newUser);
    localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
