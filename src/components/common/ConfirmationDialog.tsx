import { useEffect, useId, useRef } from 'react';
import Button from './ButtonView';
import './confirmation-dialog.css';

interface ConfirmationDialogProps {
  open: boolean;
  message: string;
  pending?: boolean;
  error?: string;
  confirmLabel?: string;
  pendingLabel?: string;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

export default function ConfirmationDialog({
  open,
  message,
  pending = false,
  error = '',
  confirmLabel = '확인',
  pendingLabel = '처리 중...',
  onClose,
  onConfirm,
}: ConfirmationDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="confirm-dialog confirmation-dialog"
      aria-labelledby={id}
      aria-busy={pending}
      onCancel={(event) => {
        event.preventDefault();
        if (!pending) onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && !pending) onClose();
      }}
    >
      <div className="confirmation-dialog-inner">
        <p id={id}>{message}</p>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="confirmation-dialog-actions">
          <Button variant="secondary" disabled={pending} onClick={onClose} autoFocus>
            취소
          </Button>
          <Button
            disabled={pending}
            onClick={() => {
              void onConfirm();
            }}
          >
            {pending ? pendingLabel : confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
