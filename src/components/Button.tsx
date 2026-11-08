import React from 'react';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  secondary?: boolean;
}

export const Button = ({
  children,
  onClick,
  danger,
  secondary,
}: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '10px 24px',
        border: secondary ? '1px solid #e2e8f0' : 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        backgroundColor: danger
          ? '#e53e3e'
          : secondary
          ? '#ffffff'
          : '#000000',
        color: secondary ? '#334155' : '#ffffff',
        fontSize: '15px',
        fontWeight: 600,
      }}
    >
      {children}
    </button>
  );
};