import { useEffect, useState } from 'react';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Toast from '../components/Toast';
import { updateName, updatePassword } from '../api/auth';
import { getErrorMessage } from '../api/client';
import { useAuth } from '../context/AuthContext';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
const CARD_CLASS = 'flex flex-col gap-3 rounded-[10px] border border-[#E5E7EB] bg-white p-5';

const MyPage = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [isNameSubmitting, setIsNameSubmitting] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordServerError, setPasswordServerError] = useState('');
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 8) {
      setNameError('2자 이상 8자 이하로 입력하세요');
      return;
    }

    setIsNameSubmitting(true);
    try {
      const updatedUser = await updateName(trimmedName);
      setUser(updatedUser);
      setName('');
      setToastMessage('이름이 변경되었습니다.');
    } catch (error) {
      setNameError(getErrorMessage(error, '이름을 변경하지 못했습니다'));
    } finally {
      setIsNameSubmitting(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { name: field, value } = e.target;
    setPasswords((prev) => ({ ...prev, [field]: value }));
    setPasswordErrors((prev) => ({ ...prev, [field]: undefined }));
    setPasswordServerError('');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!passwords.current) {
      errors.current = '현재 비밀번호를 입력하세요';
    }
    if (!PASSWORD_REGEX.test(passwords.next)) {
      errors.next = '8자 이상, 영문/숫자/특수문자를 포함해야 합니다';
    } else if (passwords.next === passwords.current) {
      errors.next = '현재 비밀번호와 다른 비밀번호를 입력하세요';
    }
    if (!passwords.confirm || passwords.confirm !== passwords.next) {
      errors.confirm = '새 비밀번호가 일치하지 않습니다';
    }
    setPasswordErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsPasswordSubmitting(true);
    try {
      await updatePassword({ currentPassword: passwords.current, newPassword: passwords.next });
      setPasswords({ current: '', next: '', confirm: '' });
      setToastMessage('비밀번호가 변경되었습니다.');
    } catch (error) {
      setPasswordServerError(getErrorMessage(error, '비밀번호를 변경하지 못했습니다'));
    } finally {
      setIsPasswordSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[672px] flex-col gap-6">
      <h2 className="text-2xl font-bold text-black">마이페이지</h2>

      <form onSubmit={handleNameSubmit} noValidate className={CARD_CLASS}>
        <h3 className="text-lg font-bold text-black">이름 변경</h3>
        <TextInput
          aria-label="새 이름"
          placeholder={user.name ? `현재 이름: ${user.name}` : '새 이름을 입력하세요'}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError('');
          }}
          errorText={nameError}
        />
        <div className="flex justify-end">
          <Button type="submit" size="small" disabled={isNameSubmitting}>
            {isNameSubmitting ? '변경 중...' : '변경'}
          </Button>
        </div>
      </form>

      <form onSubmit={handlePasswordSubmit} noValidate className={CARD_CLASS}>
        <h3 className="text-lg font-bold text-black">비밀번호 변경</h3>
        <TextInput
          label="현재 비밀번호"
          type="password"
          name="current"
          placeholder="현재 비밀번호"
          autoComplete="current-password"
          value={passwords.current}
          onChange={handlePasswordChange}
          errorText={passwordErrors.current}
        />
        <TextInput
          label="새 비밀번호"
          type="password"
          name="next"
          placeholder="새 비밀번호"
          autoComplete="new-password"
          value={passwords.next}
          onChange={handlePasswordChange}
          errorText={passwordErrors.next}
        />
        <TextInput
          label="새 비밀번호 확인"
          type="password"
          name="confirm"
          placeholder="새 비밀번호 확인"
          autoComplete="new-password"
          value={passwords.confirm}
          onChange={handlePasswordChange}
          errorText={passwordErrors.confirm}
        />
        {passwordServerError && (
          <p role="alert" className="text-sm text-red-500">
            {passwordServerError}
          </p>
        )}
        <div className="flex justify-end">
          <Button type="submit" size="small" disabled={isPasswordSubmitting}>
            {isPasswordSubmitting ? '변경 중...' : '변경'}
          </Button>
        </div>
      </form>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast message={toastMessage} />
        </div>
      )}
    </div>
  );
};

export default MyPage;
