import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearTokens,
} from "@/services/authService";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://192.168.64.4:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/* -----------------------------------------------------
   REQUEST: attach access token
----------------------------------------------------- */
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// /* -----------------------------------------------------
//    RESPONSE: refresh on 401 → retry once
// ----------------------------------------------------- */
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const is401 = error.response?.status === 401;

    if (is401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = getRefreshToken();
      if (!refresh) {
        clearTokens();
        return Promise.reject(error);
      }

      try {
        const resp = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken: refresh,
        });

        const { accessToken, refreshToken } = resp.data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (_e) {
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(_e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

