
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

export default function Dashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem('inquiries');
      return saved ? JSON.parse(saved) as Inquiry[] : initialInquiries;
    } catch {
      return initialInquiries;
    }
  });

  useEffect(() => {
    const updateInquiries = () => {
      try {
        const saved = localStorage.getItem('inquiries');

        setInquiries(
          saved ? JSON.parse(saved) as Inquiry[] : initialInquiries
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

  const waitingCount = inquiries.filter(
    (inquiry) => inquiry.status === '답변 대기'
  ).length;

  const completedCount = inquiries.filter(
    (inquiry) => inquiry.status === '답변 완료'
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">

        {/* 페이지 제목 */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            대시보드
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            ZERO100 Admin에 오신 것을 환영합니다.
          </p>
        </header>

        {/* 사용자 정보 */}
        <section className="mb-8 rounded-2xl bg-black p-6 text-white md:p-8">
          <p className="text-sm text-gray-300">
            Welcome to ZERO100 Admin
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            안녕하세요, 사용자님!
          </h2>

          <p className="mt-2 text-sm text-gray-300">
            오늘도 ZERO100 Admin과 함께해요.
          </p>

          <Link
            to="/mypage"
            className="mt-6 inline-block rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            내 정보 확인하기
          </Link>
        </section>

        {/* 문의 현황 */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            문의 현황
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-500">
                전체 문의
              </p>

              <p className="mt-3 text-3xl font-bold text-gray-900">
                {inquiries.length}
                <span className="ml-1 text-base font-normal">건</span>
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-500">
                답변 대기
              </p>

              <p className="mt-3 text-3xl font-bold text-amber-600">
                {waitingCount}
                <span className="ml-1 text-base font-normal">건</span>
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-500">
                답변 완료
              </p>

              <p className="mt-3 text-3xl font-bold text-green-600">
                {completedCount}
                <span className="ml-1 text-base font-normal">건</span>
              </p>
            </div>
          </div>
        </section>

        {/* 최근 문의 */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900">
              최근 문의
            </h2>

            <Link
              to="/inquiries"
              className="text-sm font-medium text-gray-500 transition hover:text-black"
            >
              전체 보기 →
            </Link>
          </div>

          {inquiries.length === 0 ? (
            <div className="p-10 text-center text-sm text-gray-400">
              등록된 문의가 없습니다.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {inquiries.slice(0, 5).map((inquiry) => (
                <Link
                  key={inquiry.id}
                  to={`/inquiries/${inquiry.id}`}
                  className="flex flex-col gap-3 p-5 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between md:px-6"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-gray-900">
                      {inquiry.title}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      {inquiry.category} · {inquiry.date}
                    </p>
                  </div>

                  <span
                    className={`w-fit shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold ${
                      inquiry.status === '답변 완료'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {inquiry.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* 문의 등록 버튼 */}
        <div className="mt-6 flex justify-end">
          <Link
            to="/inquiries/new"
            className="rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            + 문의 등록하기
          </Link>
        </div>

      </div>
    </div>
  );
}
