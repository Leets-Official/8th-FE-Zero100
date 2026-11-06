// 입력 필드와 관계없는 서버·네트워크 오류를 폼 안에 표시. 메시지가 없으면 렌더링하지 않는다.
interface FormErrorMessageProps {
  message?: string;
}

function FormErrorMessage({ message }: FormErrorMessageProps) {
  if (!message) return null;

  return (
    <p
      role="alert"
      className="m-0 font-[family-name:var(--font-family-base)] font-normal text-[14px] leading-[20px] tracking-[0px] text-center text-[#fb2c36]"
    >
      {message}
    </p>
  );
}

export default FormErrorMessage;
