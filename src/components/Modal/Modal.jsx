import { createContext, useContext, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button/Button';

const ModalContext = createContext(null);

function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen, titleId }}>{children}</ModalContext.Provider>
  );
}

function ModalTrigger({ children }) {
  const { setIsOpen } = useContext(ModalContext);

  return (
    <Button variant="danger" onClick={() => setIsOpen(true)}>
      {children}
    </Button>
  );
}

function ModalContent({ children }) {
  const { isOpen, setIsOpen, titleId } = useContext(ModalContext);
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }

    return () => dialog.close();
  }, [isOpen]);

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        setIsOpen(false);
      }}
      className="fixed inset-0 m-auto w-[420px] max-w-[calc(100%-32px)] rounded-[10px] border-0 bg-[#ffffff] px-[28px] pt-[26px] pb-[22px] text-[#222222] shadow-xl backdrop:bg-[#000000]/50"
    >
      {children}
    </dialog>,
    document.body,
  );
}

function ModalTitle({ children }) {
  const { titleId } = useContext(ModalContext);

  return (
    <h2 id={titleId} className="text-[15px] font-bold">
      {children}
    </h2>
  );
}

function ModalActions({ children }) {
  return <div className="mt-[44px] flex justify-end gap-[10px]">{children}</div>;
}

function ModalClose({ children }) {
  const { setIsOpen } = useContext(ModalContext);

  return (
    <Button variant="secondary" onClick={() => setIsOpen(false)}>
      {children}
    </Button>
  );
}

function ModalConfirm({ children, onConfirm }) {
  const { setIsOpen } = useContext(ModalContext);

  function handleConfirm() {
    setIsOpen(false);
    onConfirm();
  }

  return (
    <Button variant="danger" onClick={handleConfirm}>
      {children}
    </Button>
  );
}

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Title = ModalTitle;
Modal.Actions = ModalActions;
Modal.Close = ModalClose;
Modal.Confirm = ModalConfirm;

export default Modal;
