import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  register?: UseFormRegister<any>;
  name: string;
  validation?: object;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isMultiline?: boolean;
  rows?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  register,
  name,
  validation = {},
  leftIcon,
  rightIcon,
  isMultiline = false,
  rows = 3,
  ...props
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Prevent space as first character
    if (e.key === ' ' && (e.target as HTMLInputElement).selectionStart === 0) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData('text');
    if (pastedText.startsWith(' ')) {
      e.preventDefault();
      const cleanText = pastedText.trimStart();
      const target = e.target as HTMLInputElement;
      const start = target.selectionStart || 0;
      const end = target.selectionEnd || 0;
      const currentValue = target.value;
      const newValue = currentValue.substring(0, start) + cleanText + currentValue.substring(end);
      target.value = newValue;
    }
  };

  const inputProps = register ? {
    ...register(name, {
      ...validation,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // Remove leading spaces on change
        if (e.target.value.startsWith(' ')) {
          e.target.value = e.target.value.trimStart();
        }
      },
    }),
  } : {};

  const baseClassName = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
    error ? 'border-red-500' : 'border-gray-300'
  } ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''}`;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        {isMultiline ? (
          <textarea
            {...inputProps}
            {...props}
            rows={rows}
            className={`${baseClassName} resize-none`}
          />
        ) : (
          <input
            {...inputProps}
            {...props}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            className={baseClassName}
          />
        )}
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};