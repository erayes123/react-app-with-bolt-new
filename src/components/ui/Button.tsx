import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outlined' | 'text';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  position?: 'left' | 'center' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  leftIcon,
  rightIcon,
  loading = false,
  position = 'center',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors duration-200';
  const variants = {
    solid: 'bg-primary text-white hover:bg-primary/90',
    outlined: 'border-2 border-primary text-primary hover:bg-primary/10',
    text: 'text-primary hover:bg-primary/10'
  };

  const positions = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${positions[position]} inline-flex items-center gap-2 ${
        disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
};