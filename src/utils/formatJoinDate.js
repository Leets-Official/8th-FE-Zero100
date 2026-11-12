const padTwoDigits = (value) => String(value).padStart(2, '0');

/**
 * 가입일을 Figma 시안처럼 "2024.01.15" 형태로 바꾼다.
 * 서버는 "2026년 3월 25일 17:11"처럼 보내므로 년/월/일만 꺼내고, 날짜로 읽을 수 없으면 받은 값을 그대로 보여준다.
 */
export const formatJoinDate = (createdAt) => {
  const match = /(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/.exec(createdAt ?? '');
  if (match) {
    const [, year, month, day] = match;
    return `${year}.${padTwoDigits(month)}.${padTwoDigits(day)}`;
  }

  // "2026-03-25T17:11:00Z" 같은 날짜 문자열로 오는 경우
  const date = new Date(createdAt);
  if (createdAt && !Number.isNaN(date.getTime())) {
    return `${date.getFullYear()}.${padTwoDigits(date.getMonth() + 1)}.${padTwoDigits(date.getDate())}`;
  }

  return createdAt || '-';
};
