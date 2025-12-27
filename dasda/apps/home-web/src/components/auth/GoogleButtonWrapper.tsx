import React from "react";

interface GoogleButtonWrapperProps {
  children: React.ReactNode;
}

export const GoogleButtonWrapper: React.FC<GoogleButtonWrapperProps> = ({ children }) => {
  return <div className="mt-4 sm:mt-6">{children}</div>;
};
