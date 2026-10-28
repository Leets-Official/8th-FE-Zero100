import { useCallback, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router';
import { deleteInquiry, getInquiry } from '../../api/admin';
import { errorMessage } from '../../api/adminClient';
import { useAdminResource } from '../../hooks/useAdminResource';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { inquiryListLocation } from '../../utils/inquiryList';
import { formatDate } from '../../utils/date';
import AsyncPanel from '../../components/common/AsyncPanel';
import Button from '../../components/common/Button';
import ConfirmDialog from '../../components/common/ConfirmDialog';

export default function InquiryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const listLocation = inquiryListLocation(location.state);
  const { user } = useAuth();
  const notify = useToast();
  const load = useCallback((options) => getInquiry(id, options), [id]);
  const resource = useAdminResource(load);
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
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      busy.current = false;
      setPending(false);
    }
  }
  const inquiry = resource.data;
  return (
    <div className="detail-page">
      <div className="page-toolbar">
        <h1 className="admin-page-title">문의 상세</h1>
        <div className="detail-actions">
          <Link className="admin-button admin-button--secondary" to={listLocation}>
            목록으로
          </Link>
          {inquiry?.userId === user.id && (
            <Link
              className="admin-button admin-button--secondary"
              to={`/inquiries/${encodeURIComponent(id)}/edit`}
              state={{ listLocation }}
            >
              수정
            </Link>
          )}
          {inquiry?.userId === user.id && (
            <Button
              variant="secondary"
              onClick={() => {
                setError('');
                setOpen(true);
              }}
            >
              삭제
            </Button>
          )}
        </div>
      </div>
      <AsyncPanel {...resource} onRetry={resource.reload}>
        {inquiry && (
          <article className="inquiry-detail">
            <header>
              <time dateTime={inquiry.createdAt}>{formatDate(inquiry.createdAt, true)}</time>
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
      </AsyncPanel>
      <ConfirmDialog
        open={open}
        message="문의를 삭제하시겠습니까?"
        pending={pending}
        error={error}
        onClose={() => setOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
