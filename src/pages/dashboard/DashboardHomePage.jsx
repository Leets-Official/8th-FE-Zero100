import { useState } from 'react';
import { useOutletContext } from 'react-router';
import Button from '../../components/dashboard/Button/Button';
import CheckCircleIcon from '../../components/dashboard/CheckCircleIcon/CheckCircleIcon';
import Modal from '../../components/dashboard/Modal/Modal';
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

/**
 * 대시보드 홈: Figma "공통 컴포넌트" 시트와 같은 구성으로 공통 컴포넌트를 보여준다.
 * Header, Sidebar, Footer는 DashboardLayout에서 실제 화면 틀로 사용하고 있다.
 */
function DashboardHomePage() {
  const { showToast } = useOutletContext();
  const [email, setEmail] = useState('');
  // 모달을 연 버튼을 기억해 두었다가, 모달이 닫히면 그 버튼으로 포커스를 돌려준다.
  const [modalTrigger, setModalTrigger] = useState(null);

  // 시안처럼 처음에는 에러 상태로 보여주고, 올바른 이메일을 입력하면 에러가 사라진다.
  const emailError = isEmail(email) ? '' : '올바른 이메일 형식을 입력하세요';

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
        <TextInput aria-label="텍스트 입력" />
      </ComponentSection>

      <ComponentSection title="Text area">
        <TextInput label="Text Input" helperText="8자 이상, 영문/숫자/특수문자 포함" />
        <TextInput
          type="email"
          label="Email Input"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={emailError}
        />
      </ComponentSection>

      <ComponentSection title="Button">
        <div className="flex flex-col items-start gap-3">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button size="small">Small Button</Button>
        </div>
      </ComponentSection>

      <ComponentSection title="Modal">
        <div>
          <Button onClick={openModal}>삭제 모달 열기</Button>
        </div>
      </ComponentSection>

      <ComponentSection title="Toast">
        <div>
          <Button onClick={() => showToast('문의가 삭제되었습니다.')}>토스트 띄우기</Button>
        </div>
      </ComponentSection>

      <ComponentSection title="Icon">
        <CheckCircleIcon className="text-dash-icon" />
      </ComponentSection>

      {modalTrigger && (
        <Modal message="문의를 삭제하시겠습니까?" onCancel={closeModal} onConfirm={confirmDelete} />
      )}
    </div>
  );
}

export default DashboardHomePage;
