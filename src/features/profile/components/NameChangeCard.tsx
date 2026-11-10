import { useRef, useState, type ChangeEvent, type SubmitEvent } from 'react';
import { getErrorMessage } from '../../../services/axiosInstance.ts';
import { validateName } from '../../../utils/validation.ts';
import Button from '../../../components/common/Button.tsx';
import Card from '../../../components/common/Card.tsx';
import FormErrorMessage from '../../../components/common/FormErrorMessage.tsx';
import TextInput from '../../../components/common/TextInput.tsx';

// Figma 마이페이지의 이름 변경 카드
interface NameChangeCardProps {
  // 서버 기준 현재 이름. 사용자가 입력하기 전에는 이 값을 입력창에 표시한다.
  currentName: string;
  // 이름 수정 요청. 실패하면 ApiError를 던진다.
  onSubmit: (name: string) => Promise<void>;
  // 서버에서 수정이 확인된 뒤 호출 (완료 안내)
  onSuccess: () => void;
}

function NameChangeCard({ currentName, onSubmit, onSuccess }: NameChangeCardProps) {
  // 사용자가 입력 중인 값. null이면 아직 입력하지 않은 상태로 서버 이름(currentName)을 표시
  // 서버 값과 입력 중인 값을 나눠, 내 정보를 다시 조회해도 입력 중인 값을 덮어쓰지 않는다.
  const [draftName, setDraftName] = useState<string | null>(null);
  // 요청이 끝났을 때 최신 입력값을 확인하기 위한 값 (handleChange에서 draftName과 함께 갱신)
  const draftNameRef = useRef<string | null>(null);
  // 첫 제출 전에는 null이고, 제출 후에는 입력할 때마다 다시 검사해 오류 상태를 갱신
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 인증·네트워크·서버 오류 등 수정 요청 실패 메시지
  const [submitError, setSubmitError] = useState('');
  const name = draftName ?? currentName;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    draftNameRef.current = event.target.value;
    setDraftName(event.target.value);
    if (error !== null) setError(validateName(event.target.value));
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    // Swagger PATCH /api/auth/me의 이름 조건(2~8자)과 같은 검사
    const nextError = validateName(name);
    setError(nextError);

    if (nextError) {
      const field = event.currentTarget.elements.namedItem('name');
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    // 요청 중에 사용자가 입력을 바꿨는지 확인하기 위해 제출 시점의 입력 상태를 기억
    const submittedDraft = draftName;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await onSubmit(name.trim());
      // 성공하면 입력 상태를 비워 갱신된 서버 이름을 표시
      // 요청 중에 새로 입력한 값이 있으면 사용자의 최신 입력이므로 지우지 않는다.
      if (draftNameRef.current === submittedDraft) {
        draftNameRef.current = null;
        setDraftName(null);
        setError(null);
      }
      onSuccess();
    } catch (submitFailure) {
      // 실패하면 서버 사용자 정보는 그대로 두고 입력값도 유지
      setSubmitError(getErrorMessage(submitFailure));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card as="section" className="flex flex-col gap-[12px] p-[19.07px]">
      <h2 className="m-0 font-[family-name:var(--font-family-base)] font-bold text-[18px] leading-[28px] tracking-[0px] text-[#000000]">
        이름 변경
      </h2>
      <form className="flex flex-col gap-[12px]" noValidate onSubmit={handleSubmit}>
        <div className="self-end w-full max-w-[630px]">
          <TextInput
            name="name"
            label="이름"
            hideLabel
            placeholder="텍스트를 입력하세요"
            autoComplete="name"
            value={name}
            onChange={handleChange}
            error={error}
          />
        </div>
        <FormErrorMessage message={submitError} />
        <Button type="submit" className="self-end" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? '변경 중...' : '변경'}
        </Button>
      </form>
    </Card>
  );
}

export default NameChangeCard;
