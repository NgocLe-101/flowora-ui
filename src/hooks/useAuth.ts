import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router';
import { HttpStatusCode, type AxiosError } from 'axios';
import { PATH } from '@/route/path';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
}

// Login mutation
export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: LoginCredentials) =>
      authService.login(email, password),
    onSuccess: (data) => {
      login(data.accessToken, data.refreshToken, data.user);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      navigate(PATH.DASHBOARD.fullPath);
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === HttpStatusCode.Unauthorized) {
        navigate(PATH.LOGIN.fullPath)
      }
    }
  });
}

// Register mutation
export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: RegisterCredentials) =>
      authService.register(email, password),
    onSuccess: () => {
      navigate(PATH.LOGIN.fullPath);
    },
  });
}

// Logout mutation
export function useLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        await authService.logout();
      } catch (error) {
        // Even if API call fails, clear local state
        console.error('Logout API error:', error);
      }
    },
    onSuccess: () => {
      logout();
      queryClient.clear();
      navigate(PATH.LOGIN.fullPath);
    },
  });
}

// Get current user query
export function useCurrentUser() {
  const { isAuthenticated, setUser } = useAuth();

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await authService.getCurrentUser();
      setUser(response.user);
      return response.user;
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
}
