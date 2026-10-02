import './Input.css';

function Input({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  size = 'default',
  disabled = false,
}) {
  const inputClassName = `todo-input todo-input--${size}`;

  return (
    <input
      id={id}
      className={inputClassName}
      type="text"
      aria-label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}

export default Input;
