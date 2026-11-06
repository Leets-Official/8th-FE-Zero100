import { useId } from 'react';

const TextArea = ({ label, helperText, errorText, id, className = '', ...rest }) => {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const descriptionId = `${textareaId}-description`;
  const hasDescription = Boolean(errorText || helperText);

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label htmlFor={textareaId} className="text-sm text-[#364153]">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        aria-invalid={Boolean(errorText)}
        aria-describedby={hasDescription ? descriptionId : undefined}
        className={`min-h-[160px] w-full resize-y rounded-[10px] border bg-[#F9FAFB] px-4 py-3.5 text-base text-[#0A0A0A] outline-none placeholder:text-[#0A0A0A]/50 ${
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

export default TextArea;
