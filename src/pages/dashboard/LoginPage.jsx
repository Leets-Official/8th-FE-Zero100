import { useState } from 'react';
import kakaoSymbol from '../../assets/kakao-symbol.svg';
import AuthCard from '../../components/dashboard/AuthCard.jsx';
import Button from '../../components/dashboard/Button.jsx';
import TextInput from '../../components/dashboard/TextInput.jsx';
import { validateEmail } from '../../utils/dashboard/validation.js';

const KAKAO_BUTTON_CLASS_NAME =
  'w-full h-[48px] gap-[8px] border-[1px] border-solid border-[#fee500] rounded-[8px] bg-[#fee500] font-[family-name:Pretendard,var(--font-family-base)] font-bold text-[16px] leading-[1.45] tracking-[-0.064px] text-[#381e1f]';

function validatePassword(password) {
  return password ? '' : '비밀번호를 입력하세요';
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  // 제출 후 오류가 표시된 입력 필드만 입력할 때마다 다시 검사해 오류 상태를 갱신
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = { email: validateEmail(email), password: validatePassword(password) };
    setErrors(nextErrors);

    // 오류가 있으면 첫 번째 오류 입력 필드로 포커스를 이동
    const firstInvalidField = Object.keys(nextErrors).find((field) => nextErrors[field]);
    if (firstInvalidField) {
      event.currentTarget.elements.namedItem(firstInvalidField).focus();
      return;
    }

    // 로그인 API 연동 전이므로 유효성 검사까지만 수행
  };

  return (
    <AuthCard
      title="로그인"
      linkGuideText="계정이 없으신가요?"
      linkLabel="회원가입"
      linkTo="/signup"
      className="gap-[26px]"
    >
      {/* Figma의 Form 높이(179.61px)를 유지하고, 오류 메시지가 표시되면 그만큼 늘어나도록 min-height로 지정 */}
      <form
        className="flex flex-col gap-[16px] min-h-[179.61px]"
        noValidate
        onSubmit={handleSubmit}
      >
        <TextInput
          type="email"
          name="email"
          label="이메일"
          hideLabel
          placeholder="이메일을 입력하세요"
          autoComplete="email"
          value={email}
          onChange={handleEmailChange}
          error={errors.email}
        />
        <TextInput
          type="password"
          name="password"
          label="비밀번호"
          hideLabel
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

      <div className="relative flex flex-row justify-center before:absolute before:inset-x-0 before:top-[9.54px] before:border-0 before:border-t-[0.93px] before:border-solid before:border-[#e5e7eb] before:content-['']">
        <span className="relative px-[8px] bg-[#ffffff] font-[family-name:var(--font-family-base)] font-normal text-[14px] leading-[20px] tracking-[0px] text-[#6a7282]">
          또는
        </span>
      </div>

      {/* 카카오 OAuth 연동 전이므로 UI만 구현 */}
      <Button type="button" className={KAKAO_BUTTON_CLASS_NAME}>
        <img src={kakaoSymbol} alt="" className="w-[18.505px] h-[17px]" />
        카카오 로그인
      </Button>
    </AuthCard>
  );
}

export default LoginPage;
