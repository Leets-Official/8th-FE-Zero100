import { useEffect } from 'react';

export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 5000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);
  return (
    <div className="toast" role="status">
      <svg width="15" height="15" viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="8" fill="currentColor" />
        <path d="m6 10 3 3 5-6" fill="none" stroke="white" strokeWidth="1.6" />
      </svg>
      <span>{toast.message}</span>
      <button type="button" aria-label="알림 닫기" onClick={() => onDismiss(toast.id)}>
        ×
      </button>
    </div>
  );
}
