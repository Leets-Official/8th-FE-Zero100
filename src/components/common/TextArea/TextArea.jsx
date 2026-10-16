import { useId } from 'react';

const TextArea = ({
  label,
  helperText,
  error,
  id,
  placeholder = '텍스트를 입력하세요',
  rows = 4,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className="common-component common-field common-field--textarea">
      {label && (
        <label className="common-field__label" htmlFor={inputId}>
          {label}
        </label>
      )}

      <textarea
        {...props}
        id={inputId}
        rows={rows}
        placeholder={placeholder}
        className="common-textarea"
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

export default TextArea;
