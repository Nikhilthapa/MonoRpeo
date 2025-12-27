"use client";

import { useState, useEffect } from "react";

import { getStoredUser } from "@/lib/auth";
import type { UserData } from "@/types";

interface UseAuthReturn {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  return {
    user,
    isAuthenticated: !!user?.token,
    isLoading,
  };
};
