import { useId } from 'react';
import TextField from '../common/TextField';
import Button from '../common/ButtonView';
import { useTypedForm } from '../../hooks/useTypedForm';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { NAME_HINT, validateNameChange } from '../../utils/accountValidation';
import { authApi } from '../../api/authApi';
import type { User, AccountActionRunner } from '../../types/auth';

interface NameChangeViewProps {
  user: User;
  disabled: boolean;
  runAction: AccountActionRunner;
}

export default function NameChangeView({ user, disabled, runAction }: NameChangeViewProps) {
  const { acceptUser } = useAuth();
  const notify = useToast();
  const id = useId();
  const form = useTypedForm({ name: user.name }, validateNameChange);
  const unchanged = form.values.name.trim() === user.name;
  return (
    <form
      className="admin-card account-card mypage-card"
      aria-labelledby={id}
      aria-busy={form.isSubmitting}
      noValidate
      onSubmit={form.handleSubmit(async (values) => {
        if (unchanged) return;
        await runAction(async () => {
          const updated = await authApi.updateName(values);
          acceptUser(updated);
          form.reset({ name: updated.name });
          notify('이름이 변경되었습니다.');
        });
      })}
    >
      <h2 id={id}>이름 변경</h2>
      <fieldset disabled={disabled || form.isSubmitting}>
        <TextField
          {...form.field('name')}
          label="새 이름"
          hideLabel
          placeholder="이름을 입력하세요"
          autoComplete="name"
          maxLength={16}
          hint={NAME_HINT}
          required
        />
        {form.formError && (
          <p className="form-error" role="alert">
            {form.formError}
          </p>
        )}
        <div className="form-actions">
          <Button type="submit" disabled={unchanged}>
            {form.isSubmitting ? '변경 중...' : '변경'}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
