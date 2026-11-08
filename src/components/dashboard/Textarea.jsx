import { useId } from 'react';

function Textarea({ label, id, error = '', helperText = '', ...props }) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const messageId = `${textareaId}-message`;
  const message = error || helperText;

  return (
    <div className="flex w-full flex-col gap-[6px]">
      <label htmlFor={textareaId} className="text-[14px] leading-[20px] font-medium text-[#364153]">
        {label}
      </label>

      <textarea
        {...props}
        id={textareaId}
        aria-invalid={Boolean(error)}
        aria-describedby={message ? messageId : undefined}
        className={`min-h-[168px] w-full min-w-0 resize-y rounded-[10px] border bg-[#F9FAFB] px-[16px] py-[14px] text-[14px] leading-[20px] text-[#000000] placeholder:text-[#0A0A0A]/50 focus-visible:outline-2 focus-visible:outline-offset-0 ${
          error
            ? 'border-[#FB2C36] focus-visible:outline-[#FB2C36]'
            : 'border-[#E5E7EB] focus-visible:outline-[#364153]'
        }`}
      />

      {message && (
        <p
          id={messageId}
          className={`text-[10px] leading-[20px] ${error ? 'text-[#FB2C36]' : 'text-[#4A5565]'}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default Textarea;
