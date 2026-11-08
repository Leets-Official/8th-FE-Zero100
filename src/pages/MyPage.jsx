import { useState } from 'react';
import Button from '../components/dashboard/Button';
import Input from '../components/dashboard/Input';

function validatePasswordField(name, values) {
  const value = values[name];

  if (!value) {
    return '비밀번호를 입력해주세요.';
  }

  if (name === 'newPassword') {
    if (
      value.length < 8 ||
      !/[A-Za-z]/.test(value) ||
      !/[0-9]/.test(value) ||
      !/[^A-Za-z0-9\s]/.test(value) ||
      /\s/.test(value)
    ) {
      return '공백 없이 8자 이상, 영문/숫자/특수문자를 포함해주세요.';
    }

    if (value === values.currentPassword) {
      return '현재 비밀번호와 다른 비밀번호를 입력해주세요.';
    }
  }

  if (name === 'passwordConfirmation' && value !== values.newPassword) {
    return '새 비밀번호가 일치하지 않습니다.';
  }

  return '';
}

function MyPage() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [nameNotice, setNameNotice] = useState('');

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    passwordConfirmation: '',
  });

  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordNotice, setPasswordNotice] = useState('');

  function handleNameChange(event) {
    setName(event.target.value);
    setNameError('');
    setNameNotice('');
  }

  function handleNameSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName.length < 2 || trimmedName.length > 8) {
      setNameError('이름은 2자 이상 8자 이하로 입력해주세요.');
      setNameNotice('입력 내용을 확인해주세요.');
      event.currentTarget.elements.namedItem('name')?.focus();
      return;
    }

    setName(trimmedName);
    setNameError('');
    setNameNotice('이름 변경 기능은 API 연동 후 이용할 수 있습니다.');
  }

  function handlePasswordChange(event) {
    const { name: fieldName, value } = event.target;

    setPasswords((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // 다른 비밀번호를 수정하면 기존 비교 결과도 달라질 수 있어 초기화한다.
    setPasswordErrors({});
    setPasswordNotice('');
  }

  function handlePasswordSubmit(event) {
    event.preventDefault();

    const nextErrors = {
      currentPassword: validatePasswordField('currentPassword', passwords),
      newPassword: validatePasswordField('newPassword', passwords),
      passwordConfirmation: validatePasswordField('passwordConfirmation', passwords),
    };

    setPasswordErrors(nextErrors);

    const firstInvalidField = Object.keys(nextErrors).find((fieldName) => nextErrors[fieldName]);

    if (firstInvalidField) {
      setPasswordNotice('입력 내용을 확인해주세요.');
      event.currentTarget.elements.namedItem(firstInvalidField)?.focus();
      return;
    }

    setPasswordNotice('비밀번호 변경 기능은 API 연동 후 이용할 수 있습니다.');
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
          required
        />

        <div className="flex justify-end">
          <Button type="submit" size="small">
            변경
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
          required
        />

        <div className="flex justify-end">
          <Button type="submit" size="small">
            변경
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
