import { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import { AdminButton, AdminTextInput } from '../components/admin/AdminUI.jsx';
import './my-page.css';

function MyPage() {
  const [nameNotice, setNameNotice] = useState(false);
  const [passwordNotice, setPasswordNotice] = useState(false);

  function handleNameSubmit(event) {
    event.preventDefault();
    setNameNotice(true);
  }

  function handlePasswordSubmit(event) {
    event.preventDefault();
    setPasswordNotice(true);
  }

  return (
    <AdminLayout>
      <section className="my-page">
        <h1>마이페이지</h1>
        <form className="my-page__card" onSubmit={handleNameSubmit}>
          <h2>이름 변경</h2>
          <AdminTextInput
            id="profile-name"
            name="name"
            aria-label="변경할 이름"
            placeholder="텍스트를 입력하세요"
            autoComplete="name"
            required
          />
          {nameNotice && <p role="status">이름 변경 기능은 준비 중입니다.</p>}
          <div className="my-page__actions">
            <AdminButton type="submit">변경</AdminButton>
          </div>
        </form>
        <form className="my-page__card" onSubmit={handlePasswordSubmit}>
          <h2>비밀번호 변경</h2>
          <AdminTextInput
            id="current-password"
            name="currentPassword"
            type="password"
            label="현재 비밀번호"
            placeholder="현재 비밀번호"
            autoComplete="current-password"
            required
          />
          <AdminTextInput
            id="new-password"
            name="newPassword"
            type="password"
            label="새 비밀번호"
            placeholder="새 비밀번호"
            autoComplete="new-password"
            required
          />
          <AdminTextInput
            id="confirm-password"
            name="confirmPassword"
            type="password"
            label="새 비밀번호 확인"
            placeholder="새 비밀번호 확인"
            autoComplete="new-password"
            required
          />
          {passwordNotice && <p role="status">비밀번호 변경 기능은 준비 중입니다.</p>}
          <div className="my-page__actions">
            <AdminButton type="submit">변경</AdminButton>
          </div>
        </form>
      </section>
    </AdminLayout>
  );
}

export default MyPage;
