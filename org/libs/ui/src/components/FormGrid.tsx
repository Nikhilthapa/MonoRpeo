import React from "react";

interface FormGridProps {
  children: React.ReactNode;
}

export const FormGrid: React.FC<FormGridProps> = ({ children }) => {
  return <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">{children}</div>;
};

