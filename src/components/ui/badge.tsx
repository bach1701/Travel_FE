import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'secondary';
}) => {
  const base = 'inline-block px-2 py-1 text-xs font-medium rounded';
  const variants = {
    default: 'bg-blue-500 text-white',
    secondary: 'bg-gray-200 text-gray-800',
  };
  return <span className={`${base} ${variants[variant]}`}>{children}</span>;
};
