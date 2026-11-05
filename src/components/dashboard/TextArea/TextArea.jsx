import { useId } from 'react';
import { cn } from '../../../utils/cn';

/**
 * 여러 줄 입력칸. TextInput과 같은 모양과 라벨/안내/에러 연결 방식을 쓴다.
 * 라벨은 htmlFor로, 문구는 aria-describedby로 입력칸과 연결해서 스크린리더가 함께 읽는다.
 */
function TextArea({
  id,
  label,
  helperText,
  error,
  rows = 6,
  placeholder = '내용을 입력하세요',
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const textAreaId = id ?? generatedId;
  const messageId = `${textAreaId}-message`;
  const message = error || helperText;

  return (
    <div className="flex w-full min-w-0 flex-col gap-1.5">
      {label && (
        <label htmlFor={textAreaId} className="text-sm leading-5 font-medium text-dash-text">
          {label}
        </label>
      )}

      <textarea
        id={textAreaId}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={message ? messageId : undefined}
        className={cn(
          'w-full min-w-0 resize-none rounded-[10px] border border-dash-line bg-dash-bg px-4 py-[13px] text-sm leading-5 text-dash-input-text transition-colors outline-none placeholder:text-dash-placeholder',
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

export default TextArea;
