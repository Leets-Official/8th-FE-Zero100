import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = ({ value, onChange, onKeyDown }: Props) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="할 일을 입력하세요..."
      style={{
        padding: '6px 10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        flex: 1,
      }}
    />
  );
};