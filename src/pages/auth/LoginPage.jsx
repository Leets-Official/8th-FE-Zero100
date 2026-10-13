import { useState } from 'react';
import { Link } from 'react-router';
import AuthLayout from '../../components/auth/AuthLayout';
import FormField from '../../components/common/FormField';
import FormError from '../../components/common/FormError';
import Button from '../../components/common/Button';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { authApi } from '../../api/admin';
import { validateLogin } from '../../utils/validation';
import { DEMO_EMAIL, DEMO_PASSWORD } from '../../mocks/database';

export default function LoginPage() {
  const { acceptUser } = useAuth();
  const [kakaoMessage, setKakaoMessage] = useState('');
  const form = useForm({ email: '', password: '' }, validateLogin);
  const submit = form.handleSubmit(async (values) => {
    const user = await authApi.login(values);
    acceptUser(user);
  });
  return (
    <AuthLayout title="로그인">
      <form noValidate onSubmit={submit}>
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
            autoComplete="current-password"
            maxLength={64}
          />
          <FormError message={form.formError} />
          <Button type="submit" className="w-full">
            {form.isSubmitting ? '로그인 중...' : '로그인'}
          </Button>
        </fieldset>
      </form>
      <div className="auth-divider">
        <span>또는</span>
      </div>
      <Button
        variant="kakao"
        className="w-full"
        disabled={form.isSubmitting}
        onClick={() =>
          setKakaoMessage(
            '카카오 로그인은 서버 인증 설정이 연결된 뒤 사용할 수 있습니다. 현재는 이메일 로그인을 이용해 주세요.',
          )
        }
      >
        <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
          <path
            d="M10 2C5 2 1 5 1 8.5c0 2.2 1.5 4.1 3.8 5.3L4 18l4.1-3.1 1.9.1c5 0 9-2.9 9-6.5S15 2 10 2"
            fill="currentColor"
          />
        </svg>
        카카오 로그인
      </Button>
      {kakaoMessage && (
        <p className="inline-notice" role="status">
          {kakaoMessage}
        </p>
      )}
      <p className="auth-switch">
        계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </p>
      <p className="demo-credentials">
        데모 계정: {DEMO_EMAIL}
        <br />
        비밀번호: {DEMO_PASSWORD}
      </p>
    </AuthLayout>
  );
}
