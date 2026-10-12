import { useState } from 'react';
import { useOutletContext } from 'react-router';
import Button from '../../components/dashboard/Button/Button';
import Modal from '../../components/dashboard/Modal/Modal';
import TextArea from '../../components/dashboard/TextArea/TextArea';
import TextInput from '../../components/dashboard/TextInput/TextInput';
import { isEmail } from '../../utils/isEmail';

function ComponentSection({ title, children }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-dash-black">{title}</h2>
      {children}
    </section>
  );
}

/** 대시보드 홈: 이번 주에 만든 공통 컴포넌트를 실제로 눌러보고 확인하는 화면 */
function DashboardHomePage() {
  const { showToast } = useOutletContext();
  const [email, setEmail] = useState('');
  // 모달을 연 버튼을 기억해 두었다가, 모달이 닫히면 그 버튼으로 포커스를 돌려준다.
  const [modalTrigger, setModalTrigger] = useState(null);

  const emailError = email && !isEmail(email) ? '올바른 이메일 형식을 입력하세요' : '';

  const openModal = () => setModalTrigger(document.activeElement);

  const closeModal = () => {
    modalTrigger?.focus();
    setModalTrigger(null);
  };

  const confirmDelete = () => {
    closeModal();
    showToast('문의가 삭제되었습니다.');
  };

  return (
    <div className="flex max-w-[630px] flex-col gap-10">
      <h1 className="text-[28px] font-bold text-dash-black">공통 컴포넌트</h1>

      <ComponentSection title="Text Input">
        <TextInput aria-label="텍스트 입력 예시" />
      </ComponentSection>

      <ComponentSection title="Text Input (라벨, 안내/에러 문구)">
        <TextInput
          type="password"
          label="비밀번호"
          helperText="8자 이상, 영문/숫자/특수문자 포함"
          placeholder="비밀번호를 입력하세요"
        />
        <TextInput
          type="email"
          label="이메일"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={emailError}
        />
      </ComponentSection>

      <ComponentSection title="Text Area">
        <TextArea label="문의 내용" placeholder="문의 내용을 입력하세요" />
      </ComponentSection>

      <ComponentSection title="Button">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button size="small">Small Button</Button>
          <Button disabled>Disabled</Button>
        </div>
      </ComponentSection>

      <ComponentSection title="Modal / Toast">
        <div>
          <Button onClick={openModal}>삭제 모달 열기</Button>
        </div>
      </ComponentSection>

      {modalTrigger && (
        <Modal message="문의를 삭제하시겠습니까?" onCancel={closeModal} onConfirm={confirmDelete} />
      )}
    </div>
  );
}

export default DashboardHomePage;
