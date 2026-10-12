function FormField({ id, label, required, helperText, error, children }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required && (
          <span className="ml-1 text-[#e03131]" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {helperText && (
        <p id={`${id}-help`} className="text-xs leading-5 text-muted">
          {helperText}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs leading-5 text-[#c92a2a]">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
