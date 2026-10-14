import { useId } from 'react';
import { cn } from '../../../utils/cn';

/**
 * 라벨 / 안내 문구 / 에러 문구를 함께 쓸 수 있는 입력칸.
 * 라벨은 htmlFor로, 문구는 aria-describedby로 입력칸과 연결해서 스크린리더가 함께 읽는다.
 */
function TextInput({
  id,
  label,
  helperText,
  error,
  type = 'text',
  placeholder = '텍스트를 입력하세요',
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const message = error || helperText;

  return (
    <div className="flex w-full min-w-0 flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm leading-5 font-medium text-dash-text">
          {label}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={message ? messageId : undefined}
        className={cn(
          'w-full min-w-0 rounded-[10px] border border-dash-line bg-dash-bg px-4 py-[13px] text-sm leading-[19px] text-dash-input-text transition-colors outline-none placeholder:text-dash-placeholder',
          'focus:border-dash-muted disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-dash-error',
          className,
        )}
        {...rest}
      />

      {message && (
        <p
          id={messageId}
          className={
            error ? 'text-xs leading-5 text-dash-error' : 'text-[10px] leading-4 text-dash-muted'
          }
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default TextInput;
