import React from "react";

interface LogoProps {
  className?: string;
  text?: string;
  initial?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "", text = "HireNova", initial = "H" }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary shadow-lg">
        <span className="text-base font-bold text-white">{initial}</span>
      </div>
      <span className="text-lg font-medium text-white">{text}</span>
    </div>
  );
};

