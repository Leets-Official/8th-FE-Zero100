import type { NameChangeValues, PasswordChangeValues } from '../types/auth';

export const PASSWORD_HINT = '8~64자, 영문·숫자·특수문자 포함, 공백 제외';
export const NAME_HINT = '앞뒤 공백을 제외하고 2~8자';

export function nameError(name = ''): string {
  const length = [...name.trim()].length;
  return length >= 2 && length <= 8 ? '' : '이름은 2자 이상 8자 이하로 입력해 주세요';
}

export function passwordError(password = ''): string {
  return password.length >= 8 &&
    password.length <= 64 &&
    /[a-zA-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^a-zA-Z0-9\s]/.test(password) &&
    !/\s/.test(password)
    ? ''
    : '8~64자, 영문·숫자·특수문자를 포함해 주세요';
}

export function validateNameChange(values: NameChangeValues) {
  return { name: nameError(values.name) };
}

export function validatePasswordChange(values: PasswordChangeValues) {
  return {
    currentPassword: values.currentPassword ? '' : '현재 비밀번호를 입력해 주세요',
    newPassword:
      passwordError(values.newPassword) ||
      (values.newPassword === values.currentPassword
        ? '현재 비밀번호와 다른 비밀번호를 입력해 주세요'
        : ''),
    confirmPassword:
      values.confirmPassword && values.newPassword === values.confirmPassword
        ? ''
        : '새 비밀번호가 일치하지 않습니다',
  };
}
