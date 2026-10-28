import { Link } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { validateInquiry } from '../../utils/validation';
import FormField from '../common/FormField';
import FormError from '../common/FormError';
import Button from '../common/Button';

export default function InquiryForm({
  initialValues,
  onSave,
  cancelTo,
  navigationState,
  submitLabel = '등록',
}) {
  const form = useForm(initialValues, validateInquiry);
  return (
    <form className="admin-card inquiry-form" noValidate onSubmit={form.handleSubmit(onSave)}>
      <fieldset disabled={form.isSubmitting}>
        <FormField
          {...form.field('name')}
          label="이름"
          placeholder="이름을 입력하세요"
          autoComplete="name"
          maxLength={16}
        />
        <FormField
          {...form.field('email')}
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          autoComplete="email"
          maxLength={254}
        />
        <FormField
          {...form.field('title')}
          label="제목"
          placeholder="제목을 입력하세요"
          maxLength={100}
        />
        <FormField
          {...form.field('content')}
          label="내용"
          placeholder="내용을 입력하세요"
          multiline
          rows={7}
          maxLength={5000}
        />
        <FormError message={form.formError} />
        <div className="form-actions">
          {form.isSubmitting ? (
            <Button variant="secondary" disabled>
              취소
            </Button>
          ) : (
            <Link
              className="admin-button admin-button--secondary"
              to={cancelTo}
              state={navigationState}
            >
              취소
            </Link>
          )}
          <Button type="submit">{form.isSubmitting ? `${submitLabel} 중...` : submitLabel}</Button>
        </div>
      </fieldset>
    </form>
  );
}
