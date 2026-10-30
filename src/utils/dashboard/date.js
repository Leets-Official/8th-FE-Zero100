// Figma 문의 목록의 작성일 형식(2026년 3월 25일 17:11)으로 변환
export function formatInquiryDate(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${hours}:${minutes}`;
}
