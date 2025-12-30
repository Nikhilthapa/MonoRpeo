'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getStoredUser, clearStoredUser, UserData } from '@/lib/auth';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser?.token) {
      router.push('/signup');
      return;
    }
    setUser(storedUser);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    clearStoredUser();
    router.push('/signup');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Logo />
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Welcome to Your Dashboard
          </h1>

          {/* Info Cards */}
          <div className="space-y-4 mb-8">
            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="text-sm text-gray-400 mb-1">Full Name</p>
              <p className="font-semibold text-white">
                {user.firstName} {user.lastName}
              </p>
            </div>

            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="text-sm text-gray-400 mb-1">Email</p>
              <p className="font-semibold text-white">{user.email}</p>
            </div>

            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="text-sm text-gray-400 mb-1">Phone</p>
              <p className="font-semibold text-white">{user.phone || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

