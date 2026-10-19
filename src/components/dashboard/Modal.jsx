import { useEffect, useId, useRef } from 'react';
import Button from './Button';

function Modal({ title, onClose, onConfirm, confirmText = '확인' }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;

    dialog.showModal();

    return () => {
      dialog.close();

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[385.25px] max-w-[calc(100%-32px)] overflow-y-auto rounded-[10px] border-0 bg-[#ffffff] p-[32.93px] text-[#000000] shadow-[inset_0_0_0_0.93px_#e5e7eb] backdrop:bg-[#000000]/40"
    >
      <div className="flex flex-col items-center gap-[31.99px]">
        <h2 id={titleId} className="text-center text-[18px] leading-[30px] font-normal">
          {title}
        </h2>

        <div className="flex justify-center gap-[12px]">
          <Button variant="secondary" onClick={onClose} autoFocus>
            취소
          </Button>

          <Button onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
