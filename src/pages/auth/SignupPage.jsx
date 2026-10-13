import { Link, useNavigate } from 'react-router';
import AuthLayout from '../../components/auth/AuthLayout';
import FormField from '../../components/common/FormField';
import FormError from '../../components/common/FormError';
import Button from '../../components/common/Button';
import { useForm } from '../../hooks/useForm';
import { useToast } from '../../hooks/useToast';
import { authApi } from '../../api/admin';
import { validateSignup, PASSWORD_HINT, NAME_HINT } from '../../utils/validation';

export default function SignupPage() {
  const navigate = useNavigate();
  const notify = useToast();
  const form = useForm({ email: '', password: '', name: '' }, validateSignup);
  return (
    <AuthLayout title="회원가입">
      <form
        noValidate
        onSubmit={form.handleSubmit(async (values) => {
          await authApi.signup(values);
          notify('회원가입이 완료되었습니다. 로그인해 주세요.');
          navigate('/login', { replace: true });
        })}
      >
        <fieldset disabled={form.isSubmitting} className="auth-fields">
          <FormField
            {...form.field('email')}
            label="이메일"
            hideLabel
            type="email"
            placeholder="이메일을 입력하세요"
            autoComplete="email"
            maxLength={254}
          />
          <FormField
            {...form.field('password')}
            label="비밀번호"
            hideLabel
            type="password"
            placeholder="비밀번호를 입력하세요"
            autoComplete="new-password"
            hint={PASSWORD_HINT}
            maxLength={64}
          />
          <FormField
            {...form.field('name')}
            label="이름"
            hideLabel
            placeholder="이름을 입력하세요"
            autoComplete="name"
            hint={NAME_HINT}
            maxLength={16}
          />
          <FormError message={form.formError} />
          <Button type="submit" className="w-full">
            {form.isSubmitting ? '가입 중...' : '회원가입'}
          </Button>
        </fieldset>
      </form>
      <p className="auth-switch">
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </AuthLayout>
  );
}
