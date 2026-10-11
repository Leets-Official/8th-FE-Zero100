import { useEffect, useState } from 'react';
import Button from '../components/dashboard/Button';
import Input from '../components/dashboard/Input';
import Modal from '../components/dashboard/Modal';
import Toast from '../components/dashboard/Toast';

function DashboardPage() {
  const [text, setText] = useState('');
  const [guideText, setGuideText] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  function handleEmailBlur(event) {
    const { value, validity } = event.target;

    setEmailError(value && !validity.valid ? '올바른 이메일 형식을 입력하세요' : '');
  }

  function handleConfirm() {
    setIsModalOpen(false);
    setToast({ message: '문의가 삭제되었습니다.' });
  }

  return (
    <section aria-labelledby="dashboard-title">
      <div className="mx-auto flex max-w-[630px] flex-col gap-[32px]">
        <h2 id="dashboard-title" className="text-[24px] font-bold text-[#222222]">
          공통 컴포넌트
        </h2>

        <section className="flex flex-col gap-[16px]">
          <h3 className="text-[20px] font-bold text-[#222222]">Text Input</h3>

          <Input
            label="텍스트 입력"
            hideLabel
            placeholder="텍스트를 입력하세요"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </section>

        <section className="flex flex-col gap-[24px]">
          <h3 className="text-[20px] font-bold text-[#222222]">Text area</h3>

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
          <h3 className="text-[20px] font-bold text-[#222222]">Button</h3>

          <div className="flex flex-wrap items-center gap-[16px]">
            <Button>Primary Button</Button>

            <Button variant="secondary">Secondary Button</Button>

            <Button size="small">Small Button</Button>
          </div>
        </section>

        <section className="flex flex-col items-start gap-[16px]">
          <h3 className="text-[20px] font-bold text-[#222222]">Modal</h3>

          <Button onClick={() => setIsModalOpen(true)}>삭제 모달 열기</Button>
        </section>
      </div>

      {isModalOpen && (
        <Modal
          title="문의를 삭제하시겠습니까?"
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
        />
      )}

      <Toast message={toast?.message} />
    </section>
  );
}

export default DashboardPage;
