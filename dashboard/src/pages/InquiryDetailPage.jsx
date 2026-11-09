import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { deleteInquiry, getInquiries } from '../api/inquiries';
import { getErrorMessage } from '../api/client';
import { useAuth } from '../context/AuthContext';

const InquiryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [inquiry, setInquiry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let ignore = false;
    getInquiries()
      .then((data) => {
        if (!ignore) setInquiry(data.find((item) => item.id === id) ?? null);
      })
      .catch((error) => {
        if (!ignore) setErrorMessage(getErrorMessage(error, '문의를 불러오지 못했습니다'));
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteInquiry(id);
      navigate('/inquiries', { state: { toast: '문의가 삭제되었습니다.' } });
    } catch (error) {
      setIsDeleteModalOpen(false);
      setErrorMessage(getErrorMessage(error, '문의를 삭제하지 못했습니다'));
      setIsDeleting(false);
    }
  };

  const isMine = inquiry && user && inquiry.user_id === user.id;

  if (isLoading) {
    return <p className="mx-auto w-full max-w-[896px] text-sm text-[#4A5565]">불러오는 중...</p>;
  }

  if (!inquiry) {
    return (
      <div className="mx-auto flex w-full max-w-[896px] flex-col items-start gap-4">
        <p className="text-base text-[#4A5565]">{errorMessage || '존재하지 않는 문의입니다.'}</p>
        <Button variant="secondary" size="small" onClick={() => navigate('/inquiries')}>
          목록으로
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[896px] flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">문의 상세</h2>
        <div className="flex gap-2">
          <Button variant="secondary" size="small" onClick={() => navigate('/inquiries')}>
            목록으로
          </Button>
          {isMine && (
            <Button variant="secondary" size="small" onClick={() => setIsDeleteModalOpen(true)}>
              삭제
            </Button>
          )}
        </div>
      </div>

      {errorMessage && (
        <p role="alert" className="text-sm text-red-500">
          {errorMessage}
        </p>
      )}

      <article className="overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-white">
        <header className="flex flex-col gap-3 border-b border-[#E5E7EB] px-8 py-6">
          <p className="text-sm text-[#6A7282]">{inquiry.created_at}</p>
          <h3 className="text-xl font-bold text-black">{inquiry.title}</h3>
        </header>

        <dl className="grid grid-cols-2 gap-4 border-b border-[#E5E7EB] bg-[#F9FAFB] px-8 py-5">
          <div className="flex flex-col gap-1">
            <dt className="text-xs text-[#6A7282]">작성자</dt>
            <dd className="text-sm font-medium text-black">{inquiry.name}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-xs text-[#6A7282]">이메일</dt>
            <dd className="text-sm font-medium text-black">{inquiry.email}</dd>
          </div>
        </dl>

        <section className="flex flex-col gap-4 px-8 py-6">
          <h4 className="text-xs text-[#6A7282]">문의 내용</h4>
          <p className="whitespace-pre-line text-sm leading-6 text-[#1E2939]">{inquiry.content}</p>
        </section>
      </article>

      {isDeleteModalOpen && (
        <Modal
          message="문의를 삭제하시겠습니까?"
          confirmText={isDeleting ? '삭제 중...' : '확인'}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default InquiryDetailPage;
