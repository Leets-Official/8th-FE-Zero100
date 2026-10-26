import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import AuthCard from '../../components/auth/AuthCard/AuthCard';
import KakaoLoginButton from '../../components/auth/KakaoLoginButton/KakaoLoginButton';
import Button from '../../components/dashboard/Button/Button';
import TextInput from '../../components/dashboard/TextInput/TextInput';
import { ROUTES } from '../../constants/routes';
import { isEmail } from '../../utils/isEmail';

const EMAIL_ERROR = '올바른 이메일 형식을 입력하세요';
const PASSWORD_ERROR = '비밀번호를 입력하세요';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  // 입력 중에는 해당 칸의 에러를 지우고, 입력창에서 벗어나거나 로그인을 누를 때 검사한다.
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
  };

  const handleEmailBlur = () => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: email && !isEmail(email) ? EMAIL_ERROR : '',
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {
      email: isEmail(email) ? '' : EMAIL_ERROR,
      password: password ? '' : PASSWORD_ERROR,
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;

    // 로그인 API는 UI 구현 후에 연결한다. 지금은 입력 형식만 맞으면 대시보드로 이동한다.
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <AuthCard
      title="로그인"
      footer={
        <>
          계정이 없으신가요?{' '}
          <Link
            to={ROUTES.SIGNUP}
            className="rounded-sm font-medium text-dash-black underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-muted"
          >
            회원가입
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        {/* 디자인에는 라벨이 보이지 않으므로 aria-label로 입력칸 이름을 알려준다. */}
        <TextInput
          type="email"
          aria-label="이메일"
          placeholder="이메일을 입력하세요"
          autoComplete="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={errors.email}
        />
        <TextInput
          type="password"
          aria-label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          autoComplete="current-password"
          value={password}
          onChange={handlePasswordChange}
          error={errors.password}
        />
        <Button type="submit" className="w-full">
          로그인
        </Button>
      </form>

      <div className="mt-3 flex items-center gap-3 text-sm leading-5 text-dash-muted">
        <span className="h-px flex-1 bg-dash-line" />
        또는
        <span className="h-px flex-1 bg-dash-line" />
      </div>

      {/* 카카오 로그인도 API 연결 단계에서 동작을 붙인다. */}
      <KakaoLoginButton />
    </AuthCard>
  );
}

export default LoginPage;
