import { useState } from 'react';
import { ModalContext } from './ModalContext';
import ModalTrigger from './ModalTrigger';
import ModalContent from './ModalContent';
import ModalClose from './ModalClose';
import ModalBackdrop from './ModalBackdrop';

function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Close = ModalClose;
Modal.Backdrop = ModalBackdrop;

export default Modal;
