import React from 'react';

interface DashboardAlignedItemProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Component that ensures items align with the "Admin Dashboard" text
 * Both header and main content use 2rem top padding, so items using this
 * component will align horizontally
 */
export function DashboardAlignedItem({ children, className }: DashboardAlignedItemProps) {
  return (
    <div
      className={className}
      style={{
        // This ensures alignment with Admin Dashboard text
        // Both header (padding: '2rem 2rem 0 2rem') and main (padding: '2rem')
        // have 2rem top padding, so items at the top of their containers align
        marginTop: 0,
        paddingTop: 0,
      }}
    >
      {children}
    </div>
  );
}

