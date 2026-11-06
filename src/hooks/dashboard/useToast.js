import { useEffect, useState } from 'react';

const TOAST_DURATION_MS = 3000;

export function useToast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;

    const timerId = setTimeout(() => setToast(null), TOAST_DURATION_MS);
    return () => clearTimeout(timerId);
  }, [toast]);

  const showToast = (message) => setToast({ message });

  return { toastMessage: toast?.message, showToast };
}
