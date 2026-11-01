import { useId, useState } from 'react';
import { useNavigate } from 'react-router';
import TextField from '../common/TextField';
import Button from '../common/ButtonView';
import { useTypedForm } from '../../hooks/useTypedForm';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { PASSWORD_HINT, validatePasswordChange } from '../../utils/accountValidation';
import { authApi } from '../../api/authApi';
import type { AccountActionRunner, PasswordChangeValues } from '../../types/auth';

interface PasswordChangeViewProps {
  disabled: boolean;
  runAction: AccountActionRunner;
}
const EMPTY_PASSWORDS: PasswordChangeValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export default function PasswordChangeView({ disabled, runAction }: PasswordChangeViewProps) {
  const { acceptUser } = useAuth();
  const notify = useToast();
  const navigate = useNavigate();
  const id = useId();
  const [visible, setVisible] = useState(false);
  const form = useTypedForm(EMPTY_PASSWORDS, validatePasswordChange);
  const type = visible ? 'text' : 'password';
  return (
    <form
      className="admin-card account-card mypage-card"
      aria-labelledby={id}
      aria-busy={form.isSubmitting}
      noValidate
      onSubmit={form.handleSubmit(async (values) => {
        await runAction(async () => {
          await authApi.updatePassword(values);
          form.reset(EMPTY_PASSWORDS);
          setVisible(false);
          acceptUser(null);
          notify('비밀번호가 변경되었습니다. 다시 로그인해 주세요.');
          navigate('/login', { replace: true });
        });
      })}
    >
      <div className="account-card-heading">
        <h2 id={id}>비밀번호 변경</h2>
        <label className="account-password-toggle">
          <input
            type="checkbox"
            checked={visible}
            disabled={disabled || form.isSubmitting}
            onChange={(event) => setVisible(event.target.checked)}
          />
          비밀번호 표시
        </label>
      </div>
      <fieldset disabled={disabled || form.isSubmitting}>
        <TextField
          {...form.field('currentPassword')}
          label="현재 비밀번호"
          type={type}
          placeholder="현재 비밀번호"
          autoComplete="current-password"
          maxLength={64}
          required
        />
        <TextField
          {...form.field('newPassword')}
          label="새 비밀번호"
          type={type}
          placeholder="새 비밀번호"
          autoComplete="new-password"
          maxLength={64}
          hint={PASSWORD_HINT}
          required
        />
        <TextField
          {...form.field('confirmPassword')}
          label="새 비밀번호 확인"
          type={type}
          placeholder="새 비밀번호 확인"
          autoComplete="new-password"
          maxLength={64}
          required
        />
        {form.formError && (
          <p className="form-error" role="alert">
            {form.formError}
          </p>
        )}
        <div className="form-actions">
          <Button type="submit">{form.isSubmitting ? '변경 중...' : '변경'}</Button>
        </div>
      </fieldset>
    </form>
  );
}
