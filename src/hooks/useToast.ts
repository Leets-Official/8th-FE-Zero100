import { useEffect, useState } from 'react';

const TOAST_DURATION_MS = 3000;

interface ToastState {
  message: string;
}

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    if (!toast) return;

    const timerId = setTimeout(() => setToast(null), TOAST_DURATION_MS);
    return () => clearTimeout(timerId);
  }, [toast]);

  const showToast = (message: string) => setToast({ message });

  return { toastMessage: toast?.message, showToast };
}
