import { Link } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';

import './InquiryTable.css';

const InquiryTable = ({ inquiries = [] }) => {
  return (
    <div className="inquiry-table-wrapper">
      <table className="inquiry-table" aria-label="문의 목록">
        <colgroup>
          <col className="inquiry-table__col-number" />
          <col />
          <col className="inquiry-table__col-date" />
        </colgroup>

        <thead>
          <tr>
            <th scope="col" className="inquiry-table__head-cell">
              번호
            </th>
            <th scope="col" className="inquiry-table__head-cell">
              제목
            </th>
            <th scope="col" className="inquiry-table__head-cell">
              작성일
            </th>
          </tr>
        </thead>

        <tbody>
          {inquiries.map((inquiry) => (
            <tr key={inquiry.id}>
              <td className="inquiry-table__cell">{inquiry.id}</td>
              <td className="inquiry-table__cell inquiry-table__cell--title">
                <Link to={`${ROUTES.INQUIRY}/${inquiry.id}`} className="inquiry-table__link">
                  {inquiry.title}
                </Link>
              </td>
              <td className="inquiry-table__cell inquiry-table__cell--date">{inquiry.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InquiryTable;
