import Button from '../../components/common/Button';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import Icon from '../../components/common/Icon';
import Sidebar from '../../components/common/Sidebar';
import TextInput from '../../components/common/TextInput';
import Toast from '../../components/common/Toast';
import '../../components/common/Common.css';
import './ComponentPreview.css';

const sidebarItems = [
  { label: '대시보드 홈', to: '/dashboard' },
  { label: '문의' },
  { label: 'Todolist', to: '/todolist' },
  { label: '마이페이지' },
];

const ComponentPreview = () => {
  return (
    <div className="preview-scroll">
      <div className="preview-canvas">
        {/* 1열: Text Input / Text area / Textarea=error */}
        <div className="preview-column preview-column--left">
          <section className="preview-section">
            <h3>Text Input</h3>
            <TextInput placeholder="텍스트를 입력하세요" />
          </section>

          <section className="preview-section">
            <h3>Text area</h3>
            <TextInput
              label="Text Input"
              placeholder="텍스트를 입력하세요"
              helperText="8자 이상, 영문/숫자/특수문자 포함"
            />
          </section>

          <section className="preview-section">
            <h3>Textarea=error</h3>
            <TextInput
              label="Email Input"
              type="email"
              placeholder="이메일을 입력하세요"
              error="올바른 이메일 형식을 입력하세요"
            />
          </section>
        </div>

        {/* 2열: Modal / Toast */}
        <div className="preview-column preview-column--middle">
          <section className="preview-section">
            <h3>Modal</h3>
            <div className="common-modal">
              <p className="common-modal__message">문의를 삭제하시겠습니까?</p>
              <div className="common-modal__actions">
                <Button variant="secondary" size="small">
                  취소
                </Button>
                <Button variant="primary" size="small">
                  확인
                </Button>
              </div>
            </div>
          </section>

          <section className="preview-section">
            <h3>Toast</h3>
            <Toast message="문의가 삭제되었습니다." />
          </section>
        </div>

        {/* 3열: Icon */}
        <div className="preview-column">
          <section className="preview-section">
            <h3>Icon</h3>
            <Icon name="checkCircle" size={20} />
          </section>
        </div>

        {/* 4열: Sidebar (오른쪽 전체 높이) */}
        <section className="preview-section preview-sidebar">
          <h3>Sidebar</h3>
          <div className="preview-sidebar__wrap">
            <Sidebar items={sidebarItems} />
          </div>
        </section>

        {/* 하단: Button + Header / Footer */}
        <div className="preview-bottom">
          <section className="preview-section preview-section--fit">
            <h3>Button</h3>
            <div className="preview-button-col">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="primary" size="small">
                Small Button
              </Button>
            </div>
          </section>

          <div className="preview-bottom__right">
            <section className="preview-section">
              <h3>Header</h3>
              <Header />
            </section>

            <section className="preview-section">
              <h3>Footer</h3>
              <Footer />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentPreview;
