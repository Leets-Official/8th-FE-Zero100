import { useId } from 'react';

export default function FormField({
  label,
  hideLabel = false,
  hint,
  error,
  multiline = false,
  ...props
}) {
  const id = useId();
  const Element = multiline ? 'textarea' : 'input';
  const descriptions = [hint ? `${id}-hint` : '', error ? `${id}-error` : '']
    .filter(Boolean)
    .join(' ');
  return (
    <div className="admin-field">
      <label htmlFor={id} className={hideLabel ? 'sr-only' : 'admin-field-label'}>
        {label}
      </label>
      <Element
        {...props}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={descriptions || undefined}
        className={`admin-input ${multiline ? 'admin-textarea' : ''}`}
      />
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
