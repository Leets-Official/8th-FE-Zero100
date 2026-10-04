import { useModalContext } from './ModalContext';
import './Modal.css';

function ModalContent({ children }) {
  const { isOpen } = useModalContext();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-content" role="dialog" aria-modal="true" aria-label="모달 창">
      {children}
    </div>
  );
}

export default ModalContent;
