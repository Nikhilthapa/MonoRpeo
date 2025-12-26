"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardContentArea } from "@/components/sections/DashboardContentArea";
import { DashboardHeader } from "@/components/sections/DashboardHeader";
import { DashboardInfoCard } from "@/components/sections/DashboardInfoCard";
import { DashboardLayout } from "@/components/sections/DashboardLayout";
import { Button } from "@hirenova/ui";
import { ROUTES } from "@/constants";
import { clearStoredUser, getStoredUser } from "@/lib/auth";

function DashboardContent() {
  const router = useRouter();
  const [user, setUser] = useState<{ firstName: string; lastName: string; email: string } | null>(
    null
  );

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser({
        firstName: storedUser.firstName,
        lastName: storedUser.lastName,
        email: storedUser.email,
      });
    }
  }, []);

  const handleLogout = () => {
    clearStoredUser();
    router.push(ROUTES.SIGNUP);
  };

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout>
      <DashboardHeader>Welcome, {user.firstName}!</DashboardHeader>

      <DashboardContentArea>
        <DashboardInfoCard label="Full Name" value={`${user.firstName} ${user.lastName}`} />
        <DashboardInfoCard label="Email" value={user.email} />
      </DashboardContentArea>

      <Button variant="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </DashboardLayout>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
