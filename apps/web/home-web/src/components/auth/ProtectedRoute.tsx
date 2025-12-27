"use client";

import React from "react";

import { useRequireAuth } from "@/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  loadingText?: string;
  loadingComponent?: React.ReactNode;
}

export const ProtectedRoute = ({
  children,
  redirectTo,
  loadingText = "Loading...",
  loadingComponent,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useRequireAuth({ redirectTo });

  if (isLoading) {
    if (loadingComponent) {
      return <>{loadingComponent}</>;
    }
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-white">{loadingText}</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
