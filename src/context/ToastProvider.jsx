import { useCallback, useState } from 'react';
import { ToastContext } from './ToastContext';
import Toast from '../components/common/Toast';

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const notify = useCallback(
    (message) =>
      setToasts((current) => [...current.slice(-2), { id: crypto.randomUUID(), message }]),
    [],
  );
  const dismiss = useCallback(
    (id) => setToasts((current) => current.filter((toast) => toast.id !== id)),
    [],
  );
  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div className="toast-region" aria-label="알림">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
