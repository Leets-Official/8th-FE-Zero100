import { useId } from 'react';

const TextInput = ({ label, helperText, errorText, id, className = '', ...rest }) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const hasDescription = Boolean(errorText || helperText);

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="text-sm text-[#364153]">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={Boolean(errorText)}
        aria-describedby={hasDescription ? descriptionId : undefined}
        className={`h-[47px] w-full rounded-[10px] border bg-[#F9FAFB] px-4 text-base text-[#0A0A0A] outline-none placeholder:text-[#0A0A0A]/50 ${
          errorText ? 'border-red-500' : 'border-[#E5E7EB] focus:border-black'
        } ${className}`}
        {...rest}
      />
      {errorText ? (
        <p id={descriptionId} className="text-xs text-red-500">
          {errorText}
        </p>
      ) : (
        helperText && (
          <p id={descriptionId} className="text-xs text-gray-500">
            {helperText}
          </p>
        )
      )}
    </div>
  );
};

export default TextInput;
