import { Link } from 'react-router';
import { formatDate } from '../../utils/date';

export default function InquiryTable({ inquiries }) {
  if (!inquiries.length)
    return (
      <div className="admin-empty" role="status">
        등록된 문의가 없습니다.
      </div>
    );
  return (
    <div className="table-wrapper">
      <table className="inquiry-table">
        <caption className="sr-only">문의 목록</caption>
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">제목</th>
            <th scope="col">작성일</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry, index) => (
            <tr key={inquiry.id}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/inquiries/${encodeURIComponent(inquiry.id)}`}>{inquiry.title}</Link>
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
