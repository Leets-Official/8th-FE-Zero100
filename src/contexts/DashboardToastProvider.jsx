import { useEffect, useState } from 'react';
import { DashboardToastContext } from './DashboardToastContext';
import Toast from '../components/dashboard/Toast';

function DashboardToastProvider(props) {
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast({ id: crypto.randomUUID(), message });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <DashboardToastContext.Provider value={{ showToast }}>
      {props.children}
      <div aria-live="polite" className="fixed right-6 bottom-[45px]">
        {toast && <Toast message={toast.message} />}
      </div>
    </DashboardToastContext.Provider>
  );
}

export default DashboardToastProvider;
