import { useEffect, useId } from 'react';
import Button from '../Button';

const Modal = ({
  open = false,
  message = '문의를 삭제하시겠습니까?',
  cancelLabel = '취소',
  confirmLabel = '확인',
  onCancel,
  onConfirm,
}) => {
  const messageId = useId();

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCancel?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="common-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onCancel?.();
        }
      }}
    >
      <section
        className="common-component common-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={messageId}
      >
        <p id={messageId} className="common-modal__message">
          {message}
        </p>

        <div className="common-modal__actions">
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>

          <Button variant="primary" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
