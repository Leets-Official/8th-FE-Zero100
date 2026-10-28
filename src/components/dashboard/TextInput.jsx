import { useId } from 'react';
import { twMerge } from 'tailwind-merge';

const INPUT_CLASS_NAME =
  'box-border w-full h-[47px] m-0 px-[15.07px] py-0 border-[0.93px] border-solid border-[#e5e7eb] rounded-[10px] bg-[#f9fafb] font-[family-name:var(--font-family-base)] font-normal text-[16px] leading-none tracking-[0px] placeholder:text-[#0a0a0a]/50';

const MESSAGE_CLASS_NAME =
  'm-0 font-[family-name:var(--font-family-base)] font-normal text-[10px] tracking-[0px]';

// Dashboard 전용 입력창. value/onChange(controlled)와 defaultValue(uncontrolled) 모두 그대로 전달
// label, helperText, error는 선택 사항이며, id가 없으면 useId로 생성해 label·안내 문구·에러 메시지와 연결
function TextInput({
  type = 'text',
  id,
  label,
  hideLabel = false,
  helperText,
  error,
  className,
  'aria-describedby': ariaDescribedBy,
  ...props
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperTextId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const showHelperText = helperText && !error;
  const describedBy =
    [ariaDescribedBy, showHelperText && helperTextId, error && errorId].filter(Boolean).join(' ') ||
    undefined;

  return (
    <div className="flex flex-col gap-[6px]">
      {label && (
        <label
          htmlFor={inputId}
          className={
            hideLabel
              ? 'sr-only'
              : 'font-[family-name:var(--font-family-base)] font-medium text-[14px] leading-[20px] tracking-[0px] text-[#364153]'
          }
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={inputId}
        className={twMerge(INPUT_CLASS_NAME, error && 'border-[#fb2c36]', className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...props}
      />
      {showHelperText && (
        <p id={helperTextId} className={`${MESSAGE_CLASS_NAME} leading-[16px] text-[#6a7282]`}>
          {helperText}
        </p>
      )}
      {error && (
        <p id={errorId} className={`${MESSAGE_CLASS_NAME} leading-[20px] text-[#fb2c36]`}>
          {error}
        </p>
      )}
    </div>
  );
}

export default TextInput;
