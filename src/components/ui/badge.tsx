import React from 'react';

export const Badge = ({ children, variant = 'default'} : {children: React.ReactNode, variant?: 'default' | 'secondary' }) => {
  const variants = {
    default: 'bg-blue-500 text-white',
    secondary: 'bg-primary text-white'
  };
  return <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${variants[variant]}`}>{children}</span>
}