import { useState } from 'react';
import {
  AdminButton,
  AdminFooter,
  AdminHeader,
  AdminModal,
  AdminSidebar,
  AdminTextArea,
  AdminTextInput,
  AdminToast,
  CheckIcon,
} from '../components/admin/AdminUI.jsx';
import './components-page.css';

function ComponentHeading({ title, name }) {
  return (
    <div className="component-heading">
      {title && <h2>{title}</h2>}
      {name && (
        <p>
          <span aria-hidden="true">◆</span> {name}
        </p>
      )}
    </div>
  );
}

function ComponentsPage() {
  const [isModalVisible, setModalVisible] = useState(true);
  const [isToastVisible, setToastVisible] = useState(true);

  function confirmDelete() {
    setModalVisible(false);
    setToastVisible(true);
  }

  return (
    <main className="component-page">
      <div className="component-page__board">
        <section className="component-page__inputs" aria-label="입력 컴포넌트">
          <ComponentHeading title="Text Input" name="Text Input" />
          <AdminTextInput id="example-text" placeholder="텍스트를 입력하세요" />

          <div className="component-page__textarea">
            <ComponentHeading title="Textarea" name="Textarea" />
            <AdminTextArea
              id="example-textarea"
              label="Text Input"
              placeholder="텍스트를 입력하세요"
              rows={1}
            />
          </div>

          <div className="component-page__error">
            <ComponentHeading title="" name="Textarea=error" />
            <AdminTextInput
              id="example-email"
              label="Email Input"
              type="email"
              placeholder="이메일을 입력하세요"
              error="올바른 이메일 형식을 입력하세요"
            />
          </div>

          <div className="component-page__buttons">
            <ComponentHeading title="Button" name="Button" />
            <div className="component-page__button-stack">
              <AdminButton onClick={() => setModalVisible(true)}>Primary Button</AdminButton>
              <AdminButton variant="secondary" onClick={() => setModalVisible(true)}>
                Secondary Button
              </AdminButton>
              <AdminButton size="small" onClick={() => setModalVisible(true)}>
                Small Button
              </AdminButton>
            </div>
          </div>
        </section>

        <section className="component-page__middle" aria-label="공통 컴포넌트">
          <div className="component-page__modal-block">
            <ComponentHeading title="Modal" name="Modal" />
            {isModalVisible ? (
              <AdminModal onCancel={() => setModalVisible(false)} onConfirm={confirmDelete} />
            ) : (
              <AdminButton variant="secondary" onClick={() => setModalVisible(true)}>
                모달 다시 보기
              </AdminButton>
            )}
          </div>

          <div className="component-page__toast-block">
            <ComponentHeading title="Toast" name="Toast" />
            {isToastVisible && <AdminToast>문의가 삭제되었습니다.</AdminToast>}
          </div>

          <div className="component-page__header-block">
            <ComponentHeading title="Header" name="Header" />
            <AdminHeader />
          </div>

          <div className="component-page__footer-block">
            <ComponentHeading title="Footer" name="Footer" />
            <AdminFooter />
          </div>
        </section>

        <section className="component-page__right" aria-label="아이콘과 사이드바">
          <div className="component-page__icon-block">
            <ComponentHeading title="Icon" />
            <CheckIcon />
          </div>
          <div className="component-page__sidebar-block">
            <ComponentHeading title="Sidebar" name="Sidebar" />
            <AdminSidebar />
          </div>
        </section>
      </div>
    </main>
  );
}

export default ComponentsPage;
