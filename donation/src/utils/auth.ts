/* Authentication utilities - Connected to backend */

import { SessionData } from '../types';
import { apiClient } from './api-client';

const SESSION_KEY = '_dmsSession';
const AUTH_TOKEN_KEY = '_authToken';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: 'donor' | 'admin' | 'organization';
}

export interface AuthResponse {
  token: string;
  user: SessionData;
}

/* ─── Session Management ─── */

export const getSession = (): SessionData | null => {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
};

export const setSession = (session: SessionData): void => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const clearSession = (): void => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem('dms_thanks');
};

export const isAuthenticated = (): boolean => {
  return !!getSession() && !!getAuthToken();
};

/* ─── Authentication API Calls ─── */

export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    if (response.success && response.data) {
      setAuthToken(response.data.token);
      setSession(response.data.user);
      return true;
    }

    console.error('Login failed:', response.error);
    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export const register = async (
  email: string,
  password: string,
  name: string,
  role: 'donor' | 'admin' | 'organization'
): Promise<boolean> => {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/register', {
      email,
      password,
      name,
      role,
    });

    if (response.success && response.data) {
      setAuthToken(response.data.token);
      setSession(response.data.user);
      return true;
    }

    console.error('Registration failed:', response.error);
    return false;
  } catch (error) {
    console.error('Registration error:', error);
    return false;
  }
};

export const logout = (): void => {
  clearSession();
  redirectTo('/login');
};

/* ─── Navigation ─── */

export const redirectTo = (url: string, delay: number = 0): void => {
  if (delay > 0) {
    setTimeout(() => {
      window.location.href = url;
    }, delay);
  } else {
    window.location.href = url;
  }
};
