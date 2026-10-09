import React from 'react';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

export const Button = ({ children, onClick, danger }: Props) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: danger ? '#e53e3e' : '#3182ce',
        color: '#fff',
      }}
    >
      {children}
    </button>
  );
};