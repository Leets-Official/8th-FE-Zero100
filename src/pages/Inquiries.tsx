
import { useEffect, useState } from 'react';
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
    content: '서비스 이용 방법이 궁금합니다.',
  },
  {
    id: 2,
    title: '회원정보를 변경하고 싶어요',
    category: '계정 문의',
    status: '답변 완료',
    date: '2026.10.07',
    content: '회원정보 변경 방법이 궁금합니다.',
  },
  {
    id: 3,
    title: '로그인이 되지 않아요',
    category: '오류 문의',
    status: '답변 대기',
    date: '2026.10.06',
    content: '로그인 오류가 발생합니다.',
  },
];

export default function Inquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem('inquiries');

      return saved
        ? JSON.parse(saved) as Inquiry[]
        : initialInquiries;
    } catch {
      return initialInquiries;
    }
  });

  useEffect(() => {
    const updateInquiries = () => {
      try {
        const saved = localStorage.getItem('inquiries');

        setInquiries(
          saved
            ? JSON.parse(saved) as Inquiry[]
            : initialInquiries
        );
      } catch {
        setInquiries(initialInquiries);
      }
    };

    window.addEventListener('focus', updateInquiries);

    return () => {
      window.removeEventListener('focus', updateInquiries);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">

        {/* 페이지 제목 */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            문의 목록
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            등록한 문의 내역을 확인할 수 있어요.
          </p>
        </header>

        {/* 문의 현황 */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            전체 문의
            <span className="ml-2 font-bold text-black">
              {inquiries.length}건
            </span>
          </p>

          <Link
            to="/inquiries/new"
            className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            + 문의 등록하기
          </Link>
        </div>

        {/* 문의 테이블 */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">

          {inquiries.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-gray-400">
                등록된 문의가 없습니다.
              </p>

              <Link
                to="/inquiries/new"
                className="mt-5 inline-block rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
              >
                첫 문의 등록하기
              </Link>
            </div>
          ) : (
            <>
              {/* PC 테이블 */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                  <thead className="border-b border-gray-200 bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                        번호
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                        제목
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                        문의 유형
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                        작성일
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                        상태
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {inquiries.map((inquiry, index) => (
                      <tr
                        key={inquiry.id}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="px-6 py-5 text-sm text-gray-500">
                          {inquiries.length - index}
                        </td>

                        <td className="px-6 py-5">
                          <Link
                            to={`/inquiries/${inquiry.id}`}
                            className="font-medium text-gray-900 hover:underline"
                          >
                            {inquiry.title}
                          </Link>
                        </td>

                        <td className="px-6 py-5 text-sm text-gray-500">
                          {inquiry.category}
                        </td>

                        <td className="px-6 py-5 text-sm text-gray-500">
                          {inquiry.date}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                              inquiry.status === '답변 완료'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {inquiry.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 모바일 목록 */}
              <div className="divide-y divide-gray-100 md:hidden">
                {inquiries.map((inquiry) => (
                  <Link
                    key={inquiry.id}
                    to={`/inquiries/${inquiry.id}`}
                    className="block p-5 transition hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate font-semibold text-gray-900">
                        {inquiry.title}
                      </p>

                      <span
                        className={`shrink-0 rounded-md px-2 py-1 text-xs font-semibold ${
                          inquiry.status === '답변 완료'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-gray-400">
                      {inquiry.category} · {inquiry.date}
                    </p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </section>

      </div>
    </div>
  );
}
