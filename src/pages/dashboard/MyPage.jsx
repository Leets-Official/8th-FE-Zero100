import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { updateMyName, updateMyPassword } from '../../api/authApi';
import Button from '../../components/dashboard/Button/Button';
import PageHeading from '../../components/dashboard/PageHeading/PageHeading';
import TextInput from '../../components/dashboard/TextInput/TextInput';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { isValidName } from '../../utils/isValidName';
import { isValidPassword } from '../../utils/isValidPassword';

const INITIAL_PASSWORDS = { currentPassword: '', newPassword: '', newPasswordConfirm: '' };

/** 마이페이지의 카드 하나 (이름 변경 / 비밀번호 변경). 카드마다 따로 제출하는 폼이다. */
function SettingsCard({ title, titleId, onSubmit, isSubmitting, submitError, children }) {
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
      {submitError && (
        <p role="alert" className="text-right text-sm leading-5 text-dash-error">
          {submitError}
        </p>
      )}
      <div className="flex justify-end pt-1">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '변경 중...' : '변경'}
        </Button>
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
  const [isNameSubmitting, setIsNameSubmitting] = useState(false);
  const [passwords, setPasswords] = useState(INITIAL_PASSWORDS);
  const [passwordErrors, setPasswordErrors] = useState(INITIAL_PASSWORDS);
  // 현재 비밀번호 틀림처럼 어느 칸 문제인지 알 수 없는 서버 실패 이유
  const [passwordSubmitError, setPasswordSubmitError] = useState('');
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);

  const handleNameSubmit = async (event) => {
    event.preventDefault();
    if (isNameSubmitting) return;

    if (!isValidName(name)) {
      setNameError('이름은 2자 이상 8자 이하로 입력하세요');
      return;
    }

    setIsNameSubmitting(true);
    try {
      await updateMyName(name.trim());
      showToast('이름이 변경되었습니다.');
      setName('');
    } catch (error) {
      setNameError(getErrorMessage(error, '이름을 변경하지 못했어요.'));
    } finally {
      setIsNameSubmitting(false);
    }
  };

  const handlePasswordChange = (event) => {
    const { name: fieldName, value } = event.target;
    setPasswords((prevPasswords) => ({ ...prevPasswords, [fieldName]: value }));
    setPasswordErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
    setPasswordSubmitError('');
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    if (isPasswordSubmitting) return;

    const nextErrors = getPasswordErrors(passwords);
    setPasswordErrors(nextErrors);

    const firstInvalidName = Object.keys(nextErrors).find((fieldName) => nextErrors[fieldName]);
    if (firstInvalidName) {
      event.currentTarget.elements.namedItem(firstInvalidName)?.focus();
      return;
    }

    setIsPasswordSubmitting(true);
    try {
      await updateMyPassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      showToast('비밀번호가 변경되었습니다.');
      // 비밀번호는 화면에 남겨두지 않도록 바로 비운다.
      setPasswords(INITIAL_PASSWORDS);
    } catch (error) {
      setPasswordSubmitError(getErrorMessage(error, '비밀번호를 변경하지 못했어요.'));
    } finally {
      setIsPasswordSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[672px] flex-col gap-6">
      <PageHeading title="마이페이지" />

      <SettingsCard
        title="이름 변경"
        titleId="change-name-title"
        onSubmit={handleNameSubmit}
        isSubmitting={isNameSubmitting}
      >
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
        isSubmitting={isPasswordSubmitting}
        submitError={passwordSubmitError}
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
