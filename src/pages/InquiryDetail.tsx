import { useState } from 'react';
import {
  Link,
  useParams,
  Navigate,
  useNavigate,
} from 'react-router-dom';

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

export default function InquiryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  let inquiries: Inquiry[] = initialInquiries;

  try {
    const saved = localStorage.getItem('inquiries');

    if (saved) {
      inquiries = JSON.parse(saved) as Inquiry[];
    }
  } catch {
    inquiries = initialInquiries;
  }

  const inquiry = inquiries.find((item) => item.id === Number(id));

  if (!inquiry) {
    return <Navigate to="/inquiries" replace />;
  }

  function deleteInquiry() {
    try {
      const saved = localStorage.getItem('inquiries');
      const currentInquiries: Inquiry[] = saved
        ? (JSON.parse(saved) as Inquiry[])
        : initialInquiries;

      const updatedInquiries = currentInquiries.filter(
        (item) => item.id !== Number(id),
      );

      localStorage.setItem('inquiries', JSON.stringify(updatedInquiries));
      navigate('/inquiries');
    } catch {
      alert('문의 삭제 중 오류가 발생했어요. 다시 시도해 주세요.');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/inquiries"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
        >
          <span aria-hidden="true">←</span>
          문의 목록
        </Link>

        <article className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 p-6 md:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <span
                className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                  inquiry.status === '답변 완료'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {inquiry.status}
              </span>

              <time className="text-sm text-gray-500">
                {inquiry.date}
              </time>
            </div>

            <p className="mb-3 text-sm text-gray-500">
              {inquiry.category}
            </p>

            <h1 className="text-xl font-bold leading-8 text-gray-900 md:text-2xl">
              {inquiry.title}
            </h1>
          </div>

          <section className="border-b border-gray-100 p-6 md:p-8">
            <h2 className="mb-4 text-sm font-semibold text-gray-900">
              문의 내용
            </h2>

            <div className="min-h-32 whitespace-pre-wrap text-sm leading-7 text-gray-700">
              {inquiry.content || '문의 내용이 없습니다.'}
            </div>
          </section>

          <section className="p-6 md:p-8">
            <h2 className="mb-4 text-sm font-semibold text-gray-900">
              답변
            </h2>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-gray-600">
                {inquiry.status === '답변 완료'
                  ? '답변 내용은 아직 등록되지 않았습니다.'
                  : '아직 등록된 답변이 없습니다.'}
              </p>
            </div>
          </section>

          <footer className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-white p-5 sm:flex-row sm:justify-between md:px-8">
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="rounded-lg border border-red-200 px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              삭제하기
            </button>

            <Link
              to="/inquiries"
              className="rounded-lg bg-black px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-gray-800"
            >
              목록으로
            </Link>
          </footer>
        </article>
      </div>

      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="delete-modal-title"
              className="text-lg font-bold text-gray-900"
            >
              문의를 삭제할까요?
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              삭제한 문의는 복구할 수 없어요.
              정말 삭제하시겠어요?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                취소
              </button>

              <button
                type="button"
                onClick={deleteInquiry}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
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
