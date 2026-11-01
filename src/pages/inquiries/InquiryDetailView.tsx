import { useCallback, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { deleteInquiry, getInquiry } from '../../api/inquiryApi';
import { inquiryErrorMessage } from '../../api/inquiryClient';
import { useResource } from '../../hooks/useResource';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { inquiryListLocation } from '../../utils/inquiryNavigation';
import { formatDate } from '../../utils/date';
import type { ApiOptions } from '../../types/inquiry';
import ResourcePanel from '../../components/common/ResourcePanel';
import Button from '../../components/common/ButtonView';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';
import InquiryStatusBadge from '../../components/inquiries/InquiryStatusBadge';
import '../../styles/inquiry-editor.css';

export default function InquiryDetailView() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const listLocation = inquiryListLocation(location.state);
  const { user } = useAuth();
  const notify = useToast();
  const load = useCallback((options?: ApiOptions) => getInquiry(id, options), [id]);
  const resource = useResource(load);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const busy = useRef(false);
  async function confirmDelete() {
    if (busy.current) return;
    busy.current = true;
    setPending(true);
    setError('');
    try {
      await deleteInquiry(id);
      setOpen(false);
      notify('문의가 삭제되었습니다.');
      navigate(listLocation, { replace: true });
    } catch (requestError: unknown) {
      setError(inquiryErrorMessage(requestError));
    } finally {
      busy.current = false;
      setPending(false);
    }
  }
  const inquiry = resource.data;
  const isOwner = Boolean(inquiry && user && inquiry.userId === user.id);
  return (
    <div className="detail-page inquiry-detail-page">
      <div className="page-toolbar">
        <h1 className="admin-page-title">문의 상세</h1>
        <div className="detail-actions">
          <Link
            className="admin-button admin-button--secondary"
            to={listLocation}
            aria-disabled={pending}
            onClick={(event) => {
              if (pending) event.preventDefault();
            }}
          >
            목록으로
          </Link>
          {isOwner && (
            <>
              <Link
                className="admin-button admin-button--secondary"
                to={`/inquiries/${encodeURIComponent(id)}/edit`}
                state={{ listLocation }}
                aria-disabled={pending}
                onClick={(event) => {
                  if (pending) event.preventDefault();
                }}
              >
                수정
              </Link>
              <Button
                variant="secondary"
                disabled={pending}
                onClick={() => {
                  setError('');
                  setOpen(true);
                }}
              >
                삭제
              </Button>
            </>
          )}
        </div>
      </div>
      <ResourcePanel status={resource.status} error={resource.error} onRetry={resource.reload}>
        {inquiry && (
          <article className="inquiry-detail">
            <header>
              <div className="inquiry-detail-meta">
                <time dateTime={inquiry.createdAt}>{formatDate(inquiry.createdAt, true)}</time>
                <InquiryStatusBadge status={inquiry.status} />
              </div>
              <h2>{inquiry.title}</h2>
              {inquiry.updatedAt && (
                <p className="inquiry-updated">
                  최근 수정{' '}
                  <time dateTime={inquiry.updatedAt}>{formatDate(inquiry.updatedAt, true)}</time>
                </p>
              )}
            </header>
            <dl className="inquiry-author">
              <div>
                <dt>작성자</dt>
                <dd>{inquiry.name}</dd>
              </div>
              <div>
                <dt>이메일</dt>
                <dd>{inquiry.email}</dd>
              </div>
            </dl>
            <section className="inquiry-content">
              <h3>문의 내용</h3>
              <p>{inquiry.content}</p>
            </section>
          </article>
        )}
      </ResourcePanel>
      <ConfirmationDialog
        open={open}
        message="문의를 삭제하시겠습니까?"
        pending={pending}
        pendingLabel="삭제 중..."
        error={error}
        onClose={() => setOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
