import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteInquiry, getInquiries } from '../lib/appStorage';

function InquiryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const inquiry = getInquiries().find((item) => item.id === id);

  function handleDelete() {
    if (!id) return;

    deleteInquiry(id);
    setIsDeleteModalOpen(false);
    alert('문의가 삭제되었습니다.');
    navigate('/inquiries', { replace: true });
  }

  if (!inquiry) {
    return (
      <section className="flex flex-col items-center justify-center py-20">
        <h1 className="mb-4 text-2xl font-bold">문의를 찾을 수 없습니다.</h1>
        <button
          type="button"
          onClick={() => navigate('/inquiries')}
          className="rounded-xl bg-black px-5 py-3 text-white"
        >
          목록으로
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[900px]">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">문의 상세</h1>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/inquiries')}
            className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm hover:bg-gray-50"
          >
            목록으로
          </button>
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm hover:bg-gray-50"
          >
            삭제
          </button>
        </div>
      </div>

      <article className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="p-8">
          <p className="mb-2 text-sm text-gray-500">{inquiry.date}</p>
          <h2 className="text-2xl font-bold">{inquiry.title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 border-y border-gray-200 bg-gray-50 px-8 py-5 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs text-gray-500">작성자</p>
            <p className="text-sm font-medium">{inquiry.name}</p>
          </div>
          <div>
            <p className="mb-2 text-xs text-gray-500">이메일</p>
            <p className="break-all text-sm font-medium">{inquiry.email}</p>
          </div>
        </div>

        <div className="p-8">
          <p className="mb-5 text-xs font-medium text-gray-500">문의 내용</p>
          <p className="whitespace-pre-line text-sm leading-8">
            {inquiry.content}
          </p>
        </div>
      </article>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-[390px] rounded-xl bg-white px-8 py-9 text-center shadow-xl"
          >
            <p id="delete-title" className="mb-8 text-lg">
              문의를 삭제하시겠습니까?
            </p>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-xl border border-gray-200 px-6 py-3 text-sm hover:bg-gray-50"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-xl bg-black px-6 py-3 text-sm text-white hover:bg-gray-800"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default InquiryDetail;
