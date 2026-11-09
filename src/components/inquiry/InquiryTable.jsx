import { Link } from 'react-router-dom';
import { getInquiryDetailPath } from '../../constants/routes';

function InquiryTable(props) {
  return (
    <div className="overflow-hidden rounded-[10px] bg-white outline -outline-offset-1 outline-gray-200">
      <table className="w-full table-fixed text-left text-sm leading-5">
        <thead className="bg-gray-50 text-gray-700">
          <tr className="h-11 border-b border-gray-200">
            <th scope="col" className="w-20 px-4 font-bold">
              번호
            </th>
            <th scope="col" className="px-4 font-bold">
              제목
            </th>
            <th scope="col" className="w-48 px-4 font-bold">
              작성일
            </th>
          </tr>
        </thead>
        <tbody>
          {props.inquiries.map((inquiry, index) => (
            <tr key={inquiry.id} className="h-[49px] border-b border-gray-100 last:border-b-0">
              <td className="px-4 text-black">{index + 1}</td>
              <td className="px-4">
                <Link
                  to={getInquiryDetailPath(inquiry.id)}
                  className="block truncate font-medium text-black hover:underline"
                >
                  {inquiry.title}
                </Link>
              </td>
              <td className="px-4 text-gray-600">{inquiry.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InquiryTable;
