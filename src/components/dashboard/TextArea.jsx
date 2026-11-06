import { useId } from 'react';
import { twMerge } from 'tailwind-merge';

const TEXT_AREA_CLASS_NAME =
  'box-border w-full h-[167.23px] m-0 px-[15.07px] py-[13.07px] border-[0.93px] border-solid border-[#e5e7eb] rounded-[10px] bg-[#f9fafb] font-[family-name:var(--font-family-base)] font-normal text-[16px] leading-[19px] tracking-[0px] resize-none placeholder:text-[#0a0a0a]/50';

// Dashboard 전용 여러 줄 입력창. value/onChange(controlled)와 defaultValue(uncontrolled) 모두 그대로 전달
// label과 error는 선택 사항이며, id가 없으면 useId로 생성해 label·에러 메시지와 연결
function TextArea({ id, label, error, className, 'aria-describedby': ariaDescribedBy, ...props }) {
  const generatedId = useId();
  const textAreaId = id ?? generatedId;
  const errorId = `${textAreaId}-error`;
  const describedBy = [ariaDescribedBy, error && errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="flex flex-col gap-[6px]">
      {label && (
        <label
          htmlFor={textAreaId}
          className="font-[family-name:var(--font-family-base)] font-medium text-[14px] leading-[20px] tracking-[0px] text-[#364153]"
        >
          {label}
        </label>
      )}
      <textarea
        id={textAreaId}
        className={twMerge(TEXT_AREA_CLASS_NAME, error && 'border-[#fb2c36]', className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...props}
      />
      {error && (
        <p
          id={errorId}
          className="m-0 font-[family-name:var(--font-family-base)] font-normal text-[10px] leading-[20px] tracking-[0px] text-[#fb2c36]"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default TextArea;
