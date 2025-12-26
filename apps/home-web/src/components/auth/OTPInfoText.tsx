import React from "react";

interface OTPInfoTextProps {
  children: React.ReactNode;
}

export const OTPInfoText: React.FC<OTPInfoTextProps> = ({ children }) => {
  return <p className="text-center text-sm text-gray-400">{children}</p>;
};
