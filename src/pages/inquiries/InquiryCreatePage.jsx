import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { useToast } from '../../hooks/useToast';
import { validateInquiry } from '../../utils/validation';
import { createInquiry } from '../../api/admin';
import FormField from '../../components/common/FormField';
import FormError from '../../components/common/FormError';
import Button from '../../components/common/Button';

export default function InquiryCreatePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const notify = useToast();
  const form = useForm(
    { name: user.name, email: user.email, title: '', content: '' },
    validateInquiry,
  );
  return (
    <div className="form-page">
      <h1 className="admin-page-title">문의 등록</h1>
      <form
        className="admin-card inquiry-form"
        noValidate
        onSubmit={form.handleSubmit(async (values) => {
          const inquiry = await createInquiry(values);
          notify('문의가 등록되었습니다.');
          navigate(`/inquiries/${inquiry.id}`, { replace: true });
        })}
      >
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
              <Link className="admin-button admin-button--secondary" to="/inquiries">
                취소
              </Link>
            )}
            <Button type="submit">{form.isSubmitting ? '등록 중...' : '등록'}</Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
