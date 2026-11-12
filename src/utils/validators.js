const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
// 카카오 회원번호(kakaoId)는 숫자로만 이루어진 값입니다.
const KAKAO_ID_REGEX = /^\d+$/;

export const isValidEmail = (value) => EMAIL_REGEX.test(value.trim());

// 8자 이상, 영문/숫자/특수문자 포함
export const isValidPassword = (value) => PASSWORD_REGEX.test(value);

// 2자 이상 8자 이하 (앞뒤 공백 제외)
export const isValidName = (value) => {
  const length = value.trim().length;
  return length >= 2 && length <= 8;
};

// 서버가 잘못된 인가코드에도 kakaoId를 'undefined' 문자열로 내려주는 경우를 걸러냅니다.
export const isValidKakaoId = (value) => KAKAO_ID_REGEX.test(String(value ?? ''));
