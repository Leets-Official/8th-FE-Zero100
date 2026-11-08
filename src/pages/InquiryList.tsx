import { useNavigate } from 'react-router-dom';
import { getInquiries } from '../lib/appStorage';

function InquiryList() {
  const navigate = useNavigate();
  const inquiries = getInquiries();

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">문의 목록</h1>

        <button
          type="button"
          onClick={() => navigate('/inquiries/create')}
          className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
        >
          문의 등록
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[600px] table-fixed text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="w-20 border-b border-gray-200 px-4 py-3">번호</th>
              <th className="border-b border-gray-200 px-4 py-3">제목</th>
              <th className="w-56 border-b border-gray-200 px-4 py-3">작성일</th>
            </tr>
          </thead>

          <tbody>
            {inquiries.length > 0 ? (
              inquiries.map((inquiry, index) => (
                <tr
                  key={inquiry.id}
                  onClick={() => navigate(`/inquiries/${inquiry.id}`)}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <td className="border-b border-gray-100 px-4 py-4">
                    {inquiries.length - index}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-4 font-medium">
                    {inquiry.title}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-4 text-gray-600">
                    {inquiry.date}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-12 text-center text-gray-500">
                  등록된 문의가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default InquiryList;
