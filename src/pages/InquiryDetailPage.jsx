import { apiRequest } from '../api/client.js';
import useAuth from '../context/useAuth.js';
import useInquiries from '../hooks/useInquiries.js';
import InquiryStatus from '../components/InquiryStatus.jsx';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import { ROUTES } from '../constants/routes.js';
import './inquiry-page.css';

function InquiryDetailPage() {
  const request = useInquiries();
  const { inquiries, loading, error } = request;
  const { token, user, logout } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const inquiry = inquiries.find((item) => String(item.id) === id);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!confirmOpen) return;
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => dialog.close();
  }, [confirmOpen]);

  async function handleDelete() {
    if (deleting || inquiry?.user_id !== user?.id) return;
    setDeleting(true);
    setDeleteError('');
    try {
      await apiRequest(`/api/inquiries/${encodeURIComponent(id)}`, { token, method: 'DELETE' });
      navigate(ROUTES.inquiries, { replace: true, state: { deleted: true } });
    } catch (error) {
      if (error.status === 401) {
        logout();
        return;
      }
      setDeleteError(error.message);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AdminLayout>
      <section className="inquiry-detail-page">
        <div className="inquiry-heading">
          <h1>문의 상세</h1>
          <div className="inquiry-detail__actions">
            <Link className="inquiry-detail__button" to={ROUTES.inquiries}>
              목록으로
            </Link>
            {inquiry && inquiry.user_id === user?.id && (
              <button
                className="inquiry-detail__button"
                type="button"
                onClick={() => {
                  setConfirmOpen(true);
                }}
              >
                삭제
              </button>
            )}
          </div>
        </div>
        <InquiryStatus {...request} />
        {!loading &&
          !error &&
          (inquiry ? (
            <article className="inquiry-detail">
              <header className="inquiry-detail__header">
                <p>{inquiry.created_at}</p>
                <h2>{inquiry.title}</h2>
              </header>
              <dl className="inquiry-detail__author">
                <div>
                  <dt>작성자</dt>
                  <dd>{inquiry.name || '—'}</dd>
                </div>
                <div>
                  <dt>이메일</dt>
                  <dd>{inquiry.email || '—'}</dd>
                </div>
              </dl>
              <div className="inquiry-detail__content">
                <h3>문의 내용</h3>
                <p>{inquiry.content}</p>
              </div>
            </article>
          ) : (
            <p>문의를 찾을 수 없습니다.</p>
          ))}
      </section>
      {confirmOpen && (
        <dialog
          ref={dialogRef}
          className="inquiry-delete-dialog"
          aria-labelledby="inquiry-delete-title"
          onCancel={(event) => {
            event.preventDefault();
            if (!deleting) setConfirmOpen(false);
          }}
        >
          <h2 id="inquiry-delete-title">문의를 삭제하시겠습니까?</h2>
          {deleteError && <p role="alert">{deleteError}</p>}
          <div className="inquiry-delete-dialog__actions">
            <button
              type="button"
              onClick={() => setConfirmOpen(false)}
              disabled={deleting}
              autoFocus
            >
              취소
            </button>
            <button type="button" onClick={handleDelete} disabled={deleting}>
              {deleting ? '삭제 중…' : '확인'}
            </button>
          </div>
        </dialog>
      )}
    </AdminLayout>
  );
}

export default InquiryDetailPage;
