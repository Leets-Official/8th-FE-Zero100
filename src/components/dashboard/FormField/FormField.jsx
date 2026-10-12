import { useId } from 'react';

/**
 * TextInput과 TextArea가 함께 쓰는 라벨 / 안내 문구 / 에러 문구 틀.
 * 입력칸에 붙일 id와 aria 속성을 children 함수로 넘겨서, 라벨과 문구가 입력칸과 연결되게 한다.
 */
function FormField({ id, label, helperText, error, children }) {
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

      {children({
        id: inputId,
        'aria-invalid': Boolean(error),
        'aria-describedby': message ? messageId : undefined,
      })}

      {message && (
        <p
          id={messageId}
          role={error ? 'alert' : undefined}
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

export default FormField;
