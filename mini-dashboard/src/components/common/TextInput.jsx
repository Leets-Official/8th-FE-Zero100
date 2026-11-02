import { forwardRef, useId } from 'react';
import FormField from './FormField.jsx';

const TextInput = forwardRef(function TextInput(
  {
    id,
    label,
    helperText,
    error,
    hideLabel = false,
    variant = 'default',
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
      hideLabel={hideLabel}
    >
      <input
        {...props}
        ref={ref}
        id={controlId}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={description}
        className={`h-11 w-full border px-3 text-sm placeholder:text-[#adb5bd] focus:border-brand disabled:bg-[#f1f3f5] disabled:text-muted ${variant === 'auth' ? 'rounded-[10px] bg-[#f9fafb]' : 'rounded-md bg-white'} ${error ? 'border-[#e03131]' : 'border-[#dee2e6]'} ${className}`}
      />
    </FormField>
  );
});

export default TextInput;
