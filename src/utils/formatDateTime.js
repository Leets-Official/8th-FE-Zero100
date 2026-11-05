const padTwoDigits = (number) => String(number).padStart(2, '0');

/** 날짜 문자열을 "2026년 3월 25일 17:11" 형태로 바꾼다. */
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const time = `${padTwoDigits(date.getHours())}:${padTwoDigits(date.getMinutes())}`;

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${time}`;
};
