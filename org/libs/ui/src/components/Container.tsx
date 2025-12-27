import React from "react";

interface ContainerProps {
  variant?: "website" | "dashboard" | "full";
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  variant = "website",
  children,
  className = "",
}) => {
  const variantClasses = {
    website: "px-6 sm:px-8 md:px-12 lg:px-[120px]",
    dashboard: "px-4 sm:px-6 md:px-8 lg:px-[32px]",
    full: "px-0",
  };

  return <div className={`w-full ${variantClasses[variant]} ${className}`}>{children}</div>;
};

