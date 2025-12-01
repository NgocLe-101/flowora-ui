import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import { PATH } from '@/route/path';
import { Loader2 } from 'lucide-react';
import { setAccessToken, setRefreshToken, authService } from '@/services/authService';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { login, setUser } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get('accessToken');
      const refreshToken = params.get('refreshToken');

      if (accessToken && refreshToken) {
        try {
          // Store tokens
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);

          // Fetch actual user data
          const response = await authService.getCurrentUser();
          const user = response.user;

          // Update auth context
          login(accessToken, refreshToken, user);
          
          navigate(PATH.DASHBOARD.fullPath, { replace: true });
        } catch (error) {
          console.error('Failed to complete authentication:', error);
          navigate(PATH.LOGIN.fullPath, { replace: true });
        }
      } else {
        navigate(PATH.LOGIN.fullPath, { replace: true });
      }
    };

    handleCallback();
  }, [login, navigate, setUser]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-lg">Completing sign in...</p>
      </div>
    </div>
  );
}
