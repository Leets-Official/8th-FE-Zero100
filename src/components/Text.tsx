import React from 'react';

interface Props {
  children: React.ReactNode;
  done?: boolean;
}

export const Text = ({ children, done }: Props) => {
  return (
    <span
      style={{
        textDecoration: done ? 'line-through' : 'none',
        color: done ? '#aaa' : '#333',
      }}
    >
      {children}
    </span>
  );
};