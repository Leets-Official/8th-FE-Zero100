import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import AuthCard from '../../components/auth/AuthCard/AuthCard';
import Button from '../../components/dashboard/Button/Button';
import TextInput from '../../components/dashboard/TextInput/TextInput';
import { ROUTES } from '../../constants/routes';
import { isEmail } from '../../utils/isEmail';
import { isValidName } from '../../utils/isValidName';
import { isValidPassword } from '../../utils/isValidPassword';

const INITIAL_VALUES = { email: '', password: '', name: '' };

/**
 * 칸마다 값이 올바르면 빈 문자열, 틀리면 에러 문구를 돌려준다.
 * 이메일은 붙여 넣을 때 딸려 온 앞뒤 공백을 빼고 검사한다. (이름은 isValidName 안에서 공백을 뺀다)
 */
const VALIDATORS = {
  email: (value) => (isEmail(value.trim()) ? '' : '올바른 이메일 형식을 입력하세요'),
  password: (value) =>
    isValidPassword(value) ? '' : '8자 이상, 영문/숫자/특수문자를 포함해 입력하세요',
  name: (value) => (isValidName(value) ? '' : '2자 이상 8자 이하로 입력하세요'),
};

function SignupPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState(INITIAL_VALUES);

  // 세 칸 모두 input의 name으로 어떤 값인지 구분해서 같은 핸들러를 쓴다.
  // 입력 중에는 해당 칸의 에러를 지우고, 입력창에서 벗어나거나 회원가입을 누를 때 검사한다.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  // 아직 아무것도 입력하지 않은 칸은 벗어나도 에러를 띄우지 않는다.
  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: value ? VALIDATORS[name](value) : '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {
      email: VALIDATORS.email(values.email),
      password: VALIDATORS.password(values.password),
      name: VALIDATORS.name(values.name),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    // 회원가입 API는 UI 구현 후에 연결한다. 지금은 입력 형식만 맞으면 로그인 화면으로 이동한다.
    // API를 연결할 때 이메일과 이름은 검사한 값과 같게 trim()한 값을 보낸다.
    navigate(ROUTES.LOGIN);
  };

  return (
    <AuthCard
      title="회원가입"
      footer={
        <>
          이미 계정이 있으신가요?{' '}
          <Link
            to={ROUTES.LOGIN}
            className="rounded-sm font-medium text-dash-black underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-muted"
          >
            로그인
          </Link>
        </>
      }
    >
      <form className="mb-4 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        {/* 디자인에는 라벨이 보이지 않으므로 aria-label로 입력칸 이름을 알려준다. */}
        <TextInput
          type="email"
          name="email"
          aria-label="이메일"
          placeholder="이메일을 입력하세요"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />
        <TextInput
          type="password"
          name="password"
          aria-label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          autoComplete="new-password"
          helperText="8자 이상, 영문/숫자/특수문자 포함"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />
        <TextInput
          name="name"
          aria-label="이름"
          placeholder="이름을 입력하세요"
          autoComplete="name"
          helperText="2자 이상 8자 이하"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
        />
        <Button type="submit" className="w-full">
          회원가입
        </Button>
      </form>
    </AuthCard>
  );
}

export default SignupPage;
