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
          {inquiries.map((inquiry, index) => (
            <tr key={inquiry.id}>
              {/* id가 uuid라서 번호는 목록 순서(최신순)로 표시 */}
              <td className="inquiry-table__cell">{index + 1}</td>
              <td className="inquiry-table__cell inquiry-table__cell--title">
                <Link to={`${ROUTES.INQUIRY}/${inquiry.id}`} className="inquiry-table__link">
                  {inquiry.title}
                </Link>
              </td>
              <td className="inquiry-table__cell inquiry-table__cell--date">
                {inquiry.created_at}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InquiryTable;
