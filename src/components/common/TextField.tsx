import { useId } from 'react';
import type { ChangeEventHandler, FocusEventHandler, HTMLInputTypeAttribute } from 'react';

interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error?: string;
  hint?: string;
  counter?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
}

export default function TextField({
  label,
  error,
  hint,
  counter,
  multiline = false,
  rows,
  type = 'text',
  ...props
}: TextFieldProps) {
  const id = useId();
  const describedBy =
    [error && `${id}-error`, hint && `${id}-hint`, counter && `${id}-counter`]
      .filter(Boolean)
      .join(' ') || undefined;
  const control = {
    ...props,
    id,
    'aria-invalid': Boolean(error),
    'aria-describedby': describedBy,
    className: `admin-input ${multiline ? 'admin-textarea' : ''}`,
  };
  return (
    <div className="admin-field">
      <div className="field-label-row">
        <label htmlFor={id} className="admin-field-label">
          {label}
        </label>
        {counter && (
          <span id={`${id}-counter`} className="field-counter">
            {counter}
          </span>
        )}
      </div>
      {multiline ? <textarea {...control} rows={rows} /> : <input {...control} type={type} />}
      {hint && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
