import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button.jsx';

function DeleteConfirmDialog({ onCancel, onConfirm }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();

    return () => dialog.close();
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby="delete-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      className="m-auto flex w-[420px] max-w-[calc(100vw-32px)] flex-col items-start rounded-[10px] bg-white px-7 pt-[26px] pb-[22px] shadow-[0_6px_20px_0_rgba(0,0,0,0.10)] backdrop:bg-black/50"
    >
      <h2 id="delete-dialog-title" className="text-base font-bold text-[#111]">
        할 일을 삭제하겠습니까?
      </h2>
      <div className="mt-9 flex w-full justify-end gap-2">
        <Button variant="secondary" onClick={onCancel} autoFocus>
          취소
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          삭제
        </Button>
      </div>
    </dialog>,
    document.body,
  );
}

export default DeleteConfirmDialog;
