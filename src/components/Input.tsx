import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

export const Input = ({
  value,
  onChange,
  onKeyDown,
  placeholder = '내용을 입력하세요.',
  type = 'text',
}: Props) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '12px 14px',
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        outline: 'none',
        boxSizing: 'border-box',
        fontSize: '14px',
      }}
    />
  );
};