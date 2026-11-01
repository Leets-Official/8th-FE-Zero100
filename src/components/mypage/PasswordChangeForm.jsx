import { useState } from 'react';
import Button from '../dashboard/Button';
import TextField from '../dashboard/TextField';
import { useDashboardToast } from '../../contexts/DashboardToastContext';
import { validatePassword } from '../../utils/validators';

const initialValues = { currentPassword: '', newPassword: '', confirmPassword: '' };

function validate(values) {
  return {
    currentPassword: values.currentPassword ? '' : '현재 비밀번호를 입력하세요',
    newPassword: validatePassword(values.newPassword),
    confirmPassword:
      values.confirmPassword && values.confirmPassword === values.newPassword
        ? ''
        : '새 비밀번호가 일치하지 않습니다',
  };
}

function PasswordChangeForm() {
  const { showToast } = useDashboardToast();
  const [values, setValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const errors = submitted ? validate(values) : {};

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    if (Object.values(validate(values)).some(Boolean)) return;

    // TODO: API 연동 후 비밀번호 변경 요청
    showToast('비밀번호가 변경되었습니다.');
    setValues(initialValues);
    setSubmitted(false);
  }

  return (
    <form className="flex flex-col gap-3" noValidate onSubmit={handleSubmit}>
      <TextField
        type="password"
        name="currentPassword"
        label="현재 비밀번호"
        placeholder="현재 비밀번호"
        autoComplete="current-password"
        value={values.currentPassword}
        onChange={handleChange}
        error={errors.currentPassword}
      />
      <TextField
        type="password"
        name="newPassword"
        label="새 비밀번호"
        placeholder="새 비밀번호"
        autoComplete="new-password"
        value={values.newPassword}
        onChange={handleChange}
        error={errors.newPassword}
      />
      <TextField
        type="password"
        name="confirmPassword"
        label="새 비밀번호 확인"
        placeholder="새 비밀번호 확인"
        autoComplete="new-password"
        value={values.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />
      <div className="flex justify-end pt-1">
        <Button type="submit">변경</Button>
      </div>
    </form>
  );
}

export default PasswordChangeForm;
