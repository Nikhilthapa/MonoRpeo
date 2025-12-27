import React from "react";

interface DashboardHeaderProps {
  children: React.ReactNode;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ children }) => {
  return (
    <h1 className="mb-6 bg-gradient-primary bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
      {children}
    </h1>
  );
};
