import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
};
