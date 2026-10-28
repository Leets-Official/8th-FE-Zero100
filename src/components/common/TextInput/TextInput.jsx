import { useId } from 'react';

const TextInput = ({
  label,
  helperText,
  error,
  id,
  placeholder = '텍스트를 입력하세요',
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className="common-component common-field">
      {label && (
        <label className="common-field__label" htmlFor={inputId}>
          {label}
        </label>
      )}

      <input
        {...props}
        id={inputId}
        placeholder={placeholder}
        className="common-input"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
      />

      {error && (
        <span id={errorId} className="common-field__error" role="alert">
          {error}
        </span>
      )}

      {!error && helperText && (
        <span id={helperId} className="common-field__helper">
          {helperText}
        </span>
      )}
    </div>
  );
};

export default TextInput;
