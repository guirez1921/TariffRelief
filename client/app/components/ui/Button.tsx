 import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'| 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
}
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  fullWidth = false,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: 'bg-blue-800 hover:bg-blue-900 text-white focus:ring-blue-600',
    secondary: 'bg-red-700 hover:bg-red-800 text-white focus:ring-red-500',
    outline: 'bg-transparent border border-blue-800 text-blue-800 hover:bg-blue-50 focus:ring-blue-600',
    ghost: 'bg-transparent text-white border border-white hover:text-blue-100 hover:border-blue-100 focus:ring-blue-600',
    white: 'bg-white text-blue-800 border border-white hover:bg-gray-50 focus:ring-gray-500'
  };
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3'
  };
  const widthClass = fullWidth ? 'w-full' : '';
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
  if (href) {
    return (
      <Link to={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};