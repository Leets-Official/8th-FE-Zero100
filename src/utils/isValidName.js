const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 8;

/** 앞뒤 공백을 뺀 이름이 2자 이상 8자 이하인지 검사한다. */
export const isValidName = (value) => {
  const { length } = value.trim();
  return length >= NAME_MIN_LENGTH && length <= NAME_MAX_LENGTH;
};
