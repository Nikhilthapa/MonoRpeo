import React from "react";

interface BackButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="mb-6 flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary-dark"
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {children}
    </button>
  );
};
