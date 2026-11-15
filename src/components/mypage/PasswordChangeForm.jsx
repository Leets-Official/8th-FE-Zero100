import { useState } from 'react';
import Button from '../dashboard/Button';
import TextField from '../dashboard/TextField';
import { useDashboardToast } from '../../contexts/DashboardToastContext';
import { updatePassword } from '../../api/auth';
import { getErrorMessage } from '../../api/client';
import { validatePassword } from '../../utils/validators';

const initialValues = { currentPassword: '', newPassword: '', confirmPassword: '' };

function validate(values) {
  let newPasswordError = validatePassword(values.newPassword);
  if (!newPasswordError && values.newPassword === values.currentPassword) {
    newPasswordError = '현재 비밀번호와 다른 비밀번호를 입력하세요';
  }

  return {
    currentPassword: values.currentPassword ? '' : '현재 비밀번호를 입력하세요',
    newPassword: newPasswordError,
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
  const [serverErrors, setServerErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const localErrors = submitted ? validate(values) : {};

  function getError(field) {
    return localErrors[field] || serverErrors[field];
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setServerErrors({});
    setSubmitError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    if (Object.values(validate(values)).some(Boolean)) return;

    setIsSubmitting(true);
    try {
      await updatePassword(values);
      showToast('비밀번호가 변경되었습니다.');
      setValues(initialValues);
      setSubmitted(false);
    } catch (err) {
      const message = getErrorMessage(err, '비밀번호 변경에 실패했습니다.');
      if (err.response?.status === 401) {
        setServerErrors({ currentPassword: message });
      } else {
        setSubmitError(message);
      }
    } finally {
      setIsSubmitting(false);
    }
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
        error={getError('currentPassword')}
      />
      <TextField
        type="password"
        name="newPassword"
        label="새 비밀번호"
        placeholder="새 비밀번호"
        autoComplete="new-password"
        value={values.newPassword}
        onChange={handleChange}
        error={getError('newPassword')}
      />
      <TextField
        type="password"
        name="confirmPassword"
        label="새 비밀번호 확인"
        placeholder="새 비밀번호 확인"
        autoComplete="new-password"
        value={values.confirmPassword}
        onChange={handleChange}
        error={getError('confirmPassword')}
      />
      {submitError && (
        <p role="alert" className="text-right text-sm leading-5 text-red-500">
          {submitError}
        </p>
      )}
      <div className="flex justify-end pt-1">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '변경 중...' : '변경'}
        </Button>
      </div>
    </form>
  );
}

export default PasswordChangeForm;
