import { useState } from 'react';
import { validatePassword } from '../../utils/dashboard/validation.js';
import Button from './Button.jsx';
import Card from './Card.jsx';
import TextInput from './TextInput.jsx';

const INITIAL_VALUES = { currentPassword: '', newPassword: '', confirmPassword: '' };

const PASSWORD_FIELDS = [
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

function validateConfirmPassword(newPassword, confirmPassword) {
  if (!confirmPassword) return '새 비밀번호 확인을 입력하세요';
  return newPassword === confirmPassword ? '' : '새 비밀번호가 일치하지 않습니다';
}

function validatePasswordForm({ currentPassword, newPassword, confirmPassword }) {
  return {
    currentPassword: currentPassword ? '' : '현재 비밀번호를 입력하세요',
    newPassword: validatePassword(newPassword),
    confirmPassword: validateConfirmPassword(newPassword, confirmPassword),
  };
}

// Figma 마이페이지의 비밀번호 변경 카드
function PasswordChangeCard({ onChangePassword }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  // 첫 제출 전에는 null이고, 제출 후에는 입력할 때마다 다시 검사해 오류 상태를 갱신
  const [errors, setErrors] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    if (errors) setErrors(validatePasswordForm(nextValues));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validatePasswordForm(values);
    setErrors(nextErrors);

    const firstInvalidField = Object.keys(nextErrors).find((field) => nextErrors[field]);
    if (firstInvalidField) {
      event.currentTarget.elements.namedItem(firstInvalidField).focus();
      return;
    }

    // 비밀번호 변경 API 연동 전이므로 실제 변경 없이 입력값을 비우고 완료 안내만 표시
    setValues(INITIAL_VALUES);
    setErrors(null);
    onChangePassword();
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
        <Button type="submit" className="self-end mt-[4px]">
          변경
        </Button>
      </form>
    </Card>
  );
}

export default PasswordChangeCard;
