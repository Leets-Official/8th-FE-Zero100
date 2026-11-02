import { useId } from 'react';

function Input({
  label,
  hideLabel = false,
  helperText = '',
  error = '',
  type = 'text',
  id,
  ...props
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const message = error || helperText;

  return (
    <div className="flex w-full max-w-[630px] flex-col gap-[5.99px]">
      <label
        htmlFor={inputId}
        className={hideLabel ? 'sr-only' : 'text-[14px] leading-[20px] font-medium text-[#374151]'}
      >
        {label}
      </label>

      <input
        {...props}
        id={inputId}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={message ? messageId : undefined}
        className={`w-full min-w-0 rounded-[10px] border-0 bg-[#f9fafb] px-[16px] py-[14px] text-[14px] leading-[19px] font-normal text-[#222222] placeholder:text-[#999999] focus-visible:outline-2 focus-visible:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ${
          error
            ? 'shadow-[inset_0_0_0_0.93px_#fb2c36] focus-visible:outline-[#fb2c36]'
            : 'shadow-[inset_0_0_0_0.93px_#e5e7eb] focus-visible:outline-[#222222]'
        }`}
      />

      {message && (
        <p
          id={messageId}
          className={`text-[10px] font-normal tracking-[0px] ${
            error ? 'leading-[20px] text-[#fb2c36]' : 'leading-[16px] text-[#6a7282]'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default Input;
