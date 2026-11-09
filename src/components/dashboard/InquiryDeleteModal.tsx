import { useId } from 'react';
import Button from './Button.tsx';
import Card from './Card.tsx';
import FormErrorMessage from './FormErrorMessage.tsx';
import Modal from './Modal.tsx';

// Figma 삭제 모달 화면의 문의 삭제 확인 모달
interface InquiryDeleteModalProps {
  isOpen: boolean;
  // 삭제 요청 중이면 버튼을 비활성화해 중복 요청과 닫기를 막는다.
  isDeleting?: boolean;
  // 삭제 실패 메시지. 없으면 표시하지 않는다.
  errorMessage?: string;
  onClose: () => void;
  onConfirm: () => void;
}

function InquiryDeleteModal({
  isOpen,
  isDeleting = false,
  errorMessage,
  onClose,
  onConfirm,
}: InquiryDeleteModalProps) {
  const titleId = useId();

  const handleClose = () => {
    if (!isDeleting) onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      aria-labelledby={titleId}
      className="box-border fixed inset-0 z-[1000] flex items-center justify-center p-[16px] bg-[#000000]/50"
    >
      <Card className="flex flex-col gap-[32px] w-full max-w-[384.58px] p-[31.93px]">
        <h2
          id={titleId}
          className="m-0 font-[family-name:var(--font-family-base)] font-normal text-[18px] leading-[28px] tracking-[0px] text-center text-[#000000]"
        >
          문의를 삭제하시겠습니까?
        </h2>
        <FormErrorMessage message={errorMessage} />
        <div className="flex flex-row justify-center gap-[12px] h-[45.9px]">
          <Button variant="secondary" onClick={handleClose} disabled={isDeleting}>
            취소
          </Button>
          <Button onClick={onConfirm} disabled={isDeleting} aria-busy={isDeleting}>
            {isDeleting ? '삭제 중...' : '확인'}
          </Button>
        </div>
      </Card>
    </Modal>
  );
}

export default InquiryDeleteModal;
