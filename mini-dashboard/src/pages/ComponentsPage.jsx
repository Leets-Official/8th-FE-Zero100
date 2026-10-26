import { useState } from 'react';
import { useDashboard } from '../hooks/useDashboard.js';
import Button from '../components/common/Button.jsx';
import TextInput from '../components/common/TextInput.jsx';
import TextArea from '../components/common/TextArea.jsx';
import Modal from '../components/common/Modal.jsx';
import PageHeading from '../components/layout/PageHeading.jsx';

function DemoSection({ title, children }) {
  return (
    <section className="rounded-lg border border-line bg-white p-6">
      <h2 className="mb-5 text-base font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function ComponentsPage() {
  const [text, setText] = useState('');
  const [content, setContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useDashboard();

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <PageHeading
        title="공통 컴포넌트"
        description="버튼, 입력 폼, 모달과 알림을 확인할 수 있어요."
      />
      <div className="grid gap-6">
        <DemoSection title="Button">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => showToast('기본 버튼을 눌렀습니다.')}>기본 버튼</Button>
            <Button variant="secondary" onClick={() => showToast('보조 버튼을 눌렀습니다.')}>
              보조 버튼
            </Button>
            <Button variant="ghost" onClick={() => showToast('텍스트 버튼을 눌렀습니다.')}>
              텍스트 버튼
            </Button>
            <Button variant="danger" onClick={() => setIsModalOpen(true)}>
              삭제
            </Button>
            <Button disabled>비활성화</Button>
            <Button isLoading>저장 중</Button>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button size="sm" onClick={() => showToast('작은 버튼을 눌렀습니다.')}>
              작은 버튼
            </Button>
            <Button size="md" onClick={() => showToast('보통 버튼을 눌렀습니다.')}>
              보통 버튼
            </Button>
            <Button size="lg" onClick={() => showToast('큰 버튼을 눌렀습니다.')}>
              큰 버튼
            </Button>
          </div>
        </DemoSection>
        <DemoSection title="TextInput">
          <div className="grid gap-5 md:grid-cols-2">
            <TextInput
              label="기본 입력"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="내용을 입력해 주세요"
              helperText="label과 입력창이 연결되어 있어요."
            />
            <TextInput
              label="이메일 오류 예시"
              type="email"
              defaultValue="example"
              error="이메일 형식을 확인해 주세요."
            />
            <TextInput label="읽기 전용" defaultValue="ZERO100 Admin" readOnly />
            <TextInput label="비활성화 입력" placeholder="입력할 수 없어요" disabled />
          </div>
        </DemoSection>
        <DemoSection title="TextArea">
          <TextArea
            label="내용"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            maxLength={500}
            placeholder="문의 내용을 입력해 주세요"
            helperText={`${content.length} / 500자`}
          />
        </DemoSection>
        <DemoSection title="Modal · Toast">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setIsModalOpen(true)}>확인 모달 열기</Button>
            <Button variant="secondary" onClick={() => showToast('알림이 표시되었습니다.')}>
              알림 표시
            </Button>
          </div>
        </DemoSection>
      </div>
      {isModalOpen && (
        <Modal title="선택한 항목을 삭제하시겠습니까?" onClose={closeModal}>
          <div className="mt-8 flex justify-end gap-3">
            <Button variant="secondary" autoFocus onClick={closeModal}>
              취소
            </Button>
            <Button
              onClick={() => {
                closeModal();
                showToast('삭제 확인 버튼을 눌렀습니다.');
              }}
            >
              삭제
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ComponentsPage;
