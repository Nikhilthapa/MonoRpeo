const AUTH_COOKIE_NAME = "auth_token";

export const setAuthCookie = (token: string): void => {
  if (typeof document === "undefined") return;

  const maxAge = 7 * 24 * 60 * 60;
  document.cookie = `${AUTH_COOKIE_NAME}=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

export const getAuthCookie = (): string | null => {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  const authCookie = cookies.find((cookie) => cookie.trim().startsWith(`${AUTH_COOKIE_NAME}=`));

  if (!authCookie) return null;

  return authCookie.split("=")[1]?.trim() || null;
};

export const clearAuthCookie = (): void => {
  if (typeof document === "undefined") return;

  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
};
