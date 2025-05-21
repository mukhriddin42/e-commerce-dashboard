import React from 'react';

export function Button({ children, onClick, className }) {
  return (
    <button
      className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
