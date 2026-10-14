import { useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useModalKeyboard } from '../../../hooks/useModalKeyboard';

/**
 * Todo 화면의 모달 틀: 어두운 배경, Esc/배경 클릭으로 닫기, 포커스 가두기.
 * body 바로 아래에 그려서(createPortal) 다른 요소의 z-index나 overflow에 가려지지 않게 한다.
 */
function Modal({ title, onClose, children }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  useModalKeyboard(dialogRef, onClose);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-[348px] rounded-xl bg-white p-5 shadow-xl"
      >
        <h2 id={titleId} className="text-sm font-semibold text-ink">
          {title}
        </h2>
        {children}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
