import { useState } from 'react';
import { useOutletContext } from 'react-router';
import Button from '../../components/dashboard/Button/Button';
import PageHeading from '../../components/dashboard/PageHeading/PageHeading';
import TextInput from '../../components/dashboard/TextInput/TextInput';
import { isValidName } from '../../utils/isValidName';
import { isValidPassword } from '../../utils/isValidPassword';

const INITIAL_PASSWORDS = { currentPassword: '', newPassword: '', newPasswordConfirm: '' };

/** 마이페이지의 카드 하나 (이름 변경 / 비밀번호 변경). 카드마다 따로 제출하는 폼이다. */
function SettingsCard({ title, titleId, onSubmit, children }) {
  return (
    <form
      aria-labelledby={titleId}
      className="flex flex-col gap-3 rounded-[10px] border border-dash-line bg-white p-5"
      onSubmit={onSubmit}
      noValidate
    >
      <h2 id={titleId} className="text-lg leading-7 font-bold text-dash-black">
        {title}
      </h2>
      {children}
      <div className="flex justify-end pt-1">
        <Button type="submit">변경</Button>
      </div>
    </form>
  );
}

/** 비밀번호 칸마다 값이 올바르면 빈 문자열, 틀리면 에러 문구를 돌려준다. */
const getPasswordErrors = ({ currentPassword, newPassword, newPasswordConfirm }) => ({
  currentPassword: currentPassword ? '' : '현재 비밀번호를 입력하세요',
  newPassword: isValidPassword(newPassword)
    ? ''
    : '8자 이상, 영문/숫자/특수문자를 포함해 입력하세요',
  newPasswordConfirm:
    newPasswordConfirm && newPasswordConfirm === newPassword
      ? ''
      : '새 비밀번호가 일치하지 않습니다',
});

function MyPage() {
  const { showToast } = useOutletContext();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwords, setPasswords] = useState(INITIAL_PASSWORDS);
  const [passwordErrors, setPasswordErrors] = useState(INITIAL_PASSWORDS);

  const handleNameSubmit = (event) => {
    event.preventDefault();

    if (!isValidName(name)) {
      setNameError('이름은 2자 이상 8자 이하로 입력하세요');
      return;
    }

    // 이름 변경 API는 UI 구현 후에 연결한다. 지금은 성공 알림만 보여주고 입력칸을 비운다.
    showToast('이름이 변경되었습니다.');
    setName('');
  };

  const handlePasswordChange = (event) => {
    const { name: fieldName, value } = event.target;
    setPasswords((prevPasswords) => ({ ...prevPasswords, [fieldName]: value }));
    setPasswordErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    const nextErrors = getPasswordErrors(passwords);
    setPasswordErrors(nextErrors);

    const firstInvalidName = Object.keys(nextErrors).find((fieldName) => nextErrors[fieldName]);
    if (firstInvalidName) {
      event.currentTarget.elements.namedItem(firstInvalidName)?.focus();
      return;
    }

    // 비밀번호 변경 API도 UI 구현 후에 연결한다. 비밀번호는 화면에 남겨두지 않도록 바로 비운다.
    showToast('비밀번호가 변경되었습니다.');
    setPasswords(INITIAL_PASSWORDS);
  };

  return (
    <div className="mx-auto flex w-full max-w-[672px] flex-col gap-6">
      <PageHeading title="마이페이지" />

      <SettingsCard title="이름 변경" titleId="change-name-title" onSubmit={handleNameSubmit}>
        <TextInput
          name="name"
          aria-label="새 이름"
          placeholder="텍스트를 입력하세요"
          autoComplete="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setNameError('');
          }}
          error={nameError}
        />
      </SettingsCard>

      <SettingsCard
        title="비밀번호 변경"
        titleId="change-password-title"
        onSubmit={handlePasswordSubmit}
      >
        <TextInput
          type="password"
          name="currentPassword"
          label="현재 비밀번호"
          placeholder="현재 비밀번호"
          autoComplete="current-password"
          value={passwords.currentPassword}
          onChange={handlePasswordChange}
          error={passwordErrors.currentPassword}
        />
        <TextInput
          type="password"
          name="newPassword"
          label="새 비밀번호"
          placeholder="새 비밀번호"
          autoComplete="new-password"
          value={passwords.newPassword}
          onChange={handlePasswordChange}
          error={passwordErrors.newPassword}
        />
        <TextInput
          type="password"
          name="newPasswordConfirm"
          label="새 비밀번호 확인"
          placeholder="새 비밀번호 확인"
          autoComplete="new-password"
          value={passwords.newPasswordConfirm}
          onChange={handlePasswordChange}
          error={passwordErrors.newPasswordConfirm}
        />
      </SettingsCard>
    </div>
  );
}

export default MyPage;
