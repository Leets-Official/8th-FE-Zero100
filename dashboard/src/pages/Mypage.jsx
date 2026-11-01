import { useEffect, useState } from 'react';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Toast from '../components/Toast';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
const CARD_CLASS = 'flex flex-col gap-4 rounded-[10px] border border-[#E5E7EB] bg-white p-6';

const MyPage = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 8) {
      setNameError('2자 이상 8자 이하로 입력하세요');
      return;
    }
    // 이름 변경 API 연동은 다음 단계에서 구현
    setName('');
    setToastMessage('이름이 변경되었습니다.');
  };

  const handlePasswordChange = (e) => {
    const { name: field, value } = e.target;
    setPasswords((prev) => ({ ...prev, [field]: value }));
    setPasswordErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!passwords.current) {
      errors.current = '현재 비밀번호를 입력하세요';
    }
    if (!PASSWORD_REGEX.test(passwords.next)) {
      errors.next = '8자 이상, 영문/숫자/특수문자를 포함해야 합니다';
    }
    if (!passwords.confirm || passwords.confirm !== passwords.next) {
      errors.confirm = '새 비밀번호가 일치하지 않습니다';
    }
    setPasswordErrors(errors);
    if (Object.keys(errors).length > 0) return;
    // 비밀번호 변경 API 연동은 다음 단계에서 구현
    setPasswords({ current: '', next: '', confirm: '' });
    setToastMessage('비밀번호가 변경되었습니다.');
  };

  return (
    <div className="mx-auto flex w-full max-w-[678px] flex-col gap-5">
      <h2 className="text-2xl font-bold text-black">마이페이지</h2>

      <form onSubmit={handleNameSubmit} noValidate className={CARD_CLASS}>
        <h3 className="text-lg font-bold text-black">이름 변경</h3>
        <TextInput
          aria-label="새 이름"
          placeholder="새 이름을 입력하세요"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError('');
          }}
          errorText={nameError}
        />
        <div className="flex justify-end">
          <Button type="submit" size="small">
            변경
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
        <div className="flex justify-end">
          <Button type="submit" size="small">
            변경
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
