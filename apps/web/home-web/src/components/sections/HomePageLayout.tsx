import React from "react";

interface HomePageLayoutProps {
  children: React.ReactNode;
}

export const HomePageLayout: React.FC<HomePageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#110128] via-[#1a0538] to-[#0d0217]">
      {children}
    </div>
  );
};
