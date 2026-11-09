import { useRef, useState } from 'react';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router';

import Button from '../components/dashboard/Button';
import Modal from '../components/dashboard/Modal';
import { ROUTES } from '../constants/routes';
import { removeAccessToken } from '../utils/authStorage';
import { formatCreatedAt } from '../utils/formatCreatedAt';
import { getApiErrorMessage } from '../utils/getApiErrorMessage';

const listLinkClass =
  'inline-flex items-center justify-center rounded-[10px] px-[20px] py-[10px] text-[14px] leading-[20px] font-medium text-[#364153] shadow-[inset_0_0_0_0.93px_#E5E7EB] hover:bg-[#F3F4F6] focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#364153]';

function InquiryDetailPage() {
  const { inquiryId } = useParams();
  const navigate = useNavigate();
  const { user, inquiries, deleteInquiry } = useOutletContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notice, setNotice] = useState('');

  const deletingRef = useRef(false);

  const inquiry = inquiries.find((item) => String(item.id) === inquiryId);

  const canDelete = Boolean(inquiry && inquiry.userId === user.id);

  function openDeleteModal() {
    setNotice('');
    setIsModalOpen(true);
  }

  function closeDeleteModal() {
    if (deletingRef.current) return;

    setIsModalOpen(false);
  }

  async function handleConfirmDelete() {
    if (!inquiry || !canDelete || deletingRef.current) return;

    deletingRef.current = true;
    setIsDeleting(true);
    setNotice('');

    try {
      await deleteInquiry(inquiry.id);

      setIsModalOpen(false);

      navigate(ROUTES.INQUIRIES, {
        replace: true,
      });
    } catch (error) {
      setIsModalOpen(false);

      if (error.response?.status === 401) {
        removeAccessToken();
        navigate(ROUTES.LOGIN, { replace: true });
        return;
      }

      setNotice(getApiErrorMessage(error, '문의 삭제에 실패했습니다. 다시 시도해주세요.'));
    } finally {
      deletingRef.current = false;
      setIsDeleting(false);
    }
  }

  if (!inquiry) {
    return (
      <section className="mx-auto flex w-full max-w-[896px] flex-col items-start gap-[24px]">
        <h2 className="text-[24px] leading-[32px] font-bold text-[#000000]">
          문의를 찾을 수 없습니다.
        </h2>

        <p className="text-[14px] leading-[20px] text-[#6A7282]">
          삭제되었거나 존재하지 않는 문의입니다.
        </p>

        <Link to={ROUTES.INQUIRIES} className={listLinkClass}>
          목록으로
        </Link>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="inquiry-detail-title"
      className="mx-auto flex w-full max-w-[896px] flex-col gap-[24px]"
    >
      <div className="flex flex-wrap items-center justify-between gap-[16px]">
        <h2
          id="inquiry-detail-title"
          className="text-[24px] leading-[32px] font-bold text-[#000000]"
        >
          문의 상세
        </h2>

        <div className="flex items-center gap-[12px]">
          <Link to={ROUTES.INQUIRIES} className={listLinkClass}>
            목록으로
          </Link>

          {canDelete && (
            <Button
              variant="secondary"
              size="small"
              onClick={openDeleteModal}
              disabled={isDeleting}
            >
              {isDeleting ? '삭제 중...' : '삭제'}
            </Button>
          )}
        </div>
      </div>

      <article className="overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF]">
        <header className="flex flex-col gap-[8px] p-[32px]">
          <time dateTime={inquiry.createdAt} className="text-[14px] leading-[20px] text-[#6A7282]">
            {formatCreatedAt(inquiry.createdAt)}
          </time>

          <h3 className="text-[24px] leading-[32px] font-bold break-words text-[#000000]">
            {inquiry.title}
          </h3>
        </header>

        <dl className="grid grid-cols-1 gap-[24px] border-y border-[#E5E7EB] bg-[#F9FAFB] px-[32px] py-[20px] sm:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-[6px]">
            <dt className="text-[12px] leading-[20px] text-[#6A7282]">작성자</dt>

            <dd className="text-[14px] leading-[20px] font-medium break-words text-[#000000]">
              {inquiry.author}
            </dd>
          </div>

          <div className="flex min-w-0 flex-col gap-[6px]">
            <dt className="text-[12px] leading-[20px] text-[#6A7282]">이메일</dt>

            <dd className="text-[14px] leading-[20px] font-medium break-words text-[#000000]">
              {inquiry.email}
            </dd>
          </div>
        </dl>

        <div className="flex flex-col gap-[16px] p-[32px]">
          <h4 className="text-[12px] leading-[20px] font-medium text-[#6A7282]">문의 내용</h4>

          <p className="text-[14px] leading-[24px] break-words whitespace-pre-wrap text-[#1E2939]">
            {inquiry.content}
          </p>
        </div>
      </article>

      <div role="status" aria-atomic="true" className={notice ? '' : 'sr-only'}>
        {notice && <p className="text-[14px] leading-[20px] text-[#364153]">{notice}</p>}
      </div>

      {isModalOpen && (
        <Modal
          title="문의를 삭제하시겠습니까?"
          onClose={closeDeleteModal}
          onConfirm={handleConfirmDelete}
          confirmText={isDeleting ? '삭제 중...' : '확인'}
        />
      )}
    </section>
  );
}

export default InquiryDetailPage;
