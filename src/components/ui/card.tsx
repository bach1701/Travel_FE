import React from 'react';

export const Card = ({ children, className } : React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={`bg-white rounded-lg shadow ${className}`}>{children}</div>
};

export const CardContent = ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={` ${className}`}>{children}</div>;
};