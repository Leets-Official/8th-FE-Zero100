import { Link } from 'react-router';
import { formatDate } from '../../utils/date';
import type { Inquiry } from '../../types/inquiry';

interface InquiryTableProps {
  inquiries: Inquiry[];
  offset?: number;
  listLocation?: string;
  emptyMessage?: string;
}

export default function InquiryListTable({
  inquiries,
  offset = 0,
  listLocation = '/inquiries',
  emptyMessage = '등록된 문의가 없습니다.',
}: InquiryTableProps) {
  if (!inquiries.length)
    return (
      <div className="admin-empty" role="status">
        {emptyMessage}
      </div>
    );
  return (
    <div className="table-wrapper">
      <table className="inquiry-table inquiry-table--status">
        <caption className="sr-only">문의 목록</caption>
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">제목</th>
            <th scope="col">상태</th>
            <th scope="col">작성일</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry, index) => (
            <tr key={inquiry.id}>
              <td>{offset + index + 1}</td>
              <td>
                <Link state={{ listLocation }} to={`/inquiries/${encodeURIComponent(inquiry.id)}`}>
                  {inquiry.title}
                </Link>
              </td>
              <td>
                <span className={`inquiry-status inquiry-status--${inquiry.status}`}>
                  {inquiry.status === 'answered' ? '답변 완료' : '답변 대기'}
                </span>
              </td>
              <td>
                <time dateTime={inquiry.createdAt}>{formatDate(inquiry.createdAt, true)}</time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
