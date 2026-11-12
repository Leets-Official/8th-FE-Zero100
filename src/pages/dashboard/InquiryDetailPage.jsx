import { useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router';
import { getMe } from '../../api/authApi';
import { deleteInquiry, getInquiries } from '../../api/inquiryApi';
import Button from '../../components/dashboard/Button/Button';
import ButtonLink from '../../components/dashboard/ButtonLink/ButtonLink';
import Modal from '../../components/dashboard/Modal/Modal';
import PageHeading from '../../components/dashboard/PageHeading/PageHeading';
import RequestStatus from '../../components/dashboard/RequestStatus/RequestStatus';
import { ROUTES } from '../../constants/routes';
import { useAsyncData } from '../../hooks/useAsyncData';
import { getErrorMessage } from '../../utils/getErrorMessage';

// 문의 한 개를 조회하는 API가 없어서 목록에서 찾는다. 내 문의인지 알기 위해 내 정보도 같이 불러온다.
const loadInquiriesWithMe = async () => {
  const [inquiries, me] = await Promise.all([getInquiries(), getMe()]);
  return { inquiries, me };
};

function InquiryDetailPage() {
  const { inquiryId } = useParams();
  const { status, data, error, retry } = useAsyncData(
    loadInquiriesWithMe,
    '문의를 불러오지 못했어요.',
  );

  const listLink = (
    <ButtonLink variant="secondary" to={ROUTES.DASHBOARD_INQUIRIES}>
      목록으로
    </ButtonLink>
  );

  if (status !== 'success') {
    return (
      <div className="mx-auto flex w-full max-w-[894px] flex-col gap-6">
        <PageHeading title="문의 상세" actions={listLink} />
        <RequestStatus
          status={status}
          error={error}
          loadingMessage="문의를 불러오고 있어요."
          onRetry={retry}
        />
      </div>
    );
  }

  const inquiry = data.inquiries.find(({ id }) => id === inquiryId);

  if (!inquiry) {
    return (
      <div className="mx-auto flex w-full max-w-[894px] flex-col gap-6">
        <PageHeading title="문의 상세" actions={listLink} />
        <p className="rounded-[10px] border border-dash-line bg-white py-12 text-center text-sm text-dash-muted">
          문의를 찾을 수 없어요. 이미 삭제되었을 수 있어요.
        </p>
      </div>
    );
  }

  return (
    <InquiryDetail inquiry={inquiry} isMine={inquiry.user_id === data.me.id} listLink={listLink} />
  );
}

function InquiryDetail({ inquiry, isMine, listLink }) {
  const navigate = useNavigate();
  const { showToast } = useOutletContext();
  // 모달을 연 버튼을 기억해 두었다가, 취소하면 그 버튼으로 포커스를 돌려준다.
  const [modalTrigger, setModalTrigger] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const closeModal = () => {
    modalTrigger?.focus();
    setModalTrigger(null);
  };

  // 삭제하면 이 페이지가 사라지므로 목록으로 이동하고, 토스트는 레이아웃에 있어서 목록에서도 보인다.
  const confirmDelete = async () => {
    setModalTrigger(null);
    setIsDeleting(true);
    try {
      await deleteInquiry(inquiry.id);
      showToast('문의가 삭제되었습니다.');
      navigate(ROUTES.DASHBOARD_INQUIRIES);
    } catch (error) {
      showToast(getErrorMessage(error, '문의를 삭제하지 못했어요.'));
      setIsDeleting(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[894px] flex-col gap-6">
      <PageHeading
        title="문의 상세"
        actions={
          <>
            {listLink}
            {/* 삭제는 본인이 쓴 문의만 가능해서 내 문의일 때만 버튼을 보여준다. */}
            {isMine && (
              <Button
                variant="secondary"
                onClick={() => setModalTrigger(document.activeElement)}
                disabled={isDeleting}
                aria-label={`"${inquiry.title}" 삭제하기`}
              >
                {isDeleting ? '삭제 중...' : '삭제'}
              </Button>
            )}
          </>
        }
      />

      <article className="overflow-hidden rounded-[10px] border border-dash-line bg-white">
        <header className="flex flex-col gap-3 border-b border-dash-line px-8 py-6">
          <p className="text-sm leading-5 text-dash-muted">{inquiry.created_at}</p>
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
