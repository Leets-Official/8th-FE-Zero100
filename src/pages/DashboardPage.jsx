import { useState } from 'react';
import Button from '../components/dashboard/Button';
import Input from '../components/dashboard/Input';

function DashboardPage() {
  const [text, setText] = useState('');
  const [guideText, setGuideText] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  function handleEmailBlur(event) {
    const { value, validity } = event.target;

    setEmailError(value && !validity.valid ? '올바른 이메일 형식을 입력하세요' : '');
  }

  return (
    <main className="min-h-dvh bg-[#ffffff] px-[24px] py-[40px]">
      <div className="mx-auto flex max-w-[630px] flex-col gap-[32px]">
        <h1 className="text-[24px] font-bold text-[#222222]">공통 컴포넌트</h1>

        <section className="flex flex-col gap-[16px]">
          <h2 className="text-[20px] font-bold text-[#222222]">Text Input</h2>

          <Input
            label="텍스트 입력"
            hideLabel
            placeholder="텍스트를 입력하세요"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </section>

        <section className="flex flex-col gap-[24px]">
          <h2 className="text-[20px] font-bold text-[#222222]">Text area</h2>

          <Input
            label="Text Input"
            placeholder="텍스트를 입력하세요"
            helperText="8자 이상, 영문/숫자/특수문자 포함"
            value={guideText}
            onChange={(event) => setGuideText(event.target.value)}
          />

          <Input
            label="Email Input"
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            error={emailError}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError('');
            }}
            onBlur={handleEmailBlur}
          />
        </section>

        <section className="flex flex-col gap-[16px]">
          <h2 className="text-[20px] font-bold text-[#222222]">Button</h2>

          <div className="flex flex-wrap items-center gap-[16px]">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button size="small">Small Button</Button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
