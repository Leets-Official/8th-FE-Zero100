import { useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useModalKeyboard } from '../../../hooks/useModalKeyboard';
import Button from '../Button/Button';

/**
 * 대시보드 확인 모달 (예: 문의를 삭제하시겠습니까? 취소 / 확인).
 * Esc·배경 클릭으로 닫히고, 열려 있는 동안 Tab 포커스는 모달 안에서만 움직인다.
 */
function Modal({ message, cancelLabel = '취소', confirmLabel = '확인', onCancel, onConfirm }) {
  const messageId = useId();
  const dialogRef = useRef(null);
  useModalKeyboard(dialogRef, onCancel);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={messageId}
        className="flex w-full max-w-[385px] flex-col gap-8 rounded-[10px] border border-dash-line bg-white p-[33px]"
      >
        <h2 id={messageId} className="text-center text-lg leading-7 font-normal text-dash-black">
          {message}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* 실수로 Enter를 눌러도 바로 확인되지 않도록 취소 버튼에 먼저 포커스를 둔다. */}
          <Button variant="secondary" onClick={onCancel} autoFocus>
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </section>
    </div>,
    document.body,
  );
}

export default Modal;
