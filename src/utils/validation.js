export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
import { passwordError, nameError } from './accountValidation';
export {
  PASSWORD_HINT,
  NAME_HINT,
  passwordError,
  nameError,
  validatePasswordChange,
} from './accountValidation';

export function emailError(email = '') {
  return EMAIL_PATTERN.test(email.trim()) && email.trim().length <= 254
    ? ''
    : '올바른 이메일 형식을 입력하세요';
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
export function hasErrors(errors) {
  return Object.values(errors).some(Boolean);
}
