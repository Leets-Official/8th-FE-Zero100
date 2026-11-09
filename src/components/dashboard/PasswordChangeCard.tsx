import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { getErrorMessage } from '../../api/axiosInstance.ts';
import type { UpdatePasswordRequest } from '../../types/auth.ts';
import { validatePassword } from '../../utils/dashboard/validation.ts';
import Button from './Button.tsx';
import Card from './Card.tsx';
import FormErrorMessage from './FormErrorMessage.tsx';
import TextInput from './TextInput.tsx';

// API 요청 필드(currentPassword, newPassword)에 입력 실수 방지용 확인 값을 더한 폼 값
interface PasswordValues extends UpdatePasswordRequest {
  confirmPassword: string;
}

// 필드별 오류 메시지. 오류가 없으면 빈 문자열
type PasswordErrors = Record<keyof PasswordValues, string>;

interface PasswordField {
  name: keyof PasswordValues;
  label: string;
  placeholder: string;
  autoComplete: string;
}

const INITIAL_VALUES: PasswordValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const PASSWORD_FIELDS: PasswordField[] = [
  {
    name: 'currentPassword',
    label: '현재 비밀번호',
    placeholder: ' 현재 비밀번호',
    autoComplete: 'current-password',
  },
  {
    name: 'newPassword',
    label: '새 비밀번호',
    placeholder: '새 비밀번호',
    autoComplete: 'new-password',
  },
  {
    name: 'confirmPassword',
    label: '새 비밀번호 확인',
    placeholder: '새 비밀번호 확인',
    autoComplete: 'new-password',
  },
];

function validateConfirmPassword(newPassword: string, confirmPassword: string) {
  if (!confirmPassword) return '새 비밀번호 확인을 입력하세요';
  return newPassword === confirmPassword ? '' : '새 비밀번호가 일치하지 않습니다';
}

// Swagger 400: 현재 비밀번호와 새 비밀번호가 같으면 변경할 수 없다.
function validateNewPassword(currentPassword: string, newPassword: string) {
  const formatError = validatePassword(newPassword);
  if (formatError) return formatError;
  return newPassword === currentPassword ? '현재 비밀번호와 다른 비밀번호를 입력하세요' : '';
}

function validatePasswordForm({
  currentPassword,
  newPassword,
  confirmPassword,
}: PasswordValues): PasswordErrors {
  return {
    currentPassword: currentPassword ? '' : '현재 비밀번호를 입력하세요',
    newPassword: validateNewPassword(currentPassword, newPassword),
    confirmPassword: validateConfirmPassword(newPassword, confirmPassword),
  };
}

// Figma 마이페이지의 비밀번호 변경 카드
interface PasswordChangeCardProps {
  // 비밀번호 변경 요청. 실패하면 ApiError를 던진다.
  onSubmit: (request: UpdatePasswordRequest) => Promise<void>;
  // 서버에서 변경이 확인된 뒤 호출 (완료 안내)
  onSuccess: () => void;
}

// 비밀번호는 컴포넌트 state에만 두고 저장소나 로그에 남기지 않는다.
function PasswordChangeCard({ onSubmit, onSuccess }: PasswordChangeCardProps) {
  const [values, setValues] = useState(INITIAL_VALUES);
  // 첫 제출 전에는 null이고, 제출 후에는 입력할 때마다 다시 검사해 오류 상태를 갱신
  const [errors, setErrors] = useState<PasswordErrors | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 현재 비밀번호 불일치, 인증·네트워크·서버 오류 등 변경 요청 실패 메시지
  const [submitError, setSubmitError] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    if (errors) setErrors(validatePasswordForm(nextValues));
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validatePasswordForm(values);
    setErrors(nextErrors);

    const firstInvalidField = Object.entries(nextErrors).find(([, fieldError]) => fieldError)?.[0];
    if (firstInvalidField) {
      const field = event.currentTarget.elements.namedItem(firstInvalidField);
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await onSubmit({ currentPassword: values.currentPassword, newPassword: values.newPassword });
      // 변경이 확인된 경우에만 입력값을 비우고 완료 안내
      setValues(INITIAL_VALUES);
      setErrors(null);
      onSuccess();
    } catch (error) {
      // 서버 메시지만 표시하고 입력값은 유지
      setSubmitError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card as="section" className="flex flex-col gap-[12px] min-h-[381.2px] p-[19.07px]">
      <h2 className="m-0 font-[family-name:var(--font-family-base)] font-bold text-[18px] leading-[28px] tracking-[0px] text-[#000000]">
        비밀번호 변경
      </h2>
      <form className="flex flex-col gap-[10.8px]" noValidate onSubmit={handleSubmit}>
        {PASSWORD_FIELDS.map((field) => (
          <div key={field.name} className="w-full max-w-[630px]">
            <TextInput
              type="password"
              {...field}
              value={values[field.name]}
              onChange={handleChange}
              error={errors?.[field.name]}
            />
          </div>
        ))}
        <FormErrorMessage message={submitError} />
        <Button
          type="submit"
          className="self-end mt-[4px]"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? '변경 중...' : '변경'}
        </Button>
      </form>
    </Card>
  );
}

export default PasswordChangeCard;
