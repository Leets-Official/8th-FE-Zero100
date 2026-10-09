import { twMerge } from 'tailwind-merge';
import { useModal } from '../contexts/ModalContext.js';
import Button from './Button.jsx';

const MODAL_BUTTON_CLASS_NAME =
  'inline-flex items-center justify-center h-[34px] px-[16px] py-[0px] rounded-[5px] bg-[#ffffff] font-[family-name:var(--font-family-base)] font-bold text-[12px] leading-none tracking-[0]';

function DeleteModal({ onConfirm }) {
  const { isModalOpen, targetTodoId, closeModal } = useModal();

  if (!isModalOpen) return null;

  const handleConfirm = () => {
    onConfirm(targetTodoId);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center w-full h-full bg-[rgba(0,0,0,0.45)]">
      <div
        className="box-border w-[310px] min-h-[105px] pt-[24px] pr-[18px] pb-[14px] pl-[18px] rounded-[7px] bg-[#ffffff] shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
      >
        <p
          id="delete-modal-title"
          className="m-0 font-[family-name:var(--font-family-base)] font-bold text-[13px] leading-[20px] tracking-[0] text-left text-[#111111]"
        >
          할 일을 삭제하겠습니까?
        </p>
        <div className="flex flex-row justify-end items-center gap-[8px] mt-[24px]">
          <Button
            variant="secondary"
            className={twMerge(MODAL_BUTTON_CLASS_NAME, 'border-[#e5e5e5] text-[#555555]')}
            onClick={closeModal}
          >
            취소
          </Button>
          <Button
            variant="danger"
            className={twMerge(MODAL_BUTTON_CLASS_NAME, 'border-[#ffb4b4] text-[#ff3b30]')}
            onClick={handleConfirm}
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
