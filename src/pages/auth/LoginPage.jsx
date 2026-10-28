import { Link } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import KakaoIcon from '../../components/auth/KakaoIcon';
import Button from '../../components/dashboard/Button';
import Textarea from '../../components/dashboard/Textarea';
import { ROUTES } from '../../constants/routes';

function LoginPage() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <AuthLayout title="로그인">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <Textarea type="email" aria-label="이메일" placeholder="이메일을 입력하세요" />
          <Textarea type="password" aria-label="비밀번호" placeholder="비밀번호를 입력하세요" />
        </div>
        <Button type="submit" className="w-full">
          로그인
        </Button>
      </form>

      <div className="flex h-5 items-center gap-2">
        <div className="flex-1 border-t border-gray-200" />
        <span className="text-sm leading-5 text-gray-500">또는</span>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      <button
        type="button"
        className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-yellow-400 py-3 text-base leading-6 font-bold text-stone-800"
      >
        <KakaoIcon />
        카카오 로그인
      </button>

      <p className="text-center text-sm leading-5 text-gray-600">
        계정이 없으신가요?{' '}
        <Link to={ROUTES.SIGNUP} className="text-black underline">
          회원가입
        </Link>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;
