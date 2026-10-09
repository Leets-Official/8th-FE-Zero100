import './Input.css';

function Input({
  value,
  onChange,
  placeholder,
  onKeyDown,
  className = '',
  'aria-label': ariaLabel,
  ...rest
}) {
  return (
    <input
      className={`text-input ${className}`.trim()}
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      aria-label={ariaLabel || placeholder}
      {...rest}
    />
  );
}

export default Input;
