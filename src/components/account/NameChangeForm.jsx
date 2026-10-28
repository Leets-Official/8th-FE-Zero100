import FormField from '../common/FormField';
import FormError from '../common/FormError';
import Button from '../common/Button';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { nameError } from '../../utils/validation';
import { authApi } from '../../api/admin';

export default function NameChangeForm() {
  const { acceptUser } = useAuth();
  const notify = useToast();
  const form = useForm({ name: '' }, (values) => ({ name: nameError(values.name) }));
  return (
    <form
      className="admin-card account-card"
      noValidate
      onSubmit={form.handleSubmit(async (values) => {
        const user = await authApi.updateName(values);
        acceptUser(user);
        notify('이름이 변경되었습니다.');
      })}
    >
      <h2>이름 변경</h2>
      <fieldset disabled={form.isSubmitting}>
        <FormField
          {...form.field('name')}
          label="새 이름"
          hideLabel
          placeholder="이름을 입력하세요"
          autoComplete="name"
          maxLength={16}
        />
        <FormError message={form.formError} />
        <div className="form-actions">
          <Button type="submit">{form.isSubmitting ? '변경 중...' : '변경'}</Button>
        </div>
      </fieldset>
    </form>
  );
}
