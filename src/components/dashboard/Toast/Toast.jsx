import { useEffect, useEffectEvent } from 'react';
import CheckCircleIcon from '../CheckCircleIcon/CheckCircleIcon';

const TOAST_DURATION = 3000;

/** 화면 오른쪽 아래에 잠깐 떴다가 3초 뒤 사라지는 알림 */
function Toast({ message, onClose }) {
  const handleClose = useEffectEvent(onClose);

  useEffect(() => {
    const timerId = setTimeout(handleClose, TOAST_DURATION);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div
      role="status"
      className="fixed right-6 bottom-6 z-50 flex min-h-[53px] w-80 max-w-[calc(100%-48px)] items-center gap-2.5 rounded-lg border border-dash-toast-line bg-white px-3.5 py-4 text-[13px] leading-[19.5px] font-medium text-dash-icon shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
    >
      <CheckCircleIcon className="shrink-0" />
      <span className="min-w-0">{message}</span>
    </div>
  );
}

export default Toast;
