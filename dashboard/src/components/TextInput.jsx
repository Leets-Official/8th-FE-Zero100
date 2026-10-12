import { useId } from 'react';

const TextInput = ({ label, helperText, errorText, id, className = '', ...rest }) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

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
        className={`h-[47px] w-full rounded-[10px] border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-base text-[#0A0A0A] outline-none placeholder:text-[#0A0A0A]/50 focus:border-black ${className}`}
        {...rest}
      />
      {errorText ? (
        <p className="text-xs text-red-500">{errorText}</p>
      ) : (
        helperText && <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default TextInput;
