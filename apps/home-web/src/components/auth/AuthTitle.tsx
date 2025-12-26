import React from "react";

interface AuthTitleProps {
  children: React.ReactNode;
  variant?: "gradient" | "white";
}

export const AuthTitle: React.FC<AuthTitleProps> = ({ children, variant = "gradient" }) => {
  if (variant === "gradient") {
    return <span className="bg-gradient-primary bg-clip-text text-transparent">{children}</span>;
  }
  return <span className="text-white">{children}</span>;
};
