import { useId } from 'react';

// Dashboard 전용 입력창. value/onChange(controlled)와 defaultValue(uncontrolled) 모두 그대로 전달
// label과 error는 선택 사항이며, id가 없으면 useId로 생성해 label·에러 메시지와 연결
function TextInput({
  type = 'text',
  id,
  label,
  error,
  className,
  'aria-describedby': ariaDescribedBy,
  ...props
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const describedBy = [ariaDescribedBy, error && errorId].filter(Boolean).join(' ') || undefined;

  return (
    <>
      {label && <label htmlFor={inputId}>{label}</label>}
      <input
        type={type}
        id={inputId}
        className={className}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...props}
      />
      {error && <p id={errorId}>{error}</p>}
    </>
  );
}

export default TextInput;
