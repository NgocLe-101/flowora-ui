export type Path = {
  name: string;
  fullPath: string;
};

const path = (name: string, full: string): Path => ({ name, fullPath: full });

export const PATH = {
  ROOT: path("/", "/"),
  LOGIN: path("login", "/login"),
  SIGNUP: path("signup", "/signup"),
  AUTH_CALLBACK: path("auth/callback", "/auth/callback"),
  DASHBOARD: path("dashboard", "/dashboard"),
} as const;

