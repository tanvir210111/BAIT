import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('bait_admin_token');
    const storedUser = localStorage.getItem('bait_admin_user');

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    if (data?.token && data?.user) {
      localStorage.setItem('bait_admin_token', data.token);
      localStorage.setItem('bait_admin_user', JSON.stringify(data.user));
      setUser(data.user);
    }
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout
  };
}

export default useAuth;
