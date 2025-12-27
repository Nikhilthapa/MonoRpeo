import React from "react";

interface DashboardInfoCardProps {
  label: string;
  value: string;
}

export const DashboardInfoCard: React.FC<DashboardInfoCardProps> = ({ label, value }) => {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <p className="mb-1 text-sm text-gray-400">{label}</p>
      <p className="font-semibold text-white">{value}</p>
    </div>
  );
};
