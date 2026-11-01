import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { INQUIRIES } from '../data/inquiries';

const InquiryListPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">문의 목록</h2>
        <Button size="small" onClick={() => navigate('/inquiries/new')}>
          문의 등록
        </Button>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#E5E7EB] text-[#4A5565]">
            <tr>
              <th className="w-20 px-4 py-3 font-medium">번호</th>
              <th className="px-4 py-3 font-medium">제목</th>
              <th className="w-56 px-4 py-3 font-medium">작성일</th>
            </tr>
          </thead>
          <tbody>
            {INQUIRIES.map((inquiry) => (
              <tr
                key={inquiry.id}
                className="border-b border-[#F3F4F6] last:border-b-0 hover:bg-[#F9FAFB]"
              >
                <td className="px-4 py-3 text-black">{inquiry.id}</td>
                <td className="px-4 py-3">
                  <Link to={`/inquiries/${inquiry.id}`} className="text-black hover:underline">
                    {inquiry.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-[#4A5565]">{inquiry.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquiryListPage;
