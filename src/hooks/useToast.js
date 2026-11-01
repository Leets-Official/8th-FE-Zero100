import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';
export function useToast() {
  const notify = useContext(ToastContext);
  if (!notify) throw new Error('ToastProvider가 필요합니다.');
  return notify;
}
