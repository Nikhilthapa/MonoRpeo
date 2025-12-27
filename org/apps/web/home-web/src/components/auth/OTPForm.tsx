import React from "react";

interface OTPFormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

export const OTPForm: React.FC<OTPFormProps> = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {children}
    </form>
  );
};
