import { forwardRef, useId } from 'react';
import FormField from './FormField.jsx';

const TextInput = forwardRef(function TextInput(
  {
    id,
    label,
    helperText,
    error,
    required = false,
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
      <input
        {...props}
        ref={ref}
        id={controlId}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={description}
        className={`h-11 w-full rounded-md border bg-white px-3 text-sm placeholder:text-[#adb5bd] focus:border-brand disabled:bg-[#f1f3f5] disabled:text-muted ${error ? 'border-[#e03131]' : 'border-[#dee2e6]'} ${className}`}
      />
    </FormField>
  );
});

export default TextInput;
