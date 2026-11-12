import { useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';

import Button from '../components/dashboard/Button';
import Input from '../components/dashboard/Input';
import { updateName, updatePassword } from '../api/auth';
import { ROUTES } from '../constants/routes';
import { removeAccessToken } from '../utils/authStorage';
import { getApiErrorMessage } from '../utils/getApiErrorMessage';

const INITIAL_PASSWORDS = {
  currentPassword: '',
  newPassword: '',
  passwordConfirmation: '',
};

function validatePasswords(values) {
  const errors = {};
  const { currentPassword, newPassword, passwordConfirmation } = values;

  if (!currentPassword) {
    errors.currentPassword = '현재 비밀번호를 입력해주세요.';
  }

  if (!newPassword) {
    errors.newPassword = '새 비밀번호를 입력해주세요.';
  } else if (
    newPassword.length < 8 ||
    !/[A-Za-z]/.test(newPassword) ||
    !/[0-9]/.test(newPassword) ||
    !/[^A-Za-z0-9\s]/.test(newPassword) ||
    /\s/.test(newPassword)
  ) {
    errors.newPassword = '공백 없이 8자 이상, 영문/숫자/특수문자를 포함해주세요.';
  } else if (newPassword === currentPassword) {
    errors.newPassword = '현재 비밀번호와 다른 비밀번호를 입력해주세요.';
  }

  if (!passwordConfirmation) {
    errors.passwordConfirmation = '새 비밀번호를 다시 입력해주세요.';
  } else if (passwordConfirmation !== newPassword) {
    errors.passwordConfirmation = '새 비밀번호가 일치하지 않습니다.';
  }

  return errors;
}

function MyPage() {
  const navigate = useNavigate();
  const { user, updateUser } = useOutletContext();

  const [name, setName] = useState(user.name ?? '');
  const [nameError, setNameError] = useState('');
  const [nameNotice, setNameNotice] = useState('');
  const [isNameSubmitting, setIsNameSubmitting] = useState(false);

  const [passwords, setPasswords] = useState(INITIAL_PASSWORDS);
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordNotice, setPasswordNotice] = useState('');
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);

  const nameSubmittingRef = useRef(false);
  const passwordSubmittingRef = useRef(false);

  function handleNameChange(event) {
    setName(event.target.value);
    setNameError('');
    setNameNotice('');
  }

  async function handleNameSubmit(event) {
    event.preventDefault();

    if (nameSubmittingRef.current) return;

    const trimmedName = name.trim();

    if (trimmedName.length < 2 || trimmedName.length > 8) {
      setNameError('이름은 2자 이상 8자 이하로 입력해주세요.');
      setNameNotice('입력 내용을 확인해주세요.');
      event.currentTarget.elements.namedItem('name')?.focus();
      return;
    }

    if (trimmedName === user.name) {
      setNameNotice('현재 이름과 같습니다.');
      return;
    }

    nameSubmittingRef.current = true;
    setIsNameSubmitting(true);
    setNameNotice('');

    try {
      const updatedUser = await updateName(trimmedName);

      updateUser(updatedUser);
      setName(updatedUser.name ?? '');
      setNameError('');
      setNameNotice('이름이 변경되었습니다.');
    } catch (error) {
      if (error.response?.status === 401) {
        removeAccessToken();
        navigate(ROUTES.LOGIN, { replace: true });
        return;
      }

      setNameNotice(getApiErrorMessage(error, '이름 변경에 실패했습니다.'));
    } finally {
      nameSubmittingRef.current = false;
      setIsNameSubmitting(false);
    }
  }

  function handlePasswordChange(event) {
    const { name: fieldName, value } = event.target;

    setPasswords((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    setPasswordErrors({});
    setPasswordNotice('');
  }

  async function handlePasswordSubmit(event) {
    event.preventDefault();

    if (passwordSubmittingRef.current) return;

    const nextErrors = validatePasswords(passwords);

    setPasswordErrors(nextErrors);
    setPasswordNotice('');

    const firstInvalidField = Object.keys(nextErrors)[0];

    if (firstInvalidField) {
      setPasswordNotice('입력 내용을 확인해주세요.');
      event.currentTarget.elements.namedItem(firstInvalidField)?.focus();
      return;
    }

    passwordSubmittingRef.current = true;
    setIsPasswordSubmitting(true);

    try {
      await updatePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      setPasswords(INITIAL_PASSWORDS);
      setPasswordErrors({});
      setPasswordNotice('비밀번호가 변경되었습니다.');
    } catch (error) {
      // 이 API는 현재 비밀번호 불일치에도 401을 사용한다.
      // 따라서 401이라는 이유만으로 로그아웃시키지 않는다.
      setPasswordNotice(getApiErrorMessage(error, '비밀번호 변경에 실패했습니다.'));
    } finally {
      passwordSubmittingRef.current = false;
      setIsPasswordSubmitting(false);
    }
  }

  return (
    <section
      aria-labelledby="mypage-title"
      className="mx-auto flex w-full max-w-[672px] flex-col gap-[20px]"
    >
      <h2 id="mypage-title" className="text-[24px] leading-[32px] font-bold text-[#000000]">
        마이페이지
      </h2>

      <form
        noValidate
        onSubmit={handleNameSubmit}
        aria-labelledby="name-change-title"
        aria-busy={isNameSubmitting}
        className="flex flex-col gap-[16px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] p-[24px]"
      >
        <h3 id="name-change-title" className="text-[18px] leading-[28px] font-bold text-[#000000]">
          이름 변경
        </h3>

        <Input
          label="변경할 이름"
          hideLabel
          name="name"
          autoComplete="name"
          placeholder="텍스트를 입력하세요"
          value={name}
          error={nameError}
          onChange={handleNameChange}
          disabled={isNameSubmitting}
          required
        />

        <div className="flex justify-end">
          <Button type="submit" size="small" disabled={isNameSubmitting}>
            {isNameSubmitting ? '변경 중...' : '변경'}
          </Button>
        </div>

        <div role="status" aria-atomic="true" className={nameNotice ? '' : 'sr-only'}>
          {nameNotice && <p className="text-[12px] leading-[20px] text-[#364153]">{nameNotice}</p>}
        </div>
      </form>

      <form
        noValidate
        onSubmit={handlePasswordSubmit}
        aria-labelledby="password-change-title"
        aria-busy={isPasswordSubmitting}
        className="flex flex-col gap-[16px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] p-[24px]"
      >
        <h3
          id="password-change-title"
          className="text-[18px] leading-[28px] font-bold text-[#000000]"
        >
          비밀번호 변경
        </h3>

        <Input
          label="현재 비밀번호"
          type="password"
          name="currentPassword"
          autoComplete="current-password"
          placeholder="현재 비밀번호"
          value={passwords.currentPassword}
          error={passwordErrors.currentPassword}
          onChange={handlePasswordChange}
          disabled={isPasswordSubmitting}
          required
        />

        <Input
          label="새 비밀번호"
          type="password"
          name="newPassword"
          autoComplete="new-password"
          placeholder="새 비밀번호"
          value={passwords.newPassword}
          error={passwordErrors.newPassword}
          onChange={handlePasswordChange}
          disabled={isPasswordSubmitting}
          required
        />

        <Input
          label="새 비밀번호 확인"
          type="password"
          name="passwordConfirmation"
          autoComplete="new-password"
          placeholder="새 비밀번호 확인"
          value={passwords.passwordConfirmation}
          error={passwordErrors.passwordConfirmation}
          onChange={handlePasswordChange}
          disabled={isPasswordSubmitting}
          required
        />

        <div className="flex justify-end">
          <Button type="submit" size="small" disabled={isPasswordSubmitting}>
            {isPasswordSubmitting ? '변경 중...' : '변경'}
          </Button>
        </div>

        <div role="status" aria-atomic="true" className={passwordNotice ? '' : 'sr-only'}>
          {passwordNotice && (
            <p className="text-[12px] leading-[20px] text-[#364153]">{passwordNotice}</p>
          )}
        </div>
      </form>
    </section>
  );
}

export default MyPage;
