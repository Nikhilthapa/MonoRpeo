import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = "", ...props }) => {
  return (
    <div className="w-full">
      <label className="mb-1.5 block text-xs font-medium text-white">{label}</label>
      <input
        className={`w-full rounded-lg border border-white bg-card px-3 py-2 text-sm text-white placeholder-gray-500 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary ${error ? "border-red-500" : ""} ${className} `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

