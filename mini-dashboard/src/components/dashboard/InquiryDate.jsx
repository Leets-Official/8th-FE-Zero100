import { formatInquiryDate } from '../../utils/formatInquiryDate.js';

function InquiryDate({ value }) {
  if (typeof value === 'string' && /^\d{4}년 \d{1,2}월 \d{1,2}일 \d{1,2}:\d{2}$/.test(value))
    return <span>{value}</span>;
  const formattedDate = formatInquiryDate(value);
  return formattedDate ? <time dateTime={value}>{formattedDate}</time> : '날짜 정보 없음';
}

export default InquiryDate;
