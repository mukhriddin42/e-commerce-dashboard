import React from 'react';

export function Card({ children, className }) {
  return (
    <div className={`p-4 rounded shadow bg-white ${className || ''}`}>
      {children}
    </div>
  );
}