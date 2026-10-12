import { useState } from 'react';
import { ModalContext } from './ModalContext';
import ConfirmModal from '../components/ConfirmModal';

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);

  const openModal = ({ message, onConfirm }) => {
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
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modal && (
        <ConfirmModal message={modal.message} onCancel={closeModal} onConfirm={handleConfirm} />
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
