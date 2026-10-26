const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value) {
  if (!EMAIL_PATTERN.test(value)) return '올바른 이메일 형식을 입력하세요';
  return '';
}

export function validatePassword(value) {
  const isValid =
    value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value) && /[^A-Za-z0-9]/.test(value);
  if (!isValid) return '8자 이상, 영문/숫자/특수문자를 포함해야 합니다';
  return '';
}

export function validateName(value) {
  const length = value.trim().length;
  if (length < 2 || length > 8) return '2자 이상 8자 이하로 입력하세요';
  return '';
}
