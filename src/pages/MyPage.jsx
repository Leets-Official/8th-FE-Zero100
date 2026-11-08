import { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import { AdminButton, AdminTextInput } from '../components/admin/AdminUI.jsx';
import { apiRequest } from '../api/client.js';
import useAuth from '../context/useAuth.js';
import './my-page.css';

const EMPTY_PASSWORDS = { currentPassword: '', newPassword: '', confirmPassword: '' };
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,}$/;

function MyPage() {
  const { token, user, updateName, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [nameNotice, setNameNotice] = useState('');
  const [nameError, setNameError] = useState('');
  const [namePending, setNamePending] = useState(false);
  const [passwordNotice, setPasswordNotice] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordPending, setPasswordPending] = useState(false);
  const [passwords, setPasswords] = useState(EMPTY_PASSWORDS);
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState({});
  const currentPasswordError =
    (passwordSubmitted || passwordTouched.currentPassword) && !passwords.currentPassword
      ? '현재 비밀번호를 입력해주세요'
      : '';
  const confirmationError =
    (passwordSubmitted || passwordTouched.confirmPassword) &&
    (!passwords.confirmPassword || passwords.newPassword !== passwords.confirmPassword)
      ? '새 비밀번호가 일치하지 않습니다'
      : '';
  const newPasswordError = !(passwordSubmitted || passwordTouched.newPassword)
    ? ''
    : !PASSWORD_PATTERN.test(passwords.newPassword)
      ? '8자 이상, 영문·숫자·특수문자를 포함해주세요'
      : passwords.currentPassword === passwords.newPassword
        ? '현재 비밀번호와 다른 비밀번호를 입력해주세요'
        : '';

  function handlePasswordBlur(event) {
    const { name } = event.target;
    setPasswordTouched((previous) => ({ ...previous, [name]: true }));
  }

  function handlePasswordChange(event) {
    const { name, value } = event.target;
    setPasswords((previous) => ({ ...previous, [name]: value }));
    setPasswordNotice('');
    setPasswordError('');
  }

  async function handleNameSubmit(event) {
    event.preventDefault();
    if (namePending) return;
    setNameNotice('');
    const trimmedName = name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 8) {
      setNameError('이름은 2자 이상 8자 이하로 입력해주세요');
      return;
    }
    setNameError('');
    setNamePending(true);
    try {
      await updateName(trimmedName);
      setName(trimmedName);
      setNameNotice('이름이 변경되었습니다.');
    } catch (error) {
      if (error.status === 401) {
        logout();
        return;
      }
      setNameError(error.message);
    } finally {
      setNamePending(false);
    }
  }

  async function handlePasswordSubmit(event) {
    event.preventDefault();
    if (passwordPending) return;
    setPasswordSubmitted(true);
    setPasswordNotice('');
    setPasswordError('');
    if (!passwords.currentPassword) {
      setPasswordError('현재 비밀번호를 입력해주세요.');
      return;
    }
    if (!PASSWORD_PATTERN.test(passwords.newPassword)) {
      setPasswordError('새 비밀번호는 8자 이상이며 영문·숫자·특수문자를 포함해야 합니다.');
      return;
    }
    if (passwords.currentPassword === passwords.newPassword) {
      setPasswordError('새 비밀번호는 현재 비밀번호와 다르게 입력해주세요.');
      return;
    }
    if (!passwords.confirmPassword || passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError('새 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    setPasswordPending(true);
    try {
      await apiRequest('/api/auth/me/password', {
        token,
        method: 'PATCH',
        body: { currentPassword: passwords.currentPassword, newPassword: passwords.newPassword },
      });
      setPasswords(EMPTY_PASSWORDS);
      setPasswordSubmitted(false);
      setPasswordTouched({});
      setPasswordNotice('비밀번호가 변경되었습니다. 다음 로그인부터 새 비밀번호를 사용해주세요.');
    } catch (error) {
      // 현재 비밀번호 불일치도 401이므로 자동 로그아웃하지 않고 서버 안내를 표시합니다.
      setPasswordError(error.message);
    } finally {
      setPasswordPending(false);
    }
  }

  return (
    <AdminLayout>
      <section className="my-page">
        <h1>마이페이지</h1>
        <form className="my-page__card" onSubmit={handleNameSubmit} aria-busy={namePending}>
          <h2>이름 변경</h2>
          <AdminTextInput
            id="profile-name"
            name="name"
            aria-label="변경할 이름"
            placeholder="텍스트를 입력하세요"
            autoComplete="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setNameError('');
              setNameNotice('');
            }}
            disabled={namePending}
            error={nameError}
            required
          />
          {nameNotice && <p role="status">{nameNotice}</p>}
          <div className="my-page__actions">
            <AdminButton type="submit" disabled={namePending}>
              {namePending ? '변경 중…' : '변경'}
            </AdminButton>
          </div>
        </form>
        <form
          className="my-page__card"
          onSubmit={handlePasswordSubmit}
          aria-busy={passwordPending}
          noValidate
        >
          <h2>비밀번호 변경</h2>
          <AdminTextInput
            id="current-password"
            name="currentPassword"
            type="password"
            label="현재 비밀번호"
            placeholder="현재 비밀번호"
            autoComplete="current-password"
            error={currentPasswordError}
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            disabled={passwordPending}
            required
          />
          <AdminTextInput
            id="new-password"
            name="newPassword"
            type="password"
            label="새 비밀번호"
            placeholder="새 비밀번호"
            autoComplete="new-password"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            error={newPasswordError}
            disabled={passwordPending}
            required
          />
          <AdminTextInput
            id="confirm-password"
            name="confirmPassword"
            type="password"
            label="새 비밀번호 확인"
            placeholder="새 비밀번호 확인"
            autoComplete="new-password"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            error={confirmationError}
            disabled={passwordPending}
            required
          />
          {passwordError && (
            <p className="my-page__feedback my-page__feedback--error" role="alert">
              {passwordError}
            </p>
          )}
          {passwordNotice && (
            <p className="my-page__feedback my-page__feedback--success" role="status">
              {passwordNotice}
            </p>
          )}
          <div className="my-page__actions">
            <AdminButton type="submit" disabled={passwordPending}>
              {passwordPending ? '변경 중…' : '변경'}
            </AdminButton>
          </div>
        </form>
      </section>
    </AdminLayout>
  );
}

export default MyPage;
