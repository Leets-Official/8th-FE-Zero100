import { useState } from 'react';
import { DashboardModalContext } from './DashboardModalContext';
import Modal from '../components/dashboard/Modal';

function DashboardModalProvider(props) {
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
    <DashboardModalContext.Provider value={{ openModal }}>
      {props.children}
      {modal && <Modal message={modal.message} onConfirm={handleConfirm} onCancel={closeModal} />}
    </DashboardModalContext.Provider>
  );
}

export default DashboardModalProvider;
