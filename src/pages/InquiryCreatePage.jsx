import { apiRequest } from '../api/client.js';
import useAuth from '../context/useAuth.js';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import { AdminButton, AdminTextArea, AdminTextInput } from '../components/admin/AdminUI.jsx';
import { ROUTES } from '../constants/routes.js';
import './inquiry-page.css';

function InquiryCreatePage() {
  const [notice, setNotice] = useState('');
  const [pending, setPending] = useState(false);
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (pending) return;
    const data = new FormData(event.currentTarget);
    const body = Object.fromEntries(
      ['name', 'email', 'title', 'content'].map((key) => [key, data.get(key).trim()]),
    );
    if (
      body.name.length < 2 ||
      body.name.length > 20 ||
      body.title.length < 2 ||
      body.title.length > 50 ||
      !body.content
    ) {
      setNotice('이름은 2~20자, 제목은 2~50자로 입력하고 내용을 작성해주세요.');
      return;
    }
    setPending(true);
    setNotice('');
    try {
      await apiRequest('/api/inquiries', { token, method: 'POST', body });
      navigate(ROUTES.inquiries, { replace: true, state: { created: true } });
    } catch (error) {
      if (error.status === 401) {
        logout();
        return;
      }
      setNotice(error.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <AdminLayout>
      <section className="inquiry-form-page">
        <h1>문의 등록</h1>
        <form className="inquiry-form" onSubmit={handleSubmit}>
          <AdminTextInput
            id="inquiry-name"
            name="name"
            defaultValue={user?.name || ''}
            minLength={2}
            maxLength={20}
            label="이름"
            placeholder="이름을 입력하세요"
            required
          />
          <AdminTextInput
            id="inquiry-email"
            name="email"
            defaultValue={user?.email || ''}
            type="email"
            label="이메일"
            placeholder="이메일을 입력하세요"
            required
          />
          <AdminTextInput
            id="inquiry-title"
            name="title"
            minLength={2}
            maxLength={50}
            label="제목"
            placeholder="제목을 입력하세요"
            required
          />
          <AdminTextArea
            id="inquiry-content"
            name="content"
            label="내용"
            placeholder="내용을 입력하세요"
            required
          />
          {notice && (
            <p className="inquiry-form__notice" role="alert">
              {notice}
            </p>
          )}
          <div className="inquiry-form__actions">
            <Link to={ROUTES.inquiries} className="inquiry-form__cancel">
              취소
            </Link>
            <AdminButton type="submit" disabled={pending}>
              {pending ? '등록 중…' : '등록'}
            </AdminButton>
          </div>
        </form>
      </section>
    </AdminLayout>
  );
}

export default InquiryCreatePage;
