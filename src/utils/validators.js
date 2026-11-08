const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export const isValidEmail = (value) => EMAIL_REGEX.test(value.trim());

// 8자 이상, 영문/숫자/특수문자 포함
export const isValidPassword = (value) => PASSWORD_REGEX.test(value);

// 2자 이상 8자 이하 (앞뒤 공백 제외)
export const isValidName = (value) => {
  const length = value.trim().length;
  return length >= 2 && length <= 8;
};
