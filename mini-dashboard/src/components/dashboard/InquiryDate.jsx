import { formatInquiryDate } from '../../utils/formatInquiryDate.js';

function InquiryDate({ value }) {
  const formattedDate = formatInquiryDate(value);
  return formattedDate ? <time dateTime={value}>{formattedDate}</time> : '날짜 정보 없음';
}

export default InquiryDate;
