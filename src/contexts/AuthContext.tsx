import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  setAccessToken,
  setRefreshToken,
  getRefreshToken,
  clearTokens,
  authService,
} from '@/services/authService';

interface User {
  id: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      const refreshToken = getRefreshToken();
      
      if (!refreshToken) {
        setIsLoading(false);
        return;
      }

      try {
        // Try to refresh token on app load
        const response = await authService.refreshToken(refreshToken);
        setAccessToken(response.accessToken);
        setRefreshToken(response.refreshToken);

        // Fetch current user
        const userResponse = await authService.getCurrentUser();
        setUser(userResponse.user);
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        clearTokens();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (accessToken: string, refreshToken: string, user: User) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(user);
  };

  const logout = () => {
    clearTokens();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
