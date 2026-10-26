import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

const SignupPage = () => {
  const [form, setForm] = useState({ email: '', password: '', nickname: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!EMAIL_REGEX.test(form.email)) {
      nextErrors.email = '올바른 이메일 형식을 입력하세요';
    }
    if (!PASSWORD_REGEX.test(form.password)) {
      nextErrors.password = '8자 이상, 영문/숫자/특수문자를 포함해야 합니다';
    }
    const nicknameLength = form.nickname.trim().length;
    if (nicknameLength < 2 || nicknameLength > 8) {
      nextErrors.nickname = '2자 이상 8자 이하로 입력하세요';
    }
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    // 회원가입 API 연동은 다음 단계에서 구현
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] px-4">
      <section className="flex w-full max-w-[448px] flex-col gap-4 rounded-[10px] border border-[#E5E7EB] bg-white p-8">
        <h1 className="mb-2 text-center text-2xl font-bold text-black">회원가입</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <TextInput
            type="email"
            name="email"
            aria-label="이메일"
            placeholder="이메일을 입력하세요"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            errorText={errors.email}
          />
          <TextInput
            type="password"
            name="password"
            aria-label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            helperText="8자 이상, 영문/숫자/특수문자 포함"
            errorText={errors.password}
          />
          <TextInput
            name="nickname"
            aria-label="닉네임"
            placeholder="닉네임을 입력하세요"
            value={form.nickname}
            onChange={handleChange}
            helperText="2자 이상 8자 이하"
            errorText={errors.nickname}
          />
          <Button type="submit" className="w-full">
            회원가입
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-[#4A5565]">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="text-black underline">
            로그인
          </Link>
        </p>
      </section>
    </div>
  );
};

export default SignupPage;
