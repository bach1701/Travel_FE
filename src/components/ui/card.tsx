import React from 'react';

export const Card = ({ children, className } : React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={`bg-white rounded-lg shadow ${className}`}>{children}</div>
};

export const CardContent = ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};