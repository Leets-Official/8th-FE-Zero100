import { useNavigate } from 'react-router';
import FormField from '../common/FormField';
import FormError from '../common/FormError';
import Button from '../common/Button';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { validatePasswordChange } from '../../utils/validation';
import { authApi } from '../../api/admin';

export default function PasswordChangeForm() {
  const { acceptUser } = useAuth();
  const notify = useToast();
  const navigate = useNavigate();
  const form = useForm(
    { currentPassword: '', newPassword: '', confirmPassword: '' },
    validatePasswordChange,
  );
  return (
    <form
      className="admin-card account-card"
      noValidate
      onSubmit={form.handleSubmit(async (values) => {
        await authApi.updatePassword(values);
        acceptUser(null);
        notify('비밀번호가 변경되었습니다. 다시 로그인해 주세요.');
        navigate('/login', { replace: true });
      })}
    >
      <h2>비밀번호 변경</h2>
      <fieldset disabled={form.isSubmitting}>
        <FormField
          {...form.field('currentPassword')}
          label="현재 비밀번호"
          type="password"
          placeholder="현재 비밀번호"
          autoComplete="current-password"
          maxLength={64}
        />
        <FormField
          {...form.field('newPassword')}
          label="새 비밀번호"
          type="password"
          placeholder="새 비밀번호"
          autoComplete="new-password"
          maxLength={64}
        />
        <FormField
          {...form.field('confirmPassword')}
          label="새 비밀번호 확인"
          type="password"
          placeholder="새 비밀번호 확인"
          autoComplete="new-password"
          maxLength={64}
        />
        <FormError message={form.formError} />
        <div className="form-actions">
          <Button type="submit">{form.isSubmitting ? '변경 중...' : '변경'}</Button>
        </div>
      </fieldset>
    </form>
  );
}
