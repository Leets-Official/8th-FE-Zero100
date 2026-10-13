import { useEffect, useId, useRef } from 'react';
import Button from './Button';
import FormError from './FormError';

export default function ConfirmDialog({ open, message, pending, error, onClose, onConfirm }) {
  const ref = useRef(null);
  const id = useId();
  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="confirm-dialog"
      aria-labelledby={id}
      onCancel={(event) => {
        event.preventDefault();
        if (!pending) onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && !pending) onClose();
      }}
    >
      <div className="confirm-dialog-inner">
        <p id={id}>{message}</p>
        <FormError message={error} />
        <div className="flex items-center justify-center gap-3">
          <Button variant="secondary" disabled={pending} onClick={onClose} autoFocus>
            취소
          </Button>
          <Button disabled={pending} onClick={onConfirm}>
            {pending ? '삭제 중...' : '확인'}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
