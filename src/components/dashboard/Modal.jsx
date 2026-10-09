// Dashboard 전용 모달. 열림 상태는 부모가 isOpen으로 제어하고, 내부 콘텐츠는 children으로 전달
function Modal({ isOpen, className, children }) {
  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" className={className}>
      {children}
    </div>
  );
}

export default Modal;
