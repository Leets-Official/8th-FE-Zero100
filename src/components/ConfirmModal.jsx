import Button from './Button';

function ConfirmModal(props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        className="flex w-[420px] flex-col rounded-[10px] bg-white px-7 pt-9 pb-[22px]"
      >
        <p id="confirm-modal-title" className="text-[15px] leading-[1.6] font-bold text-[#111]">
          {props.message}
        </p>
        <div className="mt-[34px] flex justify-end gap-2.5">
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
