import { useEffect, useState } from 'react';
import axios from 'axios';
import { getDashboard } from '../api/dashboard.js';
import Toast from '../components/common/Toast.jsx';
import { DashboardContext } from './DashboardContext.js';

function DashboardProvider({ children }) {
  const [result, setResult] = useState({ status: 'loading', data: null });
  const [requestNumber, setRequestNumber] = useState(0);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    getDashboard({ signal: controller.signal })
      .then((data) => {
        if (!controller.signal.aborted) setResult({ status: 'success', data });
      })
      .catch((error) => {
        if (!axios.isCancel(error) && !controller.signal.aborted)
          setResult({ status: 'error', data: null });
      });
    return () => controller.abort();
  }, [requestNumber]);

  function reload() {
    setResult({ status: 'loading', data: null });
    setRequestNumber((current) => current + 1);
  }

  function showToast(message) {
    setToastMessage(message);
  }

  function closeToast() {
    setToastMessage('');
  }

  function addInquiry({ title, content }) {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    if (!trimmedTitle || !trimmedContent) return;
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    setResult((current) => ({
      ...current,
      data: {
        ...current.data,
        inquiries: [
          {
            id,
            title: trimmedTitle,
            content: trimmedContent,
            authorId: current.data.profile.id,
            createdAt,
          },
          ...current.data.inquiries,
        ],
      },
    }));
    showToast('문의가 추가되었습니다.');
  }

  function updateProfile({ name, email }) {
    if (!name.trim() || !email.trim()) return;
    setResult((current) => ({
      ...current,
      data: {
        ...current.data,
        profile: { ...current.data.profile, name: name.trim(), email: email.trim() },
      },
    }));
    showToast('내 정보가 변경되었습니다.');
  }

  return (
    <DashboardContext.Provider value={{ ...result, reload, addInquiry, updateProfile, showToast }}>
      {children}
      <Toast message={toastMessage} onDismiss={closeToast} />
    </DashboardContext.Provider>
  );
}

export default DashboardProvider;
