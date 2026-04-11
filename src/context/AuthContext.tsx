import React, { createContext, useCallback, useEffect, useState } from 'react';
import { authAPI } from '../api/auth';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  shop_id: string | null;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  /**
   * Authenticates user and returns redirect URL from backend.
   * Returns: redirect_url string if backend provides it, null as fallback
   * Stores tokens and user data in state and localStorage on success
   */
  loginUser: (email: string, password: string) => Promise<string | null>;
  logoutUser: () => Promise<void>;
  registerUser: (
    full_name: string,
    email: string,
    password: string,
    phone_number?: string
  ) => Promise<void>;
  clearError: () => void;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const accessToken = localStorage.getItem('access_token');

    if (storedUser && accessToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    }
    setLoading(false);
  }, []);

  const loginUser = useCallback(async (email: string, password: string): Promise<string | null> => {
    try {
      setError(null);
      setLoading(true);

      const response = await authAPI.login({ email, password });

      // Store JWT tokens in localStorage for API requests
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);

      // Store user data in localStorage and state for UI context
      const userData = response.user;
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      // Return redirect_url from backend
      // Backend determines where user should go based on their role:
      // - is_staff=True (SuperAdmin, ShopAdmin) → /admin/
      // - is_staff=False (Cashier, etc.) → /dashboard
      // Falls back to null if not provided, allowing Login.tsx to handle fallback logic
      return response.redirect_url || null;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        'Login failed. Please check your credentials.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const registerUser = useCallback(
    async (
      full_name: string,
      email: string,
      password: string,
      phone_number?: string
    ) => {
      try {
        setError(null);
        setLoading(true);

        await authAPI.register({
          full_name,
          email,
          password,
          phone_number,
        });

        // Registration successful - user needs to verify email
        // Don't set user state, just clear loading
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.detail ||
          err.response?.data?.email?.[0] ||
          err.response?.data?.password?.[0] ||
          'Registration failed. Please try again.';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logoutUser = useCallback(async () => {
    try {
      setError(null);
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        await authAPI.logout({ refresh: refreshToken });
      }

      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    } catch (err: any) {
      // Even if logout fails on server, clear local state
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    loginUser,
    logoutUser,
    registerUser,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};