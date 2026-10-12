import { useEffect, useEffectEvent, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** 모달이 열려 있는 동안 Tab/Shift+Tab 포커스가 모달 밖으로 나가지 않도록 처음과 끝을 이어준다. */
const trapFocus = (event, container) => {
  const focusableElements = container.querySelectorAll(FOCUSABLE_SELECTOR);
  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  const isFocusInside = container.contains(document.activeElement);

  if (event.shiftKey && (document.activeElement === firstElement || !isFocusInside)) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && (document.activeElement === lastElement || !isFocusInside)) {
    event.preventDefault();
    firstElement.focus();
  }
};

/**
 * 모든 모달이 함께 쓰는 틀: 어두운 배경, Esc/배경 클릭으로 닫기, 포커스 가두기.
 * body 바로 아래에 그려서(createPortal) 다른 요소의 z-index나 overflow에 가려지지 않게 한다.
 */
function Modal({ title, onClose, children }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  // 리스너는 처음 한 번만 등록하고, 항상 최신 onClose를 부르도록 Effect Event로 감싼다.
  const handleClose = useEffectEvent(onClose);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') handleClose();
      if (event.key === 'Tab' && dialogRef.current) trapFocus(event, dialogRef.current);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

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
