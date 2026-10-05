import Button from './common/Button';

const ConfirmModal = ({ message, onCancel, onConfirm }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onCancel}
    >
      <div className="w-80 rounded-lg bg-white p-5 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm font-semibold">{message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <Button onClick={onCancel}>취소</Button>
          <Button variant="danger" onClick={onConfirm}>
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
