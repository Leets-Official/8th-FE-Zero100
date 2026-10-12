import { useState } from 'react';
import Button from '../../components/dashboard/Button';
import TextInput from '../../components/dashboard/TextInput';
import Textarea from '../../components/dashboard/Textarea';
import CheckIcon from '../../components/dashboard/CheckIcon';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function DashboardPage() {
  const [email, setEmail] = useState('');
  const emailError =
    email !== '' && !EMAIL_PATTERN.test(email) ? '올바른 이메일 형식을 입력하세요' : '';

  return (
    <div className="flex flex-col gap-4 p-8">
      <h1>공통 컴포넌트 예시 페이지</h1>
      <section className="flex items-center gap-3">
        <Button>Primary Button</Button>
        <Button variant="variant">Secondary Button</Button>
        <Button variant="small">Small Button</Button>
      </section>

      <section className="w-[630px]">
        <TextInput placeholder="텍스트를 입력하세요" />
      </section>

      <section className="flex w-[630px] flex-col gap-6">
        <Textarea
          label="Text Input"
          placeholder="텍스트를 입력하세요"
          helperText="8자 이상, 영문/숫자/특수문자 포함"
        />
        <Textarea
          label="Email Input"
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={emailError}
        />
      </section>

      <section className="flex items-center gap-3">
        <CheckIcon />
      </section>
    </div>
  );
}

export default DashboardPage;
