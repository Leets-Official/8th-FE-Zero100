// 8자 이상이면서 영문, 숫자, 특수문자(영문/숫자/공백이 아닌 글자)를 하나씩 포함해야 한다.
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,}$/;

export const isValidPassword = (value) => PASSWORD_PATTERN.test(value);
