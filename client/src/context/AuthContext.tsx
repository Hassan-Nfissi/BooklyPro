import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';
import { User, Business } from '../types';

interface AuthContextType {
  user: User | null;
  business: Business | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  googleLogin: (idToken: string) => Promise<void>;
  devLogin: (email?: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('booklypro_token'));
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data.user);
      setBusiness(res.data.business);
    } catch {
      localStorage.removeItem('booklypro_token');
      setToken(null);
      setUser(null);
      setBusiness(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMe();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleAuthSuccess = (data: { token: string; user: User; business: Business }) => {
    localStorage.setItem('booklypro_token', data.token);
    setToken(data.token);
    setUser(data.user);
    setBusiness(data.business);
  };

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    handleAuthSuccess(res.data);
  };

  const register = async (data: any) => {
    const res = await api.post('/auth/register', data);
    handleAuthSuccess(res.data);
  };

  const googleLogin = async (idToken: string) => {
    const res = await api.post('/auth/google', { idToken });
    handleAuthSuccess(res.data);
  };

  const devLogin = async (email?: string) => {
    const res = await api.post('/auth/dev-login', { email });
    handleAuthSuccess(res.data);
  };

  const logout = () => {
    localStorage.removeItem('booklypro_token');
    setToken(null);
    setUser(null);
    setBusiness(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        business,
        token,
        loading,
        login,
        register,
        googleLogin,
        devLogin,
        logout,
        refreshUser: fetchMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
