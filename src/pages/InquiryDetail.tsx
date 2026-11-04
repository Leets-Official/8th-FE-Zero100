
import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

type Inquiry = {
  id: number;
  title: string;
  category: string;
  status: string;
  date: string;
  content: string;
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

export default function InquiryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 문의 목록 가져오기
  const saved = localStorage.getItem('inquiries');

  const inquiries: Inquiry[] = saved
    ? JSON.parse(saved) as Inquiry[]
    : initialInquiries;

  const inquiry = inquiries.find((item) => item.id === Number(id));

  // 문의 삭제
  const handleDelete = () => {
    try {
      const updatedInquiries = inquiries.filter(
        (item) => item.id !== Number(id)
      );

      localStorage.setItem(
        'inquiries',
        JSON.stringify(updatedInquiries)
      );

      alert('문의가 삭제되었습니다.');
      navigate('/inquiries');
    } catch {
      alert('문의 삭제 중 오류가 발생했어요.');
    }
  };

  // 해당 문의가 없는 경우 목록으로 이동
  if (!inquiry) {
    return <Navigate to="/inquiries" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-3xl">

        {/* 페이지 제목 */}
        <header className="mb-8">
          <Link
            to="/inquiries"
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
          >
            ← 문의 목록
          </Link>

          <h1 className="text-3xl font-bold text-gray-900">
            문의 상세
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            등록한 문의 내용을 확인할 수 있습니다.
          </p>
        </header>

        {/* 문의 내용 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

          {/* 제목 및 상태 */}
          <div className="border-b border-gray-200 pb-6">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                {inquiry.category}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  inquiry.status === '답변 완료'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {inquiry.status}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              {inquiry.title}
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              작성일: {inquiry.date}
            </p>
          </div>

          {/* 문의 본문 */}
          <div className="min-h-48 whitespace-pre-wrap py-8 text-sm leading-7 text-gray-700">
            {inquiry.content}
          </div>

          {/* 답변 영역 */}
          <div className="rounded-lg bg-gray-50 p-5">
            <h3 className="mb-3 font-semibold text-gray-900">
              관리자 답변
            </h3>

            {inquiry.status === '답변 완료' ? (
              <p className="text-sm text-gray-600">
                답변이 등록되었습니다.
              </p>
            ) : (
              <p className="text-sm text-gray-400">
                아직 등록된 답변이 없습니다.
              </p>
            )}
          </div>

          {/* 버튼 */}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Link
              to="/inquiries"
              className="rounded-lg border border-gray-300 px-6 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              목록으로
            </Link>

            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="rounded-lg bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              문의 삭제
            </button>
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-gray-900">
              문의를 삭제하시겠어요?
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              삭제한 문의는 다시 복구할 수 없습니다.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                취소
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
