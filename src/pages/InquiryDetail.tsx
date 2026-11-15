import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { api } from '../api/client';

type Inquiry = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  title: string;
  content: string;
  created_at: string;
};

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error ?? fallback;
  }
  return fallback;
}

function InquiryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 상세 조회 API가 없어서 목록을 받아 id로 찾음
  useEffect(() => {
    setIsLoading(true);

    api
      .get('/api/inquiries')
      .then((res) => {
        const list: Inquiry[] = res.data.data;
        setInquiry(list.find((item) => item.id === id) ?? null);
      })
      .catch((error) =>
        alert(getErrorMessage(error, '문의를 불러오지 못했습니다.')),
      )
      .finally(() => setIsLoading(false));
  }, [id]);

  // 삭제 (본인 문의만 가능)
  async function handleDelete() {
    if (!id) return;

    setIsDeleting(true);

    try {
      await api.delete(`/api/inquiries/${id}`);
      setIsDeleteModalOpen(false);
      alert('문의가 삭제되었습니다.');
      navigate('/inquiries', { replace: true });
    } catch (error) {
      setIsDeleteModalOpen(false);
      alert(getErrorMessage(error, '문의 삭제에 실패했습니다.'));
    } finally {
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return (
      <section className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500">불러오는 중...</p>
      </section>
    );
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
          <p className="mb-2 text-sm text-gray-500">{inquiry.created_at}</p>
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
                disabled={isDeleting}
                className="rounded-xl border border-gray-200 px-6 py-3 text-sm hover:bg-gray-50"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-xl bg-black px-6 py-3 text-sm text-white hover:bg-gray-800 disabled:bg-gray-400"
              >
                {isDeleting ? '삭제 중...' : '확인'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default InquiryDetail;
