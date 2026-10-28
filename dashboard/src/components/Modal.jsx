import { useEffect } from 'react';
import Button from './Button';

const Modal = ({ message, onCancel, onConfirm, cancelText = '취소', confirmText = '확인' }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCancel();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  const handleBackdropMouseDown = (e) => {
    if (e.target === e.currentTarget) onCancel();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onMouseDown={handleBackdropMouseDown}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="flex w-[385px] flex-col items-center gap-8 rounded-[10px] border border-[#E5E7EB] bg-white p-8"
      >
        <p className="text-base text-black">{message}</p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
