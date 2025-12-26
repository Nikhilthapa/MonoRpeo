import React from "react";

interface DashboardContentAreaProps {
  children: React.ReactNode;
}

export const DashboardContentArea: React.FC<DashboardContentAreaProps> = ({ children }) => {
  return <div className="mb-8 space-y-4">{children}</div>;
};
