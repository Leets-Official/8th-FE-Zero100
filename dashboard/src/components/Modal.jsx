import Button from './Button';

const Modal = ({ message, onCancel, onConfirm, cancelText = '취소', confirmText = '확인' }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="flex w-[385px] flex-col items-center gap-8 rounded-[10px] border border-[#E5E7EB] bg-white p-8"
        onClick={(e) => e.stopPropagation()}
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
