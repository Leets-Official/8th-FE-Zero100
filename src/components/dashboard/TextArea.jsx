import { useId } from 'react';

// Dashboard 전용 여러 줄 입력창. value/onChange(controlled)와 defaultValue(uncontrolled) 모두 그대로 전달
// label과 error는 선택 사항이며, id가 없으면 useId로 생성해 label·에러 메시지와 연결
function TextArea({ id, label, error, className, 'aria-describedby': ariaDescribedBy, ...props }) {
  const generatedId = useId();
  const textAreaId = id ?? generatedId;
  const errorId = `${textAreaId}-error`;
  const describedBy = [ariaDescribedBy, error && errorId].filter(Boolean).join(' ') || undefined;

  return (
    <>
      {label && <label htmlFor={textAreaId}>{label}</label>}
      <textarea
        id={textAreaId}
        className={className}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...props}
      />
      {error && <p id={errorId}>{error}</p>}
    </>
  );
}

export default TextArea;
