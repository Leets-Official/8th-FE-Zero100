import Button from './Button';

function ConfirmModal(props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="flex flex-col gap-4 rounded-lg bg-white p-6">
        <p>{props.message}</p>
        <div className="flex justify-end gap-2">
          <Button onClick={props.onCancel}>취소</Button>
          <Button variant="delete" onClick={props.onConfirm}>
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
