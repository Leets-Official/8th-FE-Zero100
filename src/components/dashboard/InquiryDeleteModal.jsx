import { useId } from 'react';
import Button from './Button.jsx';
import Card from './Card.jsx';
import Modal from './Modal.jsx';

// Figma 삭제 모달 화면의 문의 삭제 확인 모달
function InquiryDeleteModal({ isOpen, onClose, onConfirm }) {
  const titleId = useId();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
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
        <div className="flex flex-row justify-center gap-[12px] h-[45.9px]">
          <Button variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button onClick={onConfirm}>확인</Button>
        </div>
      </Card>
    </Modal>
  );
}

export default InquiryDeleteModal;
