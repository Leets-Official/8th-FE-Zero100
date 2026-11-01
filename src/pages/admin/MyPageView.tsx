import { useCallback, useRef, useState } from 'react';
import NameChangeView from '../../components/account/NameChangeView';
import PasswordChangeView from '../../components/account/PasswordChangeView';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/mypage.css';

export default function MyPageView() {
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const runAction = useCallback(async (action: () => Promise<void>) => {
    if (lock.current)
      throw new Error('다른 변경 작업을 처리 중입니다. 잠시 후 다시 시도해 주세요.');
    lock.current = true;
    setBusy(true);
    try {
      await action();
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }, []);
  if (!user) return null;
  return (
    <div className="form-page mypage-page">
      <h1 className="admin-page-title">마이페이지</h1>
      <div className="account-forms mypage-forms">
        <NameChangeView user={user} disabled={busy} runAction={runAction} />
        <PasswordChangeView disabled={busy} runAction={runAction} />
      </div>
    </div>
  );
}
