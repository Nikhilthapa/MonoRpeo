"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ROUTES } from "@/constants";

import { useAuth } from "./useAuth";

interface UseRequireAuthOptions {
  redirectTo?: string;
}

export const useRequireAuth = (options: UseRequireAuthOptions = {}) => {
  const { redirectTo = ROUTES.LOGIN } = options;
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);

  return {
    isAuthenticated,
    isLoading,
  };
};
