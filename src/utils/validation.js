export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_HINT = '8자 이상, 영문/숫자/특수문자 포함';
export const NAME_HINT = '2자 이상 8자 이하';

export function emailError(email = '') {
  return EMAIL_PATTERN.test(email.trim()) && email.trim().length <= 254
    ? ''
    : '올바른 이메일 형식을 입력하세요';
}
export function passwordError(password = '') {
  return password.length >= 8 &&
    password.length <= 64 &&
    /[a-zA-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^a-zA-Z0-9\s]/.test(password) &&
    !/\s/.test(password)
    ? ''
    : '8~64자, 영문·숫자·특수문자를 포함해 주세요';
}
export function nameError(name = '') {
  const length = [...name.trim()].length;
  return length >= 2 && length <= 8 ? '' : '이름은 2자 이상 8자 이하로 입력해 주세요';
}
export function validateLogin(values) {
  return {
    email: emailError(values.email),
    password: values.password ? '' : '비밀번호를 입력해 주세요',
  };
}
export function validateSignup(values) {
  return {
    email: emailError(values.email),
    password: passwordError(values.password),
    name: nameError(values.name),
  };
}
export function validateInquiry(values) {
  return {
    name: nameError(values.name),
    email: emailError(values.email),
    title:
      values.title.trim() && values.title.trim().length <= 100
        ? ''
        : '제목은 1~100자로 입력해 주세요',
    content:
      values.content.trim() && values.content.trim().length <= 5000
        ? ''
        : '내용은 1~5,000자로 입력해 주세요',
  };
}
export function validatePasswordChange(values) {
  return {
    currentPassword: values.currentPassword ? '' : '현재 비밀번호를 입력해 주세요',
    newPassword:
      passwordError(values.newPassword) ||
      (values.newPassword === values.currentPassword
        ? '현재 비밀번호와 다른 비밀번호를 입력해 주세요'
        : ''),
    confirmPassword:
      values.newPassword === values.confirmPassword && values.confirmPassword
        ? ''
        : '새 비밀번호가 일치하지 않습니다',
  };
}
export function hasErrors(errors) {
  return Object.values(errors).some(Boolean);
}
