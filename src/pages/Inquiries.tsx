import { useState } from 'react';
import { Link } from 'react-router-dom';

type Inquiry = {
id: number;
title: string;
category: string;
status: string;
date: string;
content?: string;
};

const initialInquiries: Inquiry[] = [
{
id: 1,
title: '서비스 이용 방법이 궁금해요',
category: '서비스 문의',
status: '답변 대기',
date: '2026.10.08',
},
{
id: 2,
title: '회원정보를 변경하고 싶어요',
category: '계정 문의',
status: '답변 완료',
date: '2026.10.07',
},
{
id: 3,
title: '로그인이 되지 않아요',
category: '오류 문의',
status: '답변 대기',
date: '2026.10.06',
},
];

export default function Inquiries() {
const [inquiries] = useState<Inquiry[]>(() => {
try {
const saved = localStorage.getItem('inquiries');
return saved
? (JSON.parse(saved) as Inquiry[])
: initialInquiries;
} catch {
return initialInquiries;
}
});

return ( <div className="min-h-screen bg-gray-50 p-6 md:p-10"> <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"> <div> <h1 className="text-2xl font-bold text-gray-900">
문의 </h1> <p className="mt-2 text-sm text-gray-500">
등록한 문의를 확인할 수 있어요. </p> </div>


    <Link
      to="/inquiries/new"
      className="rounded-lg bg-black px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-gray-800"
    >
      + 문의 등록
    </Link>
  </header>

  <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
    <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
      <h2 className="font-semibold text-gray-900">
        전체 문의
      </h2>
      <span className="text-sm text-gray-500">
        총 {inquiries.length}건
      </span>
    </div>

    {inquiries.length === 0 ? (
      <p className="px-5 py-12 text-center text-sm text-gray-500">
        등록된 문의가 없어요.
      </p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] table-fixed text-left">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              <th className="w-20 px-5 py-4 text-sm font-medium text-gray-500">
                번호
              </th>
              <th className="px-5 py-4 text-sm font-medium text-gray-500">
                제목
              </th>
              <th className="w-36 px-5 py-4 text-sm font-medium text-gray-500">
                작성일
              </th>
            </tr>
          </thead>

          <tbody>
            {inquiries.map((inquiry, index) => (
              <tr
                key={inquiry.id}
                className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
              >
                <td className="px-5 py-5 text-sm text-gray-500">
                  {inquiries.length - index}
                </td>

                <td className="px-5 py-5">
                  <Link
                    to={`/inquiries/${inquiry.id}`}
                    className="text-sm font-medium text-gray-900 hover:underline"
                  >
                    {inquiry.title}
                  </Link>
                  <p className="mt-1 text-xs text-gray-400">
                    {inquiry.category} · {inquiry.status}
                  </p>
                </td>

                <td className="px-5 py-5 text-sm text-gray-500">
                  {inquiry.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
</div>


);
}
