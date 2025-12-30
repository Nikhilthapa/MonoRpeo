import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background';
  
  const variantStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
  };

  return (
    <button
      className={`${variantStyles[variant]} ${baseStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

