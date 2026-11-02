import { useState } from 'react';
import { Link } from 'react-router';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import { AdminButton, AdminTextArea, AdminTextInput } from '../components/admin/AdminUI.jsx';
import { ROUTES } from '../constants/routes.js';
import './inquiry-page.css';

function InquiryCreatePage() {
  const [notice, setNotice] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setNotice(true);
  }

  return (
    <AdminLayout>
      <section className="inquiry-form-page">
        <h1>문의 등록</h1>
        <form className="inquiry-form" onSubmit={handleSubmit}>
          <AdminTextInput
            id="inquiry-name"
            name="name"
            label="이름"
            placeholder="이름을 입력하세요"
            required
          />
          <AdminTextInput
            id="inquiry-email"
            name="email"
            type="email"
            label="이메일"
            placeholder="이메일을 입력하세요"
            required
          />
          <AdminTextInput
            id="inquiry-title"
            name="title"
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
            <p className="inquiry-form__notice" role="status">
              문의 등록 기능은 준비 중입니다.
            </p>
          )}
          <div className="inquiry-form__actions">
            <Link to={ROUTES.inquiries} className="inquiry-form__cancel">
              취소
            </Link>
            <AdminButton type="submit">등록</AdminButton>
          </div>
        </form>
      </section>
    </AdminLayout>
  );
}

export default InquiryCreatePage;
