const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 로그인·회원가입에서 공통으로 쓰는 이메일 검사. 오류가 없으면 빈 문자열을 반환
export function validateEmail(email) {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) return '이메일을 입력하세요';
  if (!EMAIL_PATTERN.test(trimmedEmail)) return '올바른 이메일 형식을 입력하세요';
  return '';
}

// Figma 회원가입 디자인의 비밀번호 안내 문구. 조건을 만족하지 않으면 같은 문구를 오류 메시지로 표시
export const PASSWORD_RULE_TEXT = '8자 이상, 영문/숫자/특수문자 포함';

export function validatePassword(password) {
  if (!password) return '비밀번호를 입력하세요';

  const isValid =
    password.length >= 8 &&
    /[A-Za-z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9\s]/.test(password);
  return isValid ? '' : PASSWORD_RULE_TEXT;
}

// Figma 회원가입 디자인의 이름 안내 문구. 조건을 만족하지 않으면 같은 문구를 오류 메시지로 표시
export const NAME_RULE_TEXT = '2자 이상 8자 이하';

export function validateName(name) {
  const trimmedName = name.trim();

  if (!trimmedName) return '이름을 입력하세요';
  return trimmedName.length >= 2 && trimmedName.length <= 8 ? '' : NAME_RULE_TEXT;
}
