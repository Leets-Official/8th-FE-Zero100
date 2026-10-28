const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 로그인·회원가입에서 공통으로 쓰는 이메일 검사. 오류가 없으면 빈 문자열을 반환
export function validateEmail(email) {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) return '이메일을 입력하세요';
  if (!EMAIL_PATTERN.test(trimmedEmail)) return '올바른 이메일 형식을 입력하세요';
  return '';
}
