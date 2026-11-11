const PASSWORD_PATTERN = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s])\S{8,}$/;

export function isValidPassword(value) {
  return typeof value === 'string' && PASSWORD_PATTERN.test(value);
}

export function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidKakaoId(value) {
  return (
    typeof value === 'string' &&
    value.trim() !== '' &&
    !['undefined', 'null', 'nan'].includes(value.trim().toLowerCase())
  );
}

export function validateInquiryField(name, value) {
  const text = value.trim();
  if (name === 'authorName')
    return text.length < 2 || text.length > 20 ? '이름은 2자 이상 20자 이하로 입력해 주세요.' : '';
  if (name === 'authorEmail')
    return isValidEmail(text) ? '' : '올바른 이메일 형식으로 입력해 주세요.';
  if (name === 'title')
    return text.length < 2 || text.length > 50 ? '제목은 2자 이상 50자 이하로 입력해 주세요.' : '';
  if (name === 'content') return text ? '' : '문의 내용을 입력해 주세요.';
  return '';
}
