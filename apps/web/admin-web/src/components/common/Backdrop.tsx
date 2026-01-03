'use client';

interface BackdropProps {
  isOpen: boolean;
  onClick: () => void;
}

/**
 * Backdrop component for sidebar overlay
 * Dark semi-transparent background that closes sidebar on click
 */
export function Backdrop({ isOpen, onClick }: BackdropProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
        transition: 'opacity 0.3s ease',
      }}
    />
  );
}

