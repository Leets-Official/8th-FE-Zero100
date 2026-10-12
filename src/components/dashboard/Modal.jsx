import { useId } from 'react';
import Button from './Button';

function Modal(props) {
  const titleId = useId();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex flex-col gap-7 rounded-[10px] bg-white p-8 outline -outline-offset-1 outline-gray-200"
      >
        <p id={titleId} className="w-80 text-center text-lg leading-7 text-black">
          {props.message}
        </p>
        <div className="flex justify-center gap-3">
          <Button variant="variant" onClick={props.onCancel}>
            취소
          </Button>
          <Button onClick={props.onConfirm}>확인</Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
