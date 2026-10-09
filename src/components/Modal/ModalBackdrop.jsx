import { useModalContext } from './ModalContext';
import './Modal.css';

function ModalBackdrop() {
  const { isOpen, closeModal } = useModalContext();

  if (!isOpen) {
    return null;
  }

  return <div className="modal-backdrop" onClick={closeModal} aria-hidden="true" />;
}

export default ModalBackdrop;
