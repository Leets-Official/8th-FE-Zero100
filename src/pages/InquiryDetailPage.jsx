import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import { ROUTES } from '../constants/routes.js';
import './inquiry-page.css';

function InquiryDetailPage({ inquiries, onDelete }) {
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

  return (
    <AdminLayout>
      <section className="inquiry-detail-page">
        <div className="inquiry-heading">
          <h1>문의 상세</h1>
          <div className="inquiry-detail__actions">
            <Link className="inquiry-detail__button" to={ROUTES.inquiries}>
              목록으로
            </Link>
            {inquiry && (
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
        {inquiry ? (
          <article className="inquiry-detail">
            <header className="inquiry-detail__header">
              <p>{inquiry.createdAt}</p>
              <h2>{inquiry.title}</h2>
            </header>
            <dl className="inquiry-detail__author">
              <div>
                <dt>작성자</dt>
                <dd>{inquiry.author || '—'}</dd>
              </div>
              <div>
                <dt>이메일</dt>
                <dd>{inquiry.email || '—'}</dd>
              </div>
            </dl>
            <div className="inquiry-detail__content">
              <h3>문의 내용</h3>
              <p>{inquiry.content || '상세 내용이 없는 예시 문의입니다.'}</p>
            </div>
          </article>
        ) : (
          <p>문의를 찾을 수 없습니다.</p>
        )}
      </section>
      {confirmOpen && (
        <dialog
          ref={dialogRef}
          className="inquiry-delete-dialog"
          aria-labelledby="inquiry-delete-title"
          onCancel={(event) => {
            event.preventDefault();
            setConfirmOpen(false);
          }}
        >
          <h2 id="inquiry-delete-title">문의를 삭제하시겠습니까?</h2>
          <div className="inquiry-delete-dialog__actions">
            <button type="button" onClick={() => setConfirmOpen(false)} autoFocus>
              취소
            </button>
            <button
              type="button"
              onClick={() => {
                setConfirmOpen(false);
                onDelete(id);
                navigate(ROUTES.inquiries, { replace: true, state: { deleted: true } });
              }}
            >
              확인
            </button>
          </div>
        </dialog>
      )}
    </AdminLayout>
  );
}

export default InquiryDetailPage;
