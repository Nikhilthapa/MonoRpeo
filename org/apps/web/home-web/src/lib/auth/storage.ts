import type { UserData } from "@/types";

import { setAuthCookie, clearAuthCookie } from "./cookies";

export const getStoredUser = (): UserData | null => {
  if (typeof window === "undefined") return null;

  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const setStoredUser = (user: UserData): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("user", JSON.stringify(user));
  setAuthCookie(user.token);
};

export const clearStoredUser = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("user");
  clearAuthCookie();
};

export const getToken = (): string | null => {
  const user = getStoredUser();
  return user?.token || null;
};
