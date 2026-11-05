import { useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router';
import Button from '../../components/dashboard/Button/Button';
import ButtonLink from '../../components/dashboard/ButtonLink/ButtonLink';
import Modal from '../../components/dashboard/Modal/Modal';
import PageHeading from '../../components/dashboard/PageHeading/PageHeading';
import { ROUTES } from '../../constants/routes';
import { useInquiries } from '../../hooks/useInquiries';
import { formatDateTime } from '../../utils/formatDateTime';

function InquiryDetailPage() {
  const navigate = useNavigate();
  const { inquiryId } = useParams();
  const { showToast } = useOutletContext();
  const { inquiries, deleteInquiry } = useInquiries();
  // 모달을 연 버튼을 기억해 두었다가, 취소하면 그 버튼으로 포커스를 돌려준다.
  const [modalTrigger, setModalTrigger] = useState(null);

  // 주소의 id는 문자열이라 문자열끼리 비교한다.
  const inquiry = inquiries.find(({ id }) => String(id) === inquiryId);

  if (!inquiry) {
    return (
      <div className="mx-auto flex w-full max-w-[894px] flex-col gap-6">
        <PageHeading
          title="문의 상세"
          actions={
            <ButtonLink variant="secondary" to={ROUTES.DASHBOARD_INQUIRIES}>
              목록으로
            </ButtonLink>
          }
        />
        <p className="rounded-[10px] border border-dash-line bg-white py-12 text-center text-sm text-dash-muted">
          문의를 찾을 수 없어요. 이미 삭제되었을 수 있어요.
        </p>
      </div>
    );
  }

  const closeModal = () => {
    modalTrigger?.focus();
    setModalTrigger(null);
  };

  // 삭제하면 이 페이지가 사라지므로 목록으로 이동하고, 토스트는 레이아웃에 있어서 목록에서도 보인다.
  const confirmDelete = () => {
    deleteInquiry(inquiry.id);
    showToast('문의가 삭제되었습니다.');
    navigate(ROUTES.DASHBOARD_INQUIRIES);
  };

  return (
    <div className="mx-auto flex w-full max-w-[894px] flex-col gap-6">
      <PageHeading
        title="문의 상세"
        actions={
          <>
            <ButtonLink variant="secondary" to={ROUTES.DASHBOARD_INQUIRIES}>
              목록으로
            </ButtonLink>
            <Button
              variant="secondary"
              onClick={() => setModalTrigger(document.activeElement)}
              aria-label={`"${inquiry.title}" 삭제하기`}
            >
              삭제
            </Button>
          </>
        }
      />

      <article className="overflow-hidden rounded-[10px] border border-dash-line bg-white">
        <header className="flex flex-col gap-3 border-b border-dash-line px-8 py-6">
          <time dateTime={inquiry.createdAt} className="text-sm leading-5 text-dash-muted">
            {formatDateTime(inquiry.createdAt)}
          </time>
          <h2 className="text-2xl leading-8 font-bold break-all text-dash-black">
            {inquiry.title}
          </h2>
        </header>

        <dl className="grid gap-4 border-b border-dash-line bg-dash-bg px-8 py-5 sm:grid-cols-2 sm:gap-8">
          <div className="flex flex-col gap-1.5">
            <dt className="text-xs leading-4 text-dash-muted">작성자</dt>
            <dd className="text-sm leading-5 font-medium text-dash-black">{inquiry.name}</dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="text-xs leading-4 text-dash-muted">이메일</dt>
            <dd className="text-sm leading-5 font-medium break-all text-dash-black">
              {inquiry.email}
            </dd>
          </div>
        </dl>

        <section aria-labelledby="inquiry-content-title" className="flex flex-col gap-4 px-8 py-6">
          <h3 id="inquiry-content-title" className="text-xs leading-4 font-bold text-dash-muted">
            문의 내용
          </h3>
          {/* 사용자가 입력한 줄바꿈을 그대로 보여준다. */}
          <p className="text-sm leading-[22.75px] break-all whitespace-pre-line text-dash-content">
            {inquiry.content}
          </p>
        </section>
      </article>

      {modalTrigger && (
        <Modal message="문의를 삭제하시겠습니까?" onCancel={closeModal} onConfirm={confirmDelete} />
      )}
    </div>
  );
}

export default InquiryDetailPage;
