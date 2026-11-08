import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDashboard } from '../hooks/useDashboard.js';
import LinkButton from '../components/common/LinkButton.jsx';
import PageHeading from '../components/layout/PageHeading.jsx';
import InquiryDate from '../components/dashboard/InquiryDate.jsx';
import Modal from '../components/common/Modal.jsx';
import Button from '../components/common/Button.jsx';
import { getApiError } from '../api/client.js';

function InquiryDetailPage() {
  const { inquiryId } = useParams();
  const { data, removeInquiry } = useDashboard();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const inquiry = data.inquiries.find((item) => item.id === inquiryId);

  async function confirmDelete() {
    setError('');
    setPending(true);
    try {
      await removeInquiry(inquiry.id);
      setModalOpen(false);
      navigate('/inquiries', { replace: true });
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <PageHeading
        title="문의 상세"
        action={
          <div className="flex gap-3">
            <LinkButton to="/inquiries" variant="secondary">
              목록으로
            </LinkButton>
            {inquiry && inquiry.authorId === data.profile.id && (
              <Button variant="secondary" onClick={() => setModalOpen(true)}>
                삭제
              </Button>
            )}
          </div>
        }
      />
      {inquiry ? (
        <article className="max-w-3xl rounded-lg border border-line bg-white p-6 sm:p-8">
          <header className="border-b border-line pb-5">
            <p className="mb-3 text-sm text-muted">
              작성일 <InquiryDate value={inquiry.createdAt} />
            </p>
            <h2 className="text-lg font-semibold break-words">{inquiry.title}</h2>
          </header>
          <dl className="grid gap-4 border-b border-line py-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="mb-2 text-muted">작성자</dt>
              <dd>
                {inquiry.authorName ||
                  (inquiry.authorId === data.profile.id ? data.profile.name : '정보 없음')}
              </dd>
            </div>
            <div>
              <dt className="mb-2 text-muted">이메일</dt>
              <dd>
                {inquiry.authorEmail ||
                  (inquiry.authorId === data.profile.id ? data.profile.email : '정보 없음')}
              </dd>
            </div>
          </dl>
          <h3 className="pt-6 text-sm text-muted">문의 내용</h3>
          <p className="min-h-40 py-6 text-sm leading-7 break-words whitespace-pre-wrap">
            {inquiry.content}
          </p>
        </article>
      ) : (
        <p
          role="status"
          className="max-w-3xl rounded-lg border border-line bg-white p-8 text-sm text-muted"
        >
          문의를 찾을 수 없습니다.
        </p>
      )}
      {modalOpen && (
        <Modal
          title="문의를 삭제하시겠습니까?"
          onClose={() => {
            if (!pending) setModalOpen(false);
          }}
        >
          {error && (
            <p role="alert" className="mt-4 text-sm text-red-700">
              {error}
            </p>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setModalOpen(false)} disabled={pending}>
              취소
            </Button>
            <Button variant="danger" onClick={confirmDelete} isLoading={pending}>
              삭제
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default InquiryDetailPage;
