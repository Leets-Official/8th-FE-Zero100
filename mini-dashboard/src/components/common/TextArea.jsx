import { forwardRef, useId } from 'react';
import FormField from './FormField.jsx';

const TextArea = forwardRef(function TextArea(
  {
    id,
    label,
    helperText,
    error,
    required = false,
    rows = 6,
    className = '',
    'aria-describedby': describedBy,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const description =
    [describedBy, helperText && `${controlId}-help`, error && `${controlId}-error`]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <FormField
      id={controlId}
      label={label}
      required={required}
      helperText={helperText}
      error={error}
    >
      <textarea
        {...props}
        ref={ref}
        id={controlId}
        rows={rows}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={description}
        className={`w-full resize-y rounded-md border bg-white px-3 py-3 text-sm leading-6 placeholder:text-[#adb5bd] focus:border-brand disabled:bg-[#f1f3f5] ${error ? 'border-[#e03131]' : 'border-[#dee2e6]'} ${className}`}
      />
    </FormField>
  );
});

export default TextArea;
