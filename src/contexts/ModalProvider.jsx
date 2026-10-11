import { useState } from 'react';
import { ModalContext } from './ModalContext';
import ConfirmModal from '../components/ConfirmModal';

function ModalProvider(props) {
  const [modal, setModal] = useState(null);

  const openModal = (message, onConfirm) => {
    setModal({ message, onConfirm });
  };

  const closeModal = () => {
    setModal(null);
  };

  const handleConfirm = () => {
    modal.onConfirm();
    closeModal();
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {props.children}
      {modal && (
        <ConfirmModal message={modal.message} onConfirm={handleConfirm} onCancel={closeModal} />
      )}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
