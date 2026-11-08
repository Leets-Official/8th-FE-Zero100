import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
  getDashboard,
  createInquiry,
  deleteInquiry as deleteInquiryRequest,
  updateName,
  updatePassword,
} from '../api/dashboard.js';
import { login as loginRequest } from '../api/auth.js';
import { getToken, setToken } from '../api/client.js';
import Toast from '../components/common/Toast.jsx';
import { DashboardContext } from './DashboardContext.js';

function DashboardProvider({ children }) {
  const [token, setTokenState] = useState(getToken);
  const [result, setResult] = useState({
    status: getToken() ? 'loading' : 'unauthenticated',
    data: null,
  });
  const [requestNumber, setRequestNumber] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    getDashboard({ signal: controller.signal })
      .then((data) => {
        if (!controller.signal.aborted) setResult({ status: 'success', data });
      })
      .catch((error) => {
        if (axios.isCancel(error) || controller.signal.aborted) return;
        if (error.response?.status === 401) {
          setToken(null);
          setTokenState(null);
          setResult({ status: 'unauthenticated', data: null });
        } else setResult({ status: 'error', data: null });
      });
    return () => controller.abort();
  }, [token, requestNumber]);

  const acceptToken = useCallback((nextToken) => {
    if (!nextToken) throw new Error('로그인 응답이 올바르지 않습니다.');
    setToken(nextToken);
    setResult({ status: 'loading', data: null });
    setTokenState(nextToken);
    setRequestNumber((current) => current + 1);
  }, []);
  async function login(credentials) {
    acceptToken(await loginRequest(credentials));
  }
  function logout() {
    setToken(null);
    setTokenState(null);
    setResult({ status: 'unauthenticated', data: null });
  }
  function reload() {
    setResult({ status: 'loading', data: null });
    setRequestNumber((current) => current + 1);
  }
  function showToast(message) {
    setToast({ message, id: crypto.randomUUID() });
  }
  function closeToast() {
    setToast(null);
  }
  async function withSession(request, logoutOnUnauthorized = true) {
    const requestToken = getToken();
    try {
      const response = await request();
      if (!requestToken || getToken() !== requestToken)
        throw new Error('로그인 상태가 변경되었습니다.');
      return response;
    } catch (error) {
      if (
        requestToken &&
        getToken() === requestToken &&
        logoutOnUnauthorized &&
        error.response?.status === 401
      )
        logout();
      throw error;
    }
  }
  async function addInquiry({ title, content, authorName, authorEmail }) {
    const inquiry = await withSession(() =>
      createInquiry({
        title: title.trim(),
        content: content.trim(),
        name: authorName.trim(),
        email: authorEmail.trim(),
      }),
    );
    setResult((current) =>
      current.data
        ? { ...current, data: { ...current.data, inquiries: [inquiry, ...current.data.inquiries] } }
        : current,
    );
    showToast('문의가 등록되었습니다.');
    return inquiry;
  }
  async function removeInquiry(id) {
    await withSession(() => deleteInquiryRequest(id));
    setResult((current) =>
      current.data
        ? {
            ...current,
            data: {
              ...current.data,
              inquiries: current.data.inquiries.filter((item) => item.id !== id),
            },
          }
        : current,
    );
    showToast('문의가 삭제되었습니다.');
  }
  async function updateProfile({ name }) {
    const profile = await withSession(() => updateName(name.trim()));
    setResult((current) =>
      current.data ? { ...current, data: { ...current.data, profile } } : current,
    );
    showToast('이름이 변경되었습니다.');
  }
  async function changePassword(currentPassword, newPassword) {
    await withSession(() => updatePassword(currentPassword, newPassword), false);
    showToast('비밀번호가 변경되었습니다.');
  }

  return (
    <DashboardContext.Provider
      value={{
        ...result,
        reload,
        login,
        logout,
        acceptToken,
        addInquiry,
        removeInquiry,
        updateProfile,
        changePassword,
        showToast,
      }}
    >
      {children}
      <Toast message={toast?.message ?? ''} announcementId={toast?.id} onDismiss={closeToast} />
    </DashboardContext.Provider>
  );
}
export default DashboardProvider;
